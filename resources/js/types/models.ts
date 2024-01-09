type HasId = { id: number };
type HasName = { name: string };
type HasEmail = { email: string };
type HasCreationDate = { createdAt: Date };
type HasUpdateDate = { updatedAt: Date };
type HasTimestamp = HasUpdateDate & HasCreationDate;

export const NEWSLETTER_CONTENT_TYPE = ["HTML", "MARKDOWN", 'PLAINTEXT'] as const;

export const NEWSLETTER_STATUS = ["DRAFT", "SENT"];

type NewsletterStatus = typeof NEWSLETTER_STATUS[number];
type NewsletterContentType = typeof NEWSLETTER_CONTENT_TYPE[number];

type User = HasId & HasName & HasEmail & HasTimestamp;
type Subscriber = HasId &
    HasEmail &
    HasTimestamp & { unsubscribeToken: string };
type Newsletter = HasId & HasTimestamp & {
    subject: string;
    content: string;
    contentType: NewsletterContentType;
    status: NewsletterStatus;
};

export type {
    User,
    Subscriber,
    Newsletter,
    NewsletterContentType,
    NewsletterStatus,
};
