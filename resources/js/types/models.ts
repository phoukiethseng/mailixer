type HasId = { id: number };
type HasName = { name: string };
type HasEmail = { email: string };
type HasCreationDate = { createdAt: Date };
type HasUpdateDate = { updatedAt: Date };

export const newsletterContentType = {
    HTML: 1,
    MARKDOWN: 2,
    PLAINTEXT: 3,
};

export const newsletterStatus = {
    DRAFT: 1,
    SENT: 2,
};

type NewsletterStatus = keyof typeof newsletterStatus;
type NewsletterContentType = keyof typeof newsletterContentType;

type User = HasId & HasName & HasEmail;
type Subscriber = HasId &
    HasEmail &
    HasCreationDate &
    HasUpdateDate & { unsubscribeToken: string };
type Newsletter = HasId & {
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
