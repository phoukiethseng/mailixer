import React from 'react'
import { cn } from '@/lib/utils'

type DashBoardHeaderProps = {} & React.ComponentPropsWithoutRef<'h2'>

export default function DashBoardHeader({
  className,
  children,
}: DashBoardHeaderProps) {
  return (
    <h2
      className={cn(
        'text-3xl tracking-tight text-foreground font-bold py-8 pl-6',
        className
      )}
    >
      {children}
    </h2>
  )
}
