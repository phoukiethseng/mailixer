import React from 'react'
import { Button } from '@/Components/Button'
import { Icons } from '@/Components/Icons'

export function SortableTableHeader(
  props: React.ComponentPropsWithoutRef<'button'>
) {
  return (
    <Button
      variant={'ghost'}
      className={'flex justify-between gap-1'}
      onClick={props.onClick}
    >
      {props.children}
      <Icons.ChevronsUpDown strokeWidth={1.5} size={14} />
    </Button>
  )
}
