import type { Table } from '@tanstack/react-table'
import { Subscriber } from '@/types/DTO'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/Components/DropDownMenu'
import { Button } from '@/Components/Button'
import { Icons } from '@/Components/Icons'
import React from 'react'
import { cn } from '@/lib/utils'

type ColumnVisibilityDropdownMenuProps = {
  table: Table<Subscriber>
} & React.ComponentPropsWithoutRef<'button'>

export function ColumnVisibilityDropdownMenu(
  props: ColumnVisibilityDropdownMenuProps
) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={'outline'}
          size={'icon'}
          className={cn('', props.className)}
        >
          <Icons.Columns strokeWidth={1.5} size={14} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {props.table
          .getAllColumns()
          .filter((column) => column.getCanHide())
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) =>
                  column.toggleVisibility(Boolean(value))
                }
              >
                {column.id}
              </DropdownMenuCheckboxItem>
            )
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
