import { SubscriptionRecord } from '@/types/DTO'
import { addDays, differenceInDays, isSameDay } from 'date-fns'

const emailDomainRegex = /.+@(.+)\..+/

export function getSubscriberESP(
  subscribers: { id: number; email: string }[]
): { id: string; count: number }[] {
  const espStats: Map<string, { id: string; count: number }> = new Map()
  subscribers.forEach((subscriber) => {
    // Extract domain part of email address
    const regexResult = emailDomainRegex.exec(subscriber.email)
    if (regexResult) {
      const domain = regexResult[1]
      if (espStats.has(domain)) {
        const val = espStats.get(domain)
        if (val?.count) {
          val.count = val.count + 1
        }
      } else {
        espStats.set(domain, { id: domain, count: 1 })
      }
    }
  })
  return [...espStats.values()]
}

export function getSubscriberGainCountHistory(
  data: Array<SubscriptionRecord>,
  from: Date,
  to: Date
): Array<{ x: string; y: number }> {
  /* We expect data array is sorted by createdAt*/

  if (!data) {
    return []
  }

  const results: Array<{ x: string; y: number }> = []
  // First calculate number of days between record's earliest date to record's latest date
  const amountOfDays = differenceInDays(to, from)

  // For each day within (earliest, latest) range, count number of subscription occurred on that day
  for (let dayOffset = 0; dayOffset <= amountOfDays + 1; dayOffset++) {
    const targetDate = addDays(from, dayOffset)
    const count = data.reduce(
      (count, currentRecord) =>
        isSameDay(new Date(currentRecord.createdAt), targetDate)
          ? count + 1
          : count,
      0
    )
    results.push({
      x: targetDate.toISOString(),
      y: count,
    })
  }
  return results
}

export function getSubscriberLossHistory(
  data: Array<SubscriptionRecord>,
  from: Date,
  to: Date
): Array<{ x: string; y: number }> {
  /* We expect data array is sorted by createdAt*/

  if (!data) {
    return []
  }

  const results: Array<{ x: string; y: number }> = []
  // First calculate number of days between record's earliest date to record's latest date
  const amountOfDays = differenceInDays(to, from)

  // For each day within (earliest, latest) range, count number of subscription occurred on that day
  for (let dayOffset = 0; dayOffset <= amountOfDays + 1; dayOffset++) {
    const targetDate = addDays(from, dayOffset)
    const count = data.reduce(
      (count, currentRecord) =>
        Boolean(currentRecord.unsubscribedAt) &&
        isSameDay(currentRecord.unsubscribedAt, targetDate)
          ? count + 1
          : count,
      0
    )
    results.push({
      x: targetDate.toISOString(),
      y: count,
    })
  }
  return results
}
