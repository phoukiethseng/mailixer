import React from 'react'
import { useMessageToast } from '@/lib/hooks/useMessageToast'
import { Subscriber } from '@/types/dto'
import WhitelistedSubscriberTable from '@/Components/SubscriberTable/WhitelistedSubscriberTable'
import { InertiaSharedProps } from '@/types/inertia'
import NewDashBoardLayout from '@/Layouts/NewDashBoardLayout'

export type SubscribersPageProps = {
  subscribers: Subscriber[]
  subscribersCount: number
  blacklistedSubscribersCount: number
} & InertiaSharedProps

const WhitelistedSubscribersPage = ({
  subscribers,
  subscribersCount,
  blacklistedSubscribersCount,
  ...props
}: SubscribersPageProps) => {
  useMessageToast(props)
  // Email Service Provider
  return (
    <div className={'w-full'}>
      <WhitelistedSubscriberTable data={subscribers} />
    </div>
  )
}

WhitelistedSubscribersPage.layout = (page: React.ReactNode) => (
  <NewDashBoardLayout activeSubPageName={'WhitelistedSubscribers'}>
    {page}
  </NewDashBoardLayout>
)

export default WhitelistedSubscribersPage
