export type HasId = { id: number };
export type HasName = { name: string };
export type HasEmail = { email: string };
export type HasCreationDate = { createdAt: Date };
export type HasUpdateDate = { updatedAt: Date };
export type HasTimestamp = HasUpdateDate & HasCreationDate;

export const NEWSLETTER_CONTENT_TYPE = ["HTML", "MARKDOWN", 'PLAINTEXT'] as const;

export const NEWSLETTER_STATUS = ["DRAFT", "SENT"];

export type NewsletterStatus = typeof NEWSLETTER_STATUS[number];
export type NewsletterContentType = typeof NEWSLETTER_CONTENT_TYPE[number];

export type User = HasId & HasName & HasEmail & HasCreationDate;
export type Subscriber = HasId &
    HasEmail &
    HasTimestamp & { unsubscribeToken: string };
export type Newsletter = HasId & HasTimestamp & {
    subject: string;
    content: string;
    contentType: NewsletterContentType;
    status: NewsletterStatus;
};

export type ComposeNewsletter = Omit<Newsletter, "id" | "createdAt" | "updatedAt" | "status">;
