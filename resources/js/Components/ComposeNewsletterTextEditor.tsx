import React, { useEffect, useRef } from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import { Card, CardContent } from '@/Components/Card'
import { Separator } from '@/Components/Separator'
import { Button } from '@/Components/Button'
import TextEditorFixedMenu from '@/Components/TextEditorFixedMenu'
import { ComposeNewsletter } from '@/types/DTO'
import { ScrollArea } from '@/Components/ScrollArea'
import { cn } from '@/lib/utils'
import { EditorExtensionList } from '@/config/tiptap/extensions'

function ComposeNewsletterTextEditor(props: {
  newsletter?: ComposeNewsletter
  onSend: (data: ComposeNewsletter) => void
  onSave: (data: ComposeNewsletter) => void
}) {
  const subjectInputRef = useRef<HTMLInputElement | null>(null)
  const newsletterContent = props?.newsletter?.content ?? ''
  const textEditor = useEditor({
    extensions: EditorExtensionList,
    editorProps: {
      attributes: {
        class: 'prose dark:prose-invert prose-base m-5 focus:outline-none',
      },
    },
  })

  useEffect(() => {
    if (newsletterContent && textEditor) {
      textEditor.chain().setContent(newsletterContent).run()
    }
  }, [newsletterContent, textEditor])

  function getData(): ComposeNewsletter {
    return {
      subject: subjectInputRef.current?.value ?? 'Mailixer Newsletter',
      content: textEditor?.getHTML() ?? '',
      contentType: 'HTML',
    }
  }

  if (!textEditor) return <p>Failed to initialize text editor</p>
  const subjectInputIsEmpty =
    subjectInputRef.current?.value === '' ||
    subjectInputRef.current?.value === undefined
  return (
    <Card>
      <div
        className={'flex flex-row justify-start items-center gap-2 px-3.5 py-2'}
      >
        <p
          className={cn(
            'font-light text-muted-foreground',
            subjectInputIsEmpty && "text-destructive before:content-['*']"
          )}
        >
          Subject
        </p>
        <input
          ref={subjectInputRef}
          // Ignore this error is actually okay, because we know for sure that type of event being pass over
          // to this handler function is going to be KeyboardEvent
          // @ts-ignore
          onKeyDown={(e: KeyboardEvent) =>
            e.key === 'Enter' ? textEditor?.chain().focus().run() : null
          }
          placeholder={'Newsletter subject cannot be empty'}
          defaultValue={props.newsletter?.subject ?? ''}
          type={'text'}
          className={'p-1 w-full outline-0'}
        />
      </div>
      <Separator />
      <CardContent className={'flex flex-col items-center justify-start'}>
        <TextEditorFixedMenu
          editor={textEditor}
          iconSize={14}
          iconStrokeWidth={2.5}
        />
        <ScrollArea className={'w-full h-[57vh] mt-2'}>
          <EditorContent
            editor={textEditor}
            className={'border-l-2 border-secondary'}
          />
        </ScrollArea>
        <Separator className={'mb-4'} />
        <div
          className={'w-full flex flex-row justify-start items-center gap-4'}
        >
          <Button onClick={() => props.onSend(getData())}>Send</Button>
          <Button variant={'secondary'} onClick={() => props.onSave(getData())}>
            Save
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default ComposeNewsletterTextEditor
