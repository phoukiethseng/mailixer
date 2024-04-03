<?php

namespace App\Services\Implementations;

use App\Enums\EmailStatus;
use App\Enums\NewsletterContentType;
use App\Enums\NewsletterStatus;
use App\Enums\SubscriptionStatus;
use App\Exceptions\ServiceException;
use App\Jobs\SendNewsletter;
use App\Mail\NewsletterEmail;
use App\Models\Newsletter;
use App\Models\Subscriber;
use App\Models\User;
use App\Repositories\Interfaces\NewsletterRepository;
use App\Repositories\Interfaces\SubscriberRepository;
use App\Repositories\Interfaces\UserRepository;
use App\Services\Interfaces\NewsletterService;
use App\Services\Interfaces\SubscriptionService;
use Illuminate\Support\Facades\Queue;
use Illuminate\Support\Facades\URL;

class NewsletterServiceImpl implements NewsletterService
{

    public function __construct(private SubscriptionService $subscriptionService, private NewsletterRepository $newsletterRepository, private UserRepository $userRepository, private SubscriberRepository $subscriberRepository)
    {

    }

    public function sendNewsletter(Newsletter $newsletter)
    {
        $authorId = $this->newsletterRepository->getAuthorIdById($newsletter->id);
        $author = $this->userRepository->findById($authorId);
        $whitelistedSubscribers = $this->subscriptionService->getAllWhitelistedSubscribersByUserId($author->id);

        // Don't queue sending task if there is zero subscribers
        if (sizeof($whitelistedSubscribers) <= 0) {
            throw new ServiceException('there is no subscriber to send newsletter');
        }

        foreach ($whitelistedSubscribers as $subscriber) {

            if ($subscriber->status == SubscriptionStatus::UNSUBSCRIBED) continue;

            // FYI: Laravel docs recommend that we should use new instance of mailable for each of subscribers
            $unsubscribeUrl = URL::signedRoute('unsubscribe', ['unsubscribeToken' => $subscriber->unsubscribe_token]);
            $mail = new NewsletterEmail($newsletter, $author, $subscriber, $unsubscribeUrl);
            Queue::push(new SendNewsletter($newsletter, $subscriber, $mail));
//            Mail::send(new NewsletterEmail($newsletter, $author, $subscriber, URL::signedRoute('unsubscribe', ['unsubscribeToken' => $subscriber->unsubscribe_token])));
        }
        // Mark newsletter as Pending
//        $newsletter->status()->disassociate();
        $newsletter->status = NewsletterStatus::PENDING;

        $this->newsletterRepository->save($newsletter);
    }

    public function createNewsletter(NewsletterContentType $contentType, string $subject, string $content, User $author): Newsletter
    {
        $data = [
            'content' => $content,
            'subject' => $subject,
        ];

        $draftNewsletter = $this->newsletterRepository->getNewInstance($data);
        $draftNewsletter->user()->associate($author);
        $draftNewsletter->contentType()->associate(\App\Models\NewsletterContentType::find($contentType->value));
        $draftNewsletter->status = NewsletterStatus::DRAFT;

        $draftNewsletter = $this->newsletterRepository->save($draftNewsletter);
        return $draftNewsletter;
    }

    public function getAllNewsletterForAuthorUser(User $author)
    {
        $newsletters = $this->newsletterRepository->findAllByUserId($author->id);
        return $newsletters;
    }

    public function getNewsletterById($id): Newsletter
    {
        $newsletter = $this->find($id);
        return $newsletter;
    }

    public function deleteNewsletter($newsletterId)
    {
        $newsletter = $this->find($newsletterId);
        if ($newsletter) {
            $this->newsletterRepository->delete($newsletter);
        }
    }

    public function saveNewsletter($id, $subject, $content, NewsletterContentType $contentType)
    {
        $saveNewsletter = $this->newsletterRepository->findById($id);
        if ($saveNewsletter) {
            $saveNewsletter->subject = $subject;
            $saveNewsletter->content = $content;
            $saveNewsletter->contentType()->disassociate();
            $saveNewsletter->contentType()->associate(\App\Models\NewsletterContentType::find($contentType->value));

            $this->newsletterRepository->save($saveNewsletter);
        }
    }

    public function setNewsletterStatus($newsletterId, NewsletterStatus $newsletterStatusEnum)
    {
        $newsletter = $this->find($newsletterId);
        $newsletter->status = $newsletterStatusEnum;
        $this->newsletterRepository->save($newsletter);
    }

    /**
     * @param $newsletterId
     * @return Newsletter
     */
    private function find($newsletterId)
    {
        return $this->newsletterRepository->findById($newsletterId);
    }

    public function getAllSendResultsForNewsletterId($newsletterId)
    {
        return $this->find($newsletterId)->sentSubscribers()
            ->as('send_results')
            ->withPivot(['status_id'])
            ->withTimestamps()
            ->get()
            ->map(function (Subscriber $subscriber) {
                return $subscriber->send_results;
            });
    }

  public function createEmailSendResult($newsletterId, $subscriberId, EmailStatus $status, $messageId)
  {
    $newsletter = $this->newsletterRepository->findById($newsletterId);
    $subscriber = $this->subscriberRepository->findById($subscriberId);
    $newsletter->sentSubscribers()->save($subscriber, [
      'status_id' => $status->value,
      'message_id' => $messageId
    ]);
  }

  public function createFailedEmailSendResult($newsletterId, $subscriberId)
  {
    $newsletter = $this->newsletterRepository->findById($newsletterId);
    $subscriber = $this->subscriberRepository->findById($subscriberId);
    $newsletter->sentSubscribers()->save($subscriber, [
      'status_id' => EmailStatus::FAILED->value
    ]);
  }

  public function setEmailSendResult($messageId, EmailStatus $status)
  {
    $this->newsletterRepository->setSendResultStatusIdByMessageId($messageId, $status->value);
  }
}
