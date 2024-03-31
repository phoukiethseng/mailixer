import React, { useEffect, useMemo, useState, useTransition } from 'react'
import { NewsletterSendResult } from '@/types/dto'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/Components/Resizable'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/Components/Card'
import { Badge } from '@/Components/Badge'
import { Icons } from '@/Components/Icons'
import { useSelectableList } from '@/lib/hooks/useSelectableList'
import { cn } from '@/lib/utils'
import axios from 'axios'
import { ScrollArea } from '@/Components/ScrollArea'
import { HashLoader } from 'react-spinners'
// @ts-ignore
import NewDashBoardLayout from '@/Layouts/NewDashBoardLayout'
import { AspectRatio } from '@/Components/AspectRatio'
import useLoader from '@/lib/hooks/useLoader'
import { Input } from '@/Components/Input'
import IconInput from '@/Components/IconInput'

type NewsletterStatusPageProps = {
  newsletters: NewsletterSendResult[]
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
                  <CardDescription
                    className={'flex flex-row gap-2 justify-start items-center'}
                  >
                    <Icons.Clock4
                      className={'text-muted-foreground'}
                      strokeWidth={1.5}
                      size={12}
                    />
                    <span className={'text-xs text-muted-foreground'}>{}</span>
                  </CardDescription>
                </CardHeader>
                {/*<CardContent>*/}
                {/*    <p>{newsletter.content}</p>*/}
                {/*</CardContent>*/}
                <CardContent>
                  <div className={'flex flex-row gap-2 justify-between w-full'}>
                    <Badge variant={'outline'}>{item.value.status}</Badge>
                    <div
                      className={cn(
                        'flex flex-row justify-between gap-2',
                        item.value.status === 'PENDING' && 'hidden'
                      )}
                    >
                      <div
                        className={
                          'flex flex-row gap-1.5 justify-between items-center rounded-lg px-2 py-1 bg-muted'
                        }
                      >
                        <Icons.UserCheck
                          strokeWidth={2}
                          size={17}
                          className={'text-green-600 '}
                        />
                        <span className={'text-primary text-sm font-semibold'}>
                          {
                            item.value.sendResults.filter((v) => v.isSuccess)
                              .length
                          }
                        </span>
                      </div>
                      <div
                        className={
                          'flex flex-row gap-1.5 justify-between items-center rounded-lg px-2 py-1 border border-red-200'
                        }
                      >
                        <Icons.UserX
                          strokeWidth={2}
                          size={17}
                          className={'text-destructive'}
                        />
                        <span
                          className={'text-destructive text-sm font-semibold'}
                        >
                          {
                            item.value.sendResults.filter((v) => !v.isSuccess)
                              .length
                          }
                        </span>
                      </div>
                    </div>
                  </div>
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
              <div
                className={
                  'flex flex-row gap-4 justify-center items-center w-full h-full mb-5'
                }
              >
                <Card className={'w-36 h-32'}>
                  <CardHeader
                    className={
                      'flex flex-row justify-between gap-4 items-center'
                    }
                  >
                    <CardTitle>Delivered</CardTitle>
                    <Icons.UserCheck strokeWidth={1.5} size={17} />
                  </CardHeader>
                  <CardContent>
                    <p className={'text-5xl font-bold text-center'}>
                      {
                        currentNewsletter.value.sendResults.filter(
                          (result) => result.isSuccess
                        ).length
                      }
                    </p>
                  </CardContent>
                </Card>
                <Card className={'w-36 h-32 text-destructive'}>
                  <CardHeader
                    className={
                      'flex flex-row justify-between gap-4 items-center'
                    }
                  >
                    <CardTitle>Failed</CardTitle>
                    <Icons.UserCheck strokeWidth={1.5} size={17} />
                  </CardHeader>
                  <CardContent>
                    <p className={'text-5xl font-bold text-center'}>
                      {
                        currentNewsletter.value.sendResults.filter(
                          (result) => !result.isSuccess
                        ).length
                      }
                    </p>
                  </CardContent>
                </Card>
              </div>
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
