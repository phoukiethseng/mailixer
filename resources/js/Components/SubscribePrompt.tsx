import React from 'react'
import { cn } from '@/lib/utils'

type SubscribePromptProps = {
  name: string
} & React.HTMLAttributes<HTMLDivElement>

export default function SubscribePrompt({
  name,
  className,
}: SubscribePromptProps) {
  return (
    <div
      className={cn(
        'text-foreground text-center flex flex-col justify-start items-center gap-1 leading-tight',
        className
      )}
    >
      <span className="text-xl font-semibold">Subscribe to</span>
      <span className="text-4xl font-semibold text-primary">{name}</span>
      <span className="text-xl font-light">email newsletter</span>
    </div>
  )
}
