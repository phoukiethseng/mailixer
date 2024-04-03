import React, { useEffect, useMemo, useState } from 'react'
import { EMAIL_STATUS, NewsletterWithSendResult } from '@/types/dto'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/Components/Resizable'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/Components/Card'
import { Badge } from '@/Components/Badge'
import { Icons } from '@/Components/Icons'
import { ListItem, useSelectableList } from '@/lib/hooks/useSelectableList'
import { cn } from '@/lib/utils'
import axios from 'axios'
import { ScrollArea } from '@/Components/ScrollArea'
import { HashLoader } from 'react-spinners'
// @ts-ignore
import NewDashBoardLayout from '@/Layouts/NewDashBoardLayout'
import { AspectRatio } from '@/Components/AspectRatio'
import useLoader from '@/lib/hooks/useLoader'
import IconInput from '@/Components/IconInput'
import { LucideIcon } from 'lucide-react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/Components/Carousel'

type NewsletterStatusPageProps = {
  newsletters: NewsletterWithSendResult[]
}

function SendResultMetric(props: {
  name: string
  description: string
  currentNewsletter: ListItem<NewsletterWithSendResult>
  predicate: (
    result: NewsletterWithSendResult['sendResults'][number]
  ) => boolean
  icon: LucideIcon
}) {
  const Icon = props.icon
  return (
    <Card className={'min-w-44'}>
      <CardHeader
        className={'flex flex-row justify-between items-center space-y-0'}
      >
        <div
          className={'flex flex-row justify-start items-center gap-1 space-y-0'}
        >
          <CardTitle className={'text-md'}>{props.name}</CardTitle>
        </div>
        <Icon strokeWidth={1.5} size={18} className={'text-muted-foreground'} />
      </CardHeader>
      <CardContent>
        <p className={'text-5xl font-bold text-center'}>
          {
            props.currentNewsletter.value.sendResults.filter(
              props.predicate as (result: unknown) => boolean
            ).length
          }
        </p>
      </CardContent>
    </Card>
  )
}

const NewsletterStatus = (props: NewsletterStatusPageProps) => {
  const [previewHTML, setPreviewHTML] = useState('')
  const { isLoading, load } = useLoader()
  const newsletters = useMemo(() => {
    return props.newsletters.filter((v) => v.status !== 'DRAFT')
  }, [props.newsletters])

  const {
    list,
    select,
    unselect,
    getCurrentSelectionKey,
    setListFilter,
    resetListFilter,
  } = useSelectableList({
    list: newsletters,
  })

  const currentNewsletter = list.get(getCurrentSelectionKey() ?? '')

  useEffect(() => {
    if (currentNewsletter) {
      load(() =>
        axios
          .get(`/dashboard/previewNewsletter/${currentNewsletter.value.id}`)
          .then((res) => {
            if (res.status === 200) {
              setPreviewHTML(res.data.html)
            }
          })
      )
    }
    return () => {}
  }, [currentNewsletter])

  const [searchText, setSearchText] = useState<string>('')

  useEffect(() => {
    if (searchText !== '') {
      setListFilter((value) => value.subject.includes(searchText))
    } else resetListFilter()
  }, [searchText])

  return (
    <ResizablePanelGroup direction={'horizontal'}>
      <ResizablePanel
        minSize={25}
        maxSize={35}
        defaultSize={25}
        onClick={(e) => {
          unselect()
        }}
      >
        <div className={'flex flex-col gap-3 justify-start items-stretch pr-3'}>
          <IconInput
            className={'rounded-lg py-0.5 w-[96%]'}
            icon={Icons.Search}
            enableSeparator={false}
            value={searchText}
            placeholder={'Search Newsletter'}
            onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
              setSearchText(e.target.value)
            }}
          />
          <ScrollArea
            className={'w-full h-[85vh] pr-3'}
            innerContainerClassName={
              'flex flex-col justify-start items-stretch gap-3 pb-4'
            }
          >
            {Array.from(list.values()).map((item) => (
              <Card
                key={item.id}
                className={cn(
                  'transition-colors duration-100 cursor-default hover:bg-muted',
                  {
                    'border-primary': getCurrentSelectionKey() === item.id,
                  }
                )}
                onClick={(e) => {
                  e.stopPropagation()
                  select(item.id)
                }}
              >
                <CardHeader>
                  <CardTitle>{item.value.subject}</CardTitle>
                </CardHeader>
                {/*<CardContent>*/}
                {/*    <p>{newsletter.content}</p>*/}
                {/*</CardContent>*/}
                <CardContent>
                  <Badge variant={'outline'} className={'py-1.5'}>
                    {item.value.status}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </ScrollArea>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel>
        <ScrollArea
          className={'h-[80vh] w-full pl-3'}
          innerContainerClassName={'flex flex-col justify-center items-center'}
        >
          {isLoading && <HashLoader size={80} color={'#16a34a'} />}
          {!isLoading && currentNewsletter && (
            <div className={'w-full flex flex-col justify-start items-center'}>
              <Carousel className={'w-[200px] md:w-[630px] mb-5'}>
                <CarouselPrevious />
                <CarouselNext />
                <CarouselContent>
                  {EMAIL_STATUS.map((status, index) => {
                    const icons = {
                      DELIVERED: Icons.MailCheck,
                      SENT: Icons.Mail,
                      FAILED: Icons.MailX,
                      BOUNCE: Icons.MailMinus,
                      COMPLAINT: Icons.Trash,
                    }
                    return (
                      <CarouselItem
                        key={index}
                        className={cn('lg:basis-1/2 xl:basis-1/3')}
                      >
                        <SendResultMetric
                          name={status}
                          currentNewsletter={currentNewsletter}
                          predicate={(result) => result.status === status}
                          // @ts-ignore
                          icon={icons[status]}
                        />
                      </CarouselItem>
                    )
                  })}
                </CarouselContent>
              </Carousel>
              <Card
                className={
                  'min-w-[300px] xs:w-[350px] sm:w-[450px] md:w-[600px] xl:w-[750px] 2xl:w-[900px]'
                }
              >
                <CardHeader>
                  <CardTitle>Newsletter Content</CardTitle>
                  <CardDescription>Content of sent newsletter</CardDescription>
                </CardHeader>
                <CardContent>
                  <AspectRatio ratio={16 / 9}>
                    <iframe
                      srcDoc={previewHTML}
                      width={'100%'}
                      height={'100%'}
                      sandbox={'allow-scripts allow-forms'}
                    />
                  </AspectRatio>
                </CardContent>
              </Card>
            </div>
          )}
          {!currentNewsletter && !isLoading && (
            <div
              className={'w-full min-h-[70vh] flex justify-center items-center'}
            >
              <span className={'text-muted-foreground'}>
                No newsletter selected
              </span>
            </div>
          )}
        </ScrollArea>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

NewsletterStatus.layout = (page: React.ReactNode) => (
  <NewDashBoardLayout activeSubPageName="NewsletterStatus">
    {page}
  </NewDashBoardLayout>
)

export default NewsletterStatus
