export type HasId = { id: number };
export type HasName = { name: string };
export type HasEmail = { email: string };
export type HasCreationDate = { createdAt: Date };
export type HasUpdateDate = { updatedAt: Date };
export type HasTimestamp = HasUpdateDate & HasCreationDate;

export const NEWSLETTER_CONTENT_TYPE = ["HTML", "MARKDOWN", 'PLAINTEXT'] as const;

export const NEWSLETTER_STATUS = ["DRAFT", "SENT"];

// TODO: change this to union of mime string, we use catch-all string type for now
export type MIME_TYPE = string;
export type BASE64 = string;

export type NewsletterStatus = typeof NEWSLETTER_STATUS[number];
export type NewsletterContentType = typeof NEWSLETTER_CONTENT_TYPE[number];

export type User = HasId & HasName & HasEmail & HasCreationDate & {
    profilePictureType: MIME_TYPE | null;
    profilePicture: BASE64 | null;

};
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
