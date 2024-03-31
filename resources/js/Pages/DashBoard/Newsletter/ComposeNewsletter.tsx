import React from 'react'
import DashBoardLayout from '@/Layouts/DashBoardLayout'

import { router } from '@inertiajs/react'
import { useMessageToast } from '@/lib/hooks/useMessageToast'
import { ComposeNewsletter } from '@/types/dto'
import ComposeNewsletterTextEditor from '@/Components/ComposeNewsletterTextEditor'
import { InertiaSharedProps } from '@/types/inertia'
import NewDashBoardLayout from '@/Layouts/NewDashBoardLayout'

type NewsletterPageProps = {} & InertiaSharedProps

const ComposeNewsletterPage = ({ auth, ...props }: NewsletterPageProps) => {
  useMessageToast(props)

  function handleSendNewsletter(data: ComposeNewsletter) {
    router.post('/dashboard/sendNewsletter', data)
  }

  function handleSaveNewsletterAsDraft(data: ComposeNewsletter) {
    // const content_type_id: number =
    //     //@ts-ignore
    //     NEWSLETTER_CONTENT_TYPE[data.content_type];
    // router.post("/dashboard/saveNewsletter", {
    //     subject: data.subject,
    //     content: data.content,
    //     content_type_id,
    // });
    router.post('/dashboard/saveNewsletter', data)
  }

  return (
    <div className={'p-12 pt-0'}>
      <ComposeNewsletterTextEditor
        onSend={handleSendNewsletter}
        onSave={handleSaveNewsletterAsDraft}
      />
    </div>
  )
}

ComposeNewsletterPage.layout = (page: React.ReactNode) => (
  <NewDashBoardLayout activeSubPageName="ComposeNewsletter">
    {page}
  </NewDashBoardLayout>
)

export default ComposeNewsletterPage
