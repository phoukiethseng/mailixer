import React from "react";
import DashBoardLayout from "../../../Layouts/DashBoardLayout";
import {Card, CardContent,} from "../../../Components/Card";
import z from "zod";

import {InertiaSharedProps} from "../../../config/site";
import {router} from "@inertiajs/react";
import {useMessageToast} from "../../../lib/hooks/useMessageToast";
import {newsletterContentType} from "../../../types/models";
import {Separator} from "../../../Components/Separator";
import {Editor, EditorContent, useEditor} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {Button} from "../../../Components/Button";
import {Icons} from "../../../Components/Icons";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";

const composeNewsletterSchema = z.object({
    subject: z.string().nonempty().default("Mailixer Newsletter"),
    content_type: z.string().nonempty(),
    content: z.string(),
});

type ComposeNewsletter = z.infer<typeof composeNewsletterSchema>;
type NewsletterPageProps = {} & InertiaSharedProps;

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

const ComposeNewsletterPage = ({auth, ...props}: NewsletterPageProps) => {
    useMessageToast(props);

    const editor = useEditor({
        extensions: [StarterKit, Underline, Link],
        editorProps: {
            attributes: {
                class: 'prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none',
            },
        },
    })

    function handleComposeNewsletterSubmit(data: ComposeNewsletter) {
        const content_type_id: number =
            //@ts-ignore
            newsletterContentType[data.content_type];
        router.post("/dashboard/sendNewsletter", {
            subject: data.subject,
            content: data.content,
            content_type_id,
        });
    }

    function handleSaveNewsletterAsDraft(data: ComposeNewsletter) {
        const content_type_id: number =
            //@ts-ignore
            newsletterContentType[data.content_type];
        router.post("/dashboard/saveNewsletter", {
            subject: data.subject,
            content: data.content,
            content_type_id,
        });
    }

    return (
        editor && <Card>
            <div className={"flex flex-row justify-start items-center gap-2 px-3.5 py-2"}>
                <p className={"font-light text-muted-foreground"}>Subject</p>
                <input type={"text"} className={"p-1 w-full outline-0"}/>
            </div>
            <Separator/>
            <CardContent className={"flex flex-col justify-start items-center bg-muted"}>
                <TextEditorFixedMenu editor={editor} iconSize={14} iconStrokeWidth={2.5}/>
                <div className={"w-full min-h-[60vh] mt-2"}>
                    <EditorContent editor={editor} className={""}/>
                </div>
            </CardContent>
        </Card>
    );
};

ComposeNewsletterPage.layout = (page: React.ReactNode) => (
    <DashBoardLayout activePage="ComposeNewsletter">{page}</DashBoardLayout>
);

export default ComposeNewsletterPage;
