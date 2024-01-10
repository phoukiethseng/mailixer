import React, {useEffect, useRef} from "react";
import {EditorContent, useEditor} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import {Card, CardContent} from "./Card";
import {Separator} from "./Separator";
import {Button} from "./Button";
import TextEditorFixedMenu from "./TextEditorFixedMenu";
import {ComposeNewsletter} from "../types/models";

function ComposeNewsletterTextEditor(props: {
    newsletter?: ComposeNewsletter,
    onSend: (data: ComposeNewsletter) => void,
    onSave: (data: ComposeNewsletter) => void
}) {
    const subjectInputRef = useRef<HTMLInputElement | null>(null);
    const newsletterContent = props?.newsletter?.content ?? "";
    const textEditor = useEditor({
        content: newsletterContent,
        extensions: [StarterKit, Underline, Link],
        editorProps: {
            attributes: {
                class: 'prose dark:prose-invert prose-base m-5 focus:outline-none',
            },
        },
    });

    useEffect(() => {
        if (newsletterContent && textEditor) {
            textEditor.chain().setContent(newsletterContent).run();
        }
    }, [newsletterContent, textEditor]);

    function getData(): ComposeNewsletter {
        return {
            //@ts-ignore
            subject: subjectInputRef?.current.value,
            content: textEditor?.getHTML() ?? "",
            contentType: "HTML"
        };
    }

    if (!textEditor) return (<p>Failed to initialize text editor</p>);
    return <Card>
        <div className={"flex flex-row justify-start items-center gap-2 px-3.5 py-2"}>
            <p className={"font-light text-muted-foreground"}>Subject</p>
            <input
                defaultValue={props.newsletter?.subject ?? ""} ref={subjectInputRef} type={"text"} className={"p-1 w-full outline-0"}/>
        </div>
        <Separator/>
        <CardContent className={"flex flex-col items-center justify-start"}>
            <TextEditorFixedMenu editor={textEditor} iconSize={14} iconStrokeWidth={2.5}/>
            <div className={"w-full min-h-[57vh] mt-2"}>
                <EditorContent editor={textEditor} className={""}/>
            </div>
            <div className={"w-full flex flex-row justify-start items-center gap-4"}>
                <Button onClick={() => props.onSend(getData())}>Send</Button>
                <Button variant={"secondary"} onClick={() => props.onSave(getData())}>Save</Button>
            </div>
        </CardContent>
    </Card>;
}

export default ComposeNewsletterTextEditor;
