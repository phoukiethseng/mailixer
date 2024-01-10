import {Editor} from "@tiptap/react";
import {Button} from "./Button";
import {Icons} from "./Icons";
import {Separator} from "./Separator";
import React from "react";

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

export default TextEditorFixedMenu;
