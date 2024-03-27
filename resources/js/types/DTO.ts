export type HasId = { id: number };
export type HasName = { name: string };
export type HasEmail = { email: string };
export type HasCreationDate = { createdAt: Date };
export type HasUpdateDate = { updatedAt: Date };
export type HasTimestamp = HasUpdateDate & HasCreationDate;

/*
    All model type should have the same structure as
    backend DTO class
 */

export const NEWSLETTER_CONTENT_TYPE = ["HTML", "MARKDOWN", 'PLAINTEXT'] as const;

export const NEWSLETTER_STATUS = ["DRAFT", "SENT", "PENDING", "FAILED"];

// TODO: change this to union of mime string, we use catch-all string type for now
export type MIME_TYPE = string;
export type BASE64 = string;
export type URL = string;

export type NewsletterStatus = typeof NEWSLETTER_STATUS[number];
export type NewsletterContentType = typeof NEWSLETTER_CONTENT_TYPE[number];

export type User = HasId & HasName & HasEmail & HasCreationDate & {
    profilePictureType: MIME_TYPE | null;
    profilePictureUrl: URL | null;

};
export type Subscriber = HasId &
    HasEmail &
    HasCreationDate & { unsubscribeToken: string };

export type SubscriptionRecord = HasId & HasEmail
    & { createdAt: string; unsubscribedAt: string }

export type Newsletter = HasId & {
    subject: string;
    content: string;
    contentType: NewsletterContentType;
};

export type NewsletterWithStatus = Newsletter & {
    status: NewsletterStatus;
}

export type NewsletterSendResult = NewsletterWithStatus & {
    sendResults: {
        subscriberId: number;
        isSuccess: boolean;
        createdAt: string | null
    }[]
}

export type ComposeNewsletter = Omit<Newsletter, "id" | "createdAt" | "updatedAt" | "status">;
