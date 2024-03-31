import React, { useEffect, useMemo, useState } from 'react'
import NewDashBoardLayout from '@/Layouts/NewDashBoardLayout'
import { InertiaSharedProps } from '@/types/inertia'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/Components/Card'
import { Icons } from '@/Components/Icons'
import { cn } from '@/lib/utils'
import Line from '@/Components/Charts/Line'
import { Popover, PopoverContent, PopoverTrigger } from '@/Components/Popover'
import { DateRange } from 'react-day-picker'
import { Button } from '@/Components/Button'
import { format, formatDistance, subDays } from 'date-fns'
import { Calendar } from '@/Components/Calendar'
import { SubscriptionRecord } from '@/types/dto'
import axios, { AxiosResponse } from 'axios'
import { route } from '../../../../../vendor/tightenco/ziggy'
import useLoader from '@/lib/hooks/useLoader'
import {
  getSubscriberESP,
  getSubscriberGainCountHistory,
  getSubscriberLossHistory,
} from '@/lib/analytics/subscriber'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/Tabs'
import { Skeleton } from '@/Components/Skeleton'
import PieChart from '@/Components/Charts/Pie'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/Components/Resizable'
import { BaseDataTable } from '@/Components/Table/BaseDataTable'
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  PaginationTableState,
  useReactTable,
} from '@tanstack/react-table'
import { Badge } from '@/Components/Badge'
import { DataTableColumnHeader } from '@/Components/Table/ColumnHeader'
import { DropdownMenu, DropdownMenuContent } from '@/Components/DropDownMenu'
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/Components/Select'

type SubscriberOverviewPageProps = {
  allSubscriptionRecords: Array<SubscriptionRecord>
  subscribersCount: number
  blacklistedSubscribersCount: number
} & InertiaSharedProps

function MetricCard(props: {
  count: number
  name: string
  icon?: React.ReactElement
}) {
  const Icon = props?.icon ?? <></>
  return (
    <Card className={'min-w-60'}>
      <CardHeader className="flex flex-row justify-between items-center gap-4 space-y-0">
        <CardTitle className="leading-none text-md font-semibold">
          {props.name}
        </CardTitle>
        <span className={'text-muted-foreground'}>{Icon}</span>
      </CardHeader>
      <CardContent
        className={'min-w-[130px] min-h-[60px] flex justify-start items-center'}
      >
        <p className="text-4xl font-extrabold text-nowrap">{props.count}</p>
      </CardContent>
    </Card>
  )
}

const recentSubscriptionActivitiesColumns: ColumnDef<SubscriptionRecord>[] = [
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => {
      return <span>{row.getValue('email')}</span>
    },
  },
  {
    accessorKey: 'status',

    header: 'Status',
    cell: ({ row }) => {
      const isSubscribed = row.original.status === 'SUBSCRIBED'
      return (
        <Badge variant={isSubscribed ? 'secondary' : 'destructive'}>
          {isSubscribed ? 'Subscribed' : 'Unsubscribed'}
        </Badge>
      )
    },
  },
  {
    id: 'since',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title={'Since'} />
    },
    cell: ({ row }) => {
      console.log('render createdAt')
      const isSubscribed = row.getValue('status') === 'SUBSCRIBED'
      const date = (
        isSubscribed ? row.original.createdAt : row.original.unsubscribedAt
      ) as string
      return (
        <span>
          {formatDistance(date, Date.now(), {
            addSuffix: true,
            includeSeconds: true,
          })}
        </span>
      )
    },
  },
]

// Use global empty array to avoid infinite render loop
const emptyArray = [] as Array<SubscriptionRecord>

const SubscriberOverviewPage = (props: SubscriberOverviewPageProps) => {
  const headingStyle = {
    h2: 'text-3xl font-bold text-foreground',
  }

  const [date, setDate] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  })

  const [subscriptionRecords, setSubscriptionRecords] =
    useState<Array<SubscriptionRecord>>()

  const [past7DaysSubscriptionRecords, setPast7DaysSubscriptionRecords] =
    useState<Array<SubscriptionRecord>>()

  const {
    isLoading: isSubscriptionRecordsLoading,
    load: loadSubscriptionRecords,
  } = useLoader()
  const {
    isLoading: isPast7DaysSubscriptionRecordsLoading,
    load: loadPast7DaysSubscriptionRecords,
  } = useLoader()

  useEffect(() => {
    console.log('date has changed', date)
    if (date?.from && date?.to) {
      console.log('fetching')
      loadSubscriptionRecords(() =>
        axios
          .get<{ subscriptionRecords: Array<SubscriptionRecord> }>(
            route('dashboard.subscription.records', {
              from: date?.from?.toISOString(),
              to: date?.to?.toISOString(),
            })
          )
          .then((res) => {
            if (res.status === 200) {
              setSubscriptionRecords(res.data.subscriptionRecords)
            }
          })
      )
    }
  }, [date])

  useEffect(() => {
    console.log('fetching past 7 days records')
    loadPast7DaysSubscriptionRecords(() =>
      axios
        .get<
          any,
          AxiosResponse<{ subscriptionRecords: Array<SubscriptionRecord> }>
        >(
          route('dashboard.subscription.records', {
            from: subDays(Date.now(), 7).toISOString(),
            to: new Date().toISOString(),
          })
        )
        .then((res) => {
          if (res.status === 200) {
            setPast7DaysSubscriptionRecords(
              res.data.subscriptionRecords.reverse()
            )
          }
        })
    )
  }, [])

  const subscriberGainHistory = useMemo(() => {
    if (subscriptionRecords && date?.from && date?.to) {
      return getSubscriberGainCountHistory(
        subscriptionRecords,
        date?.from,
        date?.to
      )
    } else return []
  }, [subscriptionRecords])

  const subscriberLossHistory = useMemo(() => {
    if (subscriptionRecords && date?.from && date?.to) {
      return getSubscriberLossHistory(subscriptionRecords, date?.from, date?.to)
    } else return []
  }, [subscriptionRecords])

  const ESPStats = React.useMemo(
    () =>
      getSubscriberESP(props.allSubscriptionRecords).map((e) => ({
        id: e.id,
        value: e.count,
        label: e.id,
      })),
    [props.allSubscriptionRecords]
  )

  const [pagination, setPagination] = useState<PaginationState>({
    pageSize: 3,
    pageIndex: 0,
  })
  const recentSubscriptionsActivitiesTable = useReactTable({
    data: past7DaysSubscriptionRecords ?? emptyArray,
    columns: recentSubscriptionActivitiesColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    manualPagination: false,
  })

  const [dateRangePreset, setDateRangePreset] = useState<string>('7')

  useEffect(() => {
    if (dateRangePreset !== 'custom') {
      const dayOffset = Number(dateRangePreset)
      setDate({
        from: subDays(Date.now(), dayOffset),
        to: new Date(),
      })
    }
  }, [dateRangePreset])

  return (
    <div className={'flex flex-col gap-4 items-stretch'}>
      <ResizablePanelGroup direction={'horizontal'}>
        <ResizablePanel
          minSize={60}
          maxSize={60}
          className={'min-h-[600px] pr-5'}
        >
          <h2 className={cn(headingStyle.h2)}>Overview</h2>
          <ResizablePanelGroup direction={'vertical'}>
            <ResizablePanel minSize={25} defaultSize={25}>
              <div className={'flex flex-row gap-5 items-center mt-3'}>
                <MetricCard
                  count={props.subscribersCount}
                  name={'Subscribers'}
                  icon={<Icons.UserCheck size={18} strokeWidth={2} />}
                />
                <MetricCard
                  count={props.blacklistedSubscribersCount}
                  name={'Blacklisted'}
                  icon={<Icons.UserX size={18} strokeWidth={2} />}
                />
              </div>
            </ResizablePanel>
            <ResizableHandle className={'invisible'} />
            <ResizablePanel>
              <Card className={'w-full max-h-full'}>
                <CardHeader>
                  <CardTitle>Past 7 days</CardTitle>
                  <CardDescription>
                    Recent activities of your subscription
                  </CardDescription>
                </CardHeader>

                <CardContent className={'flex flex-col gap-3 h-56'}>
                  {isPast7DaysSubscriptionRecordsLoading && (
                    <>
                      <Skeleton className={'w-full h-9'}></Skeleton>
                      <Skeleton className={'w-full h-40'}></Skeleton>
                    </>
                  )}
                  {!isPast7DaysSubscriptionRecordsLoading && (
                    <BaseDataTable<SubscriptionRecord, string>
                      className={'border-none'}
                      table={recentSubscriptionsActivitiesTable}
                      columns={recentSubscriptionActivitiesColumns}
                    />
                  )}
                </CardContent>
                <CardFooter
                  className={'flex flex-row justify-end items-center'}
                >
                  <span className={'text-xs text-muted-foreground mr-2'}>
                    Page {pagination.pageIndex + 1} of{' '}
                    {recentSubscriptionsActivitiesTable.getPageCount()}
                  </span>
                  <Button
                    disabled={
                      !recentSubscriptionsActivitiesTable.getCanPreviousPage()
                    }
                    variant={'outline'}
                    className={'w-7 h-7'}
                    size={'icon'}
                    onClick={() =>
                      recentSubscriptionsActivitiesTable.previousPage()
                    }
                  >
                    <Icons.ChevronLeft strokeWidth={1.5} size={17} />
                  </Button>
                  <Button
                    disabled={
                      !recentSubscriptionsActivitiesTable.getCanNextPage()
                    }
                    variant={'outline'}
                    className={'w-7 h-7 ml-2'}
                    size={'icon'}
                    onClick={() =>
                      recentSubscriptionsActivitiesTable.nextPage()
                    }
                  >
                    <Icons.ChevronRight strokeWidth={1.5} size={17} />
                  </Button>
                </CardFooter>
              </Card>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
        <ResizableHandle className={'invisible'} />
        <ResizablePanel className={'min-h-[510px]'}>
          <h2 className={cn(headingStyle.h2, 'mt-2')}>Analytics</h2>
          <div className={'flex flex-row justify-start items-center mt-3'}>
            <Card className={'min-h-[350px] min-w-[400px] w-full'}>
              <CardHeader>
                <CardTitle>Subscribers ESP</CardTitle>
                <CardDescription>
                  Subscriber's Email Service Providers
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[400px] min-w-[350px] w-full pt-2 flex justify-center items-center">
                {ESPStats.length > 0 && (
                  <PieChart
                    className={'shadow-md'}
                    data={ESPStats}
                    innerRadius={0.3}
                    enableArcLabels={false}
                    enableArcLinkLabels={true}
                    arcLinkLabelsDiagonalLength={10}
                    arcLinkLabelsStraightLength={10}
                    // arcLinkLabel={(data) => `${data.label}(${data.value})`}
                    margin={{
                      bottom: 90,
                      top: 0,
                      left: 80,
                      right: 80,
                    }}
                    legends={[
                      {
                        anchor: 'bottom',
                        direction: 'row',
                        itemDirection: 'top-to-bottom',
                        symbolShape: 'square',
                        itemHeight: 0,
                        itemWidth: 100,
                        translateY: 45,
                      },
                    ]}
                  />
                )}
                {ESPStats.length <= 0 && (
                  <p className="text-muted-foreground text-sm">No Data</p>
                )}
              </CardContent>
            </Card>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>

      <h2 className={cn(headingStyle.h2)}>History</h2>
      <div className={'flex flex-row items-center'}>
        <Tabs defaultValue={'subscribe'} className={'w-full h-auto'}>
          <TabsList className={'grid grid-cols-2 border w-60'}>
            <TabsTrigger value={'subscribe'}>Subscribe</TabsTrigger>
            <TabsTrigger value={'unsubscribe'}>Unsubscribe</TabsTrigger>
          </TabsList>
          <TabsContent value={'unsubscribe'}>
            <Card className={'w-auto overflow-clip'}>
              <CardHeader></CardHeader>
              <CardContent className={'w-full h-[420px] flex flex-col gap-3'}>
                <Select
                  value={dateRangePreset}
                  onValueChange={setDateRangePreset}
                >
                  <SelectTrigger className={'w-52'}>
                    <SelectValue placeholder={'Select filter'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={'7'}>Last 7 days</SelectItem>
                    <SelectItem value={'20'}>Last 20 days</SelectItem>
                    <SelectItem value={'30'}>Last 30 days</SelectItem>
                    <SelectItem value={'custom'}>Custom</SelectItem>
                  </SelectContent>
                </Select>
                <Popover>
                  <PopoverTrigger disabled={dateRangePreset !== 'custom'}>
                    <Button
                      disabled={dateRangePreset !== 'custom'}
                      variant={'outline'}
                      className={'flex flex-row gap-2 '}
                    >
                      <Icons.Calendar strokeWidth={1.5} size={14} />
                      {date?.from ? (
                        date.to ? (
                          <>
                            {format(date.from, 'LLL dd, y')} -{' '}
                            {format(date.to, 'LLL dd, y')}
                          </>
                        ) : (
                          format(date.from, 'LLL dd, y')
                        )
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className={'w-auto'} align={'start'}>
                    <Calendar
                      initialFocus
                      mode={'range'}
                      defaultMonth={date?.from}
                      selected={date}
                      onSelect={setDate}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
                {isSubscriptionRecordsLoading && (
                  <div className={'w-full h-full space-y-3 p-5'}>
                    <Skeleton className={'w-full h-[75%]'}></Skeleton>
                    <Skeleton className={'w-full h-[30px]'}></Skeleton>
                  </div>
                )}
                {!isSubscriptionRecordsLoading && (
                  <Line
                    colors={{
                      scheme: 'accent',
                    }}
                    curve={'linear'}
                    lineWidth={3}
                    useMesh={true}
                    enablePoints={false}
                    enableGridY={true}
                    enableArea={true}
                    yScale={{
                      type: 'linear',
                      min: 0,
                      max: 'auto',
                    }}
                    xScale={{
                      type: 'time',
                      format: '%Y-%m-%dT%H:%M:%S.%L%Z',
                    }}
                    margin={{
                      top: 20,
                      bottom: 70,
                      left: 50,
                      right: 50,
                    }}
                    xFormat={(value) => new Date(value).toDateString()}
                    axisLeft={{
                      tickValues: 2,
                      legend: 'Count',
                      legendOffset: -40,
                      legendPosition: 'middle',
                    }}
                    axisBottom={{
                      format: '%b %d',
                      tickValues: 'every 3 days',
                    }}
                    legends={[
                      {
                        anchor: 'bottom',
                        direction: 'row',
                        itemDirection: 'left-to-right',
                        itemWidth: 130,
                        itemHeight: 0,
                        translateY: 50,
                      },
                    ]}
                    data={[
                      {
                        id: 'Subscriber Loss',
                        data: subscriberLossHistory,
                      },
                    ]}
                  />
                )}
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value={'subscribe'}>
            <Card className={'w-auto overflow-clip'}>
              <CardHeader></CardHeader>
              <CardContent className={'w-full h-[420px] flex flex-col gap-3'}>
                <Select
                  value={dateRangePreset}
                  onValueChange={setDateRangePreset}
                >
                  <SelectTrigger className={'w-52'}>
                    <SelectValue placeholder={'Select filter'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={'7'}>Last 7 days</SelectItem>
                    <SelectItem value={'20'}>Last 20 days</SelectItem>
                    <SelectItem value={'30'}>Last 30 days</SelectItem>
                    <SelectItem value={'custom'}>Custom</SelectItem>
                  </SelectContent>
                </Select>
                <Popover>
                  <PopoverTrigger disabled={dateRangePreset !== 'custom'}>
                    <Button
                      disabled={dateRangePreset !== 'custom'}
                      variant={'outline'}
                      className={'flex flex-row gap-2 '}
                    >
                      <Icons.Calendar strokeWidth={1.5} size={14} />
                      {date?.from ? (
                        date.to ? (
                          <>
                            {format(date.from, 'LLL dd, y')} -{' '}
                            {format(date.to, 'LLL dd, y')}
                          </>
                        ) : (
                          format(date.from, 'LLL dd, y')
                        )
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className={'w-auto'} align={'start'}>
                    <Calendar
                      initialFocus
                      mode={'range'}
                      defaultMonth={date?.from}
                      selected={date}
                      onSelect={setDate}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
                {isSubscriptionRecordsLoading && (
                  <div className={'w-full h-full space-y-3 p-5'}>
                    <Skeleton className={'w-full h-[75%]'}></Skeleton>
                    <Skeleton className={'w-full h-[30px]'}></Skeleton>
                  </div>
                )}
                {!isSubscriptionRecordsLoading && (
                  <Line
                    curve={'linear'}
                    lineWidth={3}
                    useMesh={true}
                    enablePoints={false}
                    enableGridY={true}
                    enableArea={true}
                    yScale={{
                      type: 'linear',
                      min: 0,
                      max: 'auto',
                    }}
                    xScale={{
                      type: 'time',
                      format: '%Y-%m-%dT%H:%M:%S.%L%Z',
                    }}
                    margin={{
                      top: 20,
                      bottom: 70,
                      left: 50,
                      right: 50,
                    }}
                    xFormat={(value) => new Date(value).toDateString()}
                    axisLeft={{
                      tickValues: 2,
                      legend: 'Count',
                      legendOffset: -40,
                      legendPosition: 'middle',
                    }}
                    axisBottom={{
                      format: '%b %d',
                      tickValues: 'every 3 days',
                    }}
                    legends={[
                      {
                        anchor: 'bottom',
                        direction: 'row',
                        itemDirection: 'left-to-right',
                        itemWidth: 130,
                        itemHeight: 0,
                        translateY: 50,
                      },
                    ]}
                    data={[
                      {
                        id: 'Subscriber Gained',
                        data: subscriberGainHistory,
                      },
                    ]}
                  />
                )}
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

SubscriberOverviewPage.layout = (page: React.ReactElement) => (
  <NewDashBoardLayout activeSubPageName={'SubscriberOverview'}>
    {page}
  </NewDashBoardLayout>
)

export default SubscriberOverviewPage
