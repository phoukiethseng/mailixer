import React from 'react'
import LogoText from '@/Components/LogoText'
import Confetti from 'react-confetti'
import { InertiaSharedProps } from '@/types/inertia'

type SuccessPageProps = {
  author: {
    name: string
  }
} & InertiaSharedProps

export default function SuccessPage({ author }: SuccessPageProps) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-6">
      <Confetti gravity={0.2} />
      <LogoText className="text-5xl" />
      <div className="flex flex-col justify-start items-center gap-1 tracking-tight">
        <h2 className="text-2xl font-medium text-foreground">
          You have subscribed to {author.name} newsletter
        </h2>
        <h3>
          You will now start receiving email newsletter from {author.name}.
        </h3>
      </div>
    </div>
  )
}
