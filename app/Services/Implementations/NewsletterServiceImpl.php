<?php

namespace App\Services\Implementations;

use App\Enums\NewsletterContentType;
use App\Enums\NewsletterStatus;
use App\Exceptions\ServiceException;
use App\Jobs\SendNewsletter;
use App\Mail\NewsletterEmail;
use App\Models\Newsletter;
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
            // FYI: Laravel docs recommend that we should use new instance of mailable for each of subscribers
            $unsubscribeUrl = URL::signedRoute('unsubscribe', ['unsubscribeToken' => $subscriber->unsubscribe_token]);
            $mail = new NewsletterEmail($newsletter, $author, $subscriber, $unsubscribeUrl);
            Queue::push(new SendNewsletter($newsletter, $subscriber, $mail));
//            Mail::send(new NewsletterEmail($newsletter, $author, $subscriber, URL::signedRoute('unsubscribe', ['unsubscribeToken' => $subscriber->unsubscribe_token])));
        }
        // Mark newsletter as Pending
        $newsletter->status()->disassociate();
        $newsletter->status()->associate(\App\Models\NewsletterStatus::find(NewsletterStatus::PENDING->value));

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
        $draftNewsletter->status()->associate(\App\Models\NewsletterStatus::find(NewsletterStatus::DRAFT->value));

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

    public function createSendSuccessResult($newsletterId, $subscriberId, $messageId)
    {
        $newsletter = $this->find($newsletterId);
        $subscriber = $this->subscriberRepository->findById($subscriberId);

        $newsletter->sendResults()->save($subscriber, [
            'is_success' => true
        ]);

        $this->newsletterRepository->save($newsletter);
    }

    public function setNewsletterStatus($newsletterId, NewsletterStatus $newsletterStatusEnum)
    {
        $newsletter = $this->find($newsletterId);
        $newsletter->status()->associate(\App\Models\NewsletterStatus::find($newsletterStatusEnum->value));
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

    public function createSendFailedResult($newsletterId, $subscriberId)
    {
        $newsletter = $this->find($newsletterId);
        $subscriber = $this->subscriberRepository->findById($subscriberId);

        $newsletter->sendResults()->save($subscriber, [
            'is_success' => false
        ]);

        $this->newsletterRepository->save($newsletter);
    }

    public function getAllSendResultsForNewsletterId($newsletterId)
    {
        return $this->find($newsletterId)->sendResults()
            ->as('sendResult')
            ->withPivot(['subscriber_id', 'newsletter_id', 'is_success'])
            ->get();
    }
}
