type HasId = { id: number };
type HasName = { name: string };
type HasEmail = { email: string };

export const newsletterContentType = {
    HTML: 1,
    MARKDOWN: 2,
    PLAINTEXT: 3,
};

type NewsletterContentType = keyof typeof newsletterContentType;

type User = HasId & HasName & HasEmail;
type Subscriber = HasId & HasEmail;
type Newsletter = HasId & {
    subject: string;
    content: string;
    contentType: NewsletterContentType;
};

export type { User, Subscriber, Newsletter, NewsletterContentType };
