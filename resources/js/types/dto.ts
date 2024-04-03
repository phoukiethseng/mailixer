export type HasId = { id: number }
export type HasName = { name: string }
export type HasEmail = { email: string }
export type HasCreationDate = { createdAt: string }
export type HasUpdateDate = { updatedAt: string }
export type HasTimestamp = HasUpdateDate & HasCreationDate

/*
    All model type should have the same structure as
    backend DTO class
 */

export const NEWSLETTER_CONTENT_TYPE = [
  'HTML',
  'MARKDOWN',
  'PLAINTEXT',
] as const

export const NEWSLETTER_STATUS = ['DRAFT', 'SENT', 'PENDING']
export const SUBSCRIPTION_STATUS = ['SUBSCRIBED', 'UNSUBSCRIBED']
export const EMAIL_STATUS = [
  'SENT',
  'DELIVERED',
  'BOUNCE',
  'COMPLAINT',
  'FAILED',
]

// TODO: change this to union of mime string, we use catch-all string type for now
export type MIME_TYPE = string
export type BASE64 = string
export type URL = string

export type NewsletterStatus = (typeof NEWSLETTER_STATUS)[number]
export type NewsletterContentType = (typeof NEWSLETTER_CONTENT_TYPE)[number]
export type SubscriptionStatus = (typeof SUBSCRIPTION_STATUS)[number]
export type EmailStatus = (typeof EMAIL_STATUS)[number]

export type User = HasId &
  HasName &
  HasEmail &
  HasCreationDate & {
    profilePictureType: MIME_TYPE | null
    profilePictureUrl: URL | null
  }
export type Subscriber = HasId &
  HasEmail &
  HasCreationDate & {
    unsubscribeToken: string
    status: SubscriptionStatus
  }

export type SubscriptionRecord = HasId &
  HasEmail & {
    createdAt: string
    unsubscribedAt: string
    status: SubscriptionStatus
  }

export type Newsletter = HasId & {
  subject: string
  content: string
  contentType: NewsletterContentType
}

export type NewsletterWithStatus = Newsletter & {
  status: NewsletterStatus
}

export type NewsletterWithSendResult = NewsletterWithStatus & {
  sendResults: {
    subscriberId: number
    createdAt: string | null
    status: EmailStatus
  }[]
}

export type ComposeNewsletter = Omit<
  Newsletter,
  'id' | 'createdAt' | 'updatedAt' | 'status'
>
