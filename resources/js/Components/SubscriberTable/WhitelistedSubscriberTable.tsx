import React, { useState } from 'react'
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  type Table,
  useReactTable,
} from '@tanstack/react-table'
import {
  columns,
  filterColumnList,
} from '@/Components/SubscriberTable/WhitelistedSubscribersColumns'
import { Subscriber } from '@/types/dto'
import { BaseDataTable } from '@/Components/Table/BaseDataTable'
import { Input } from '@/Components/Input'
import { FilterColumnCombobox } from '@/Components/FilterColumnCombobox'
import { ColumnVisibilityDropdownMenu } from '@/Components/ColumnVisibilityDropdownMenu'
import { Button } from '@/Components/Button'
import { FilterColumnDef } from '@/types/util'
import { router } from '@inertiajs/react'
import { useRoute } from 'ziggy-js'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/Components/DropDownMenu'
import { Icons } from '@/Components/Icons'
import { cn } from '@/lib/utils'
import { DataTablePagination } from '@/Components/Table/Pagination'

type WhitelistedSubscriberTableProps = {
  data: Subscriber[]
} & React.ComponentPropsWithoutRef<'div'>

const WhitelistedSubscriberTable = ({
  data,
  ...props
}: WhitelistedSubscriberTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const [currentFilterColumn, setCurrentFilterColumn] =
    useState<FilterColumnDef>()

  const table: Table<Subscriber> = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    state: {
      sorting,
      columnFilters,
    },
  })

  const route = useRoute()

  const isAnyRowSelected =
    table.getIsSomeRowsSelected() || table.getIsAllRowsSelected()

  return (
    <div
      className={cn(
        'flex flex-col gap-2 justify-start items-stretch pb-3',
        props.className
      )}
    >
      <div className={'flex flex-row gap-2 justify-start w-full p-0.5'}>
        <ColumnVisibilityDropdownMenu
          table={table}
          className={'bg-card text-card-foreground'}
        />
        <FilterColumnCombobox
          filterColumn={currentFilterColumn}
          onFilterColumnChange={setCurrentFilterColumn}
          filterColumnList={filterColumnList}
          className={'bg-card text-card-foreground'}
        />
        <Input
          disabled={!Boolean(currentFilterColumn)}
          className={'min-w-[50px] max-w-[300px] bg-card text-card-foreground'}
          placeholder={'Search'}
          onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
            const searchText = e.target.value
            table
              .getColumn(currentFilterColumn?.value ?? 'email')
              ?.setFilterValue(searchText)
          }}
        />
        {isAnyRowSelected && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant={'outline'}
                className={'ml-auto min-w-9'}
                size={'icon'}
              >
                <Icons.CircleEllipsis strokeWidth={1.5} size={15} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                className={
                  'flex flex-row gap-2 text-destructive hover:text-destructive'
                }
                onClick={() => {
                  const selectedRows = table.getSelectedRowModel().rows
                  const subscriberIdList = selectedRows.map((row) => ({
                    id: row.getValue('id') as string,
                  }))
                  router.delete(route('dashboard.batch.unsubscribe'), {
                    data: {
                      subscriberIdList: subscriberIdList,
                    },
                  })
                }}
              >
                <Icons.UserX strokeWidth={1.5} size={15} />
                <span>Unsubscribe</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className={'flex flex-row gap-2'}
                onClick={() => {
                  const selectedRows = table.getSelectedRowModel().rows
                  const subscriberIdList = selectedRows.map(
                    (subscriberRow) => ({
                      id: subscriberRow.getValue('id') as string,
                    })
                  )
                  router.post(route('dashboard.batch.blacklist'), {
                    subscriberIdList,
                  })
                }}
              >
                <Icons.UserX strokeWidth={1.5} size={15} />
                <span>Blacklist</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
      <BaseDataTable table={table} columns={columns} />
      <DataTablePagination table={table} />
    </div>
  )
}

export default WhitelistedSubscriberTable
