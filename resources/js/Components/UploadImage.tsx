import React, { Ref, useRef } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/Tabs'
import { Input } from '@/Components/Input'
import { Button } from '@/Components/Button'

export function UploadImage(props: {
  onImageFileSelectionChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => Promise<void> | void
  onImageURLSubmission: (url: string) => void
  disableFromUrl?: boolean
  disableFileUpload?: boolean
}) {
  const urlInputRef = useRef<HTMLInputElement | null>()

  return (
    <Tabs
      className={'w-full flex flex-col justify-start items-center'}
      defaultValue={'upload'}
    >
      <TabsList className={'mb-4'}>
        <TabsTrigger value={'upload'} defaultChecked>
          Upload
        </TabsTrigger>
        <TabsTrigger value={'fromUrl'}>From URL</TabsTrigger>
      </TabsList>
      <TabsContent value={'upload'}>
        {!props?.disableFileUpload && (
          <Input
            type={'file'}
            accept={'image/*'}
            onChange={(e) => props.onImageFileSelectionChange(e)}
          />
        )}
        {props?.disableFileUpload && disableFunctionality()}
      </TabsContent>
      <TabsContent
        value={'fromUrl'}
        className={'flex flex-row gap-2 justify-center items-center'}
      >
        {!props.disableFromUrl && (
          <>
            <Input
              type={'text'}
              ref={urlInputRef as Ref<HTMLInputElement>}
              placeholder={'Enter your image url'}
              className={'w-60'}
            />
            <Button
              variant={'default'}
              onClick={(e) =>
                props.onImageURLSubmission(urlInputRef.current?.value ?? '')
              }
            >
              Confirm
            </Button>
          </>
        )}
        {props?.disableFromUrl && disableFunctionality()}
      </TabsContent>
    </Tabs>
  )
}

function disableFunctionality() {
  return <span>This functionality is disabled</span>
}
