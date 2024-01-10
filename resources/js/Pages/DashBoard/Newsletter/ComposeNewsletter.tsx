import React, {useRef} from "react";
import DashBoardLayout from "../../../Layouts/DashBoardLayout";
import {Card, CardContent,} from "../../../Components/Card";

import {InertiaSharedProps} from "../../../config/site";
import {router} from "@inertiajs/react";
import {useMessageToast} from "../../../lib/hooks/useMessageToast";
import {Newsletter} from "../../../types/models";
import {Separator} from "../../../Components/Separator";
import {Editor, EditorContent, useEditor} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {Button} from "../../../Components/Button";
import {Icons} from "../../../Components/Icons";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";

type NewsletterPageProps = {} & InertiaSharedProps;
type ComposeNewsletter = Pick<Newsletter, "subject" | "content" | "contentType">;

const TextEditorFixedMenu = ({iconSize, iconStrokeWidth, editor}: {
    iconSize: number,
    iconStrokeWidth: number,
    editor: Editor
}) => {
    return <div
        className={"border border-border bg-background rounded-md mt-4 flex flex-row gap-1 justify-center items-center px-1.5 py-1"}>
        <Button variant={editor.isActive("bold") ? "default" : "ghost"} size={"icon"} onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBold().run();
        }}>
            <Icons.Bold size={iconSize} strokeWidth={iconStrokeWidth}/>
        </Button>
        <Separator orientation={"vertical"} className={"h-5"}/>
        <Button variant={editor.isActive("italic") ? "default" : "ghost"} size={"icon"} onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleItalic().run();
        }}>
            <Icons.Italic size={iconSize} strokeWidth={iconStrokeWidth}/>
        </Button>
        <Separator orientation={"vertical"} className={"h-5"}/>
        <Button variant={editor.isActive("underline") ? "default" : "ghost"} size={"icon"} onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleUnderline().run();
        }}>
            <Icons.Underline size={iconSize} strokeWidth={iconStrokeWidth}/>
        </Button>
        <Separator orientation={"vertical"} className={"h-5"}/>
        <Button variant={editor.isActive("strike") ? "default" : "ghost"} size={"icon"} onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleStrike().run();
        }}>
            <Icons.Strikethrough size={iconSize} strokeWidth={iconStrokeWidth}/>
        </Button>
    </div>;
}

function ComposeNewsletterTextEditor(props: {
    onSend: (data: ComposeNewsletter) => void,
    onSave: (data: ComposeNewsletter) => void
}) {
    const subjectInputRef = useRef();
    const editor = useEditor({
        extensions: [StarterKit, Underline, Link],
        editorProps: {
            attributes: {
                class: 'prose dark:prose-invert prose-base m-5 focus:outline-none',
            },
        },
    });
    if (!editor) return (<p>Failed to initialize text editor</p>);

    function getData(): ComposeNewsletter {
        return {
            //@ts-ignore
            subject: subjectInputRef?.current.value,
            content: editor?.getHTML() ?? "",
            contentType: "HTML"
        };
    }

    return <Card>
        <div className={"flex flex-row justify-start items-center gap-2 px-3.5 py-2"}>
            <p className={"font-light text-muted-foreground"}>Subject</p>
            <input
                //@ts-ignore
                ref={subjectInputRef} type={"text"} className={"p-1 w-full outline-0"}/>
        </div>
        <Separator/>
        <CardContent className={"flex flex-col items-center justify-start"}>
            <TextEditorFixedMenu editor={editor} iconSize={14} iconStrokeWidth={2.5}/>
            <div className={"w-full min-h-[57vh] mt-2"}>
                <EditorContent editor={editor} className={""}/>
            </div>
            <div className={"w-full flex flex-row justify-start items-center gap-4"}>
                <Button onClick={() => props.onSend(getData())}>Send</Button>
                <Button variant={"secondary"} onClick={() => props.onSave(getData())}>Save as Draft</Button>
            </div>
        </CardContent>
    </Card>;
}

const ComposeNewsletterPage = ({auth, ...props}: NewsletterPageProps) => {
    useMessageToast(props);
    function handleSendNewsletter(data: ComposeNewsletter) {
        router.post('/dashboard/sendNewsletter', data);
    }

    function handleSaveNewsletterAsDraft(data: ComposeNewsletter) {
        // const content_type_id: number =
        //     //@ts-ignore
        //     NEWSLETTER_CONTENT_TYPE[data.content_type];
        // router.post("/dashboard/saveNewsletter", {
        //     subject: data.subject,
        //     content: data.content,
        //     content_type_id,
        // });
        router.post("/dashboard/saveNewsletter", data);
    }

    return (
        <ComposeNewsletterTextEditor onSend={handleSendNewsletter} onSave={
            handleSaveNewsletterAsDraft
        }/>
    );
};

ComposeNewsletterPage.layout = (page: React.ReactNode) => (
    <DashBoardLayout activePage="ComposeNewsletter">{page}</DashBoardLayout>
);

export default ComposeNewsletterPage;
