import {Editor} from "@tiptap/react";
import {Button} from "./Button";
import {Icons} from "./Icons";
import {Separator} from "./Separator";
import React, {useRef, useState} from "react";
import {Dialog, DialogContent, DialogTrigger} from "./Dialog";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "./Tabs";
import {Input} from "./Input";
import imageCompression from "browser-image-compression";
import {blobToBase64} from "base64-blob";

const TextEditorFixedMenu = ({iconSize, iconStrokeWidth, editor}: {
    iconSize: number,
    iconStrokeWidth: number,
    editor: Editor
}) => {
    const uploadInputRef = useRef<HTMLInputElement | null>(null);
    const urlInputRef = useRef<HTMLInputElement | null>(null);

    const [isImageDialogOpen, setIsImageDialogOpen] = useState<boolean>(false);

    async function handleImageUpload() {
        const imageFile = uploadInputRef.current?.files?.[0];
        if (imageFile) {
            const imageCompressionOptions = {
                maxSizeMB: 1,
                maxWidthOrHeight: 800,
                useWebWorker: true,
            }
            const compressedImageFile = await imageCompression(imageFile, imageCompressionOptions);
            const base64Image = await blobToBase64(compressedImageFile);

            editor.chain().focus()
                .setImage({
                    src: base64Image
                }).run();
            setIsImageDialogOpen(false);
        }
    }

    function handleImageUrlSubmission() {
        const imageUrl = urlInputRef.current?.value;
        if (imageUrl) {
            editor.chain().focus()
                .setImage({
                    src: imageUrl
                }).run();
            setIsImageDialogOpen(false);
        }
    }

    return <div
        className={"border border-border bg-background rounded-md mt-4 flex flex-row gap-1 justify-center items-center px-1.5 py-1"}>
        <Button variant={editor.isActive("bold") ? "default" : "ghost"} size={"icon"} onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBold().run();
        }}>
            <Icons.Bold size={iconSize} strokeWidth={iconStrokeWidth}/>
        </Button>
        <Button variant={editor.isActive("italic") ? "default" : "ghost"} size={"icon"} onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleItalic().run();
        }}>
            <Icons.Italic size={iconSize} strokeWidth={iconStrokeWidth}/>
        </Button>
        <Button variant={editor.isActive("underline") ? "default" : "ghost"} size={"icon"} onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleUnderline().run();
        }}>
            <Icons.Underline size={iconSize} strokeWidth={iconStrokeWidth}/>
        </Button>
        <Button variant={editor.isActive("strike") ? "default" : "ghost"} size={"icon"} onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleStrike().run();
        }}>
            <Icons.Strikethrough size={iconSize} strokeWidth={iconStrokeWidth}/>
        </Button>
        <Separator orientation={"vertical"} className={"h-5"}/>
        <Dialog open={isImageDialogOpen} onOpenChange={setIsImageDialogOpen}>
            <DialogTrigger>
                <Button variant={editor.isActive("strike") ? "default" : "ghost"} size={"icon"}>
                    <Icons.Image size={iconSize} strokeWidth={iconStrokeWidth}/>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <Tabs className={"w-full flex flex-col justify-start items-center"} defaultValue={"upload"}>
                    <TabsList className={"mb-4"}>
                        <TabsTrigger value={"upload"} defaultChecked>Upload</TabsTrigger>
                        <TabsTrigger value={"fromUrl"}>From URL</TabsTrigger>
                    </TabsList>
                    <TabsContent value={"upload"}>
                        <Input type={"file"} ref={uploadInputRef} accept={"image/*"}
                               onChange={async () => await handleImageUpload()}/>
                    </TabsContent>
                    <TabsContent value={"fromUrl"} className={"flex flex-row gap-2 justify-center items-center"}>
                        <Input type={"text"} ref={urlInputRef} placeholder={"Enter your image url"} className={"w-60"}/>
                        <Button variant={"default"} onClick={() => handleImageUrlSubmission()}>Confirm</Button>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
        <Separator orientation={"vertical"} className={"h-5"}/>
        <Button variant={editor.isActive("heading", {level: 1}) ? "default" : "ghost"} size={"icon"} onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({level: 1}).run();
        }}>
            <Icons.Heading1 size={iconSize} strokeWidth={iconStrokeWidth}/>
        </Button><Button variant={editor.isActive("heading", {level: 2}) ? "default" : "ghost"} size={"icon"}
                         onClick={(e) => {
                             e.preventDefault();
                             editor.chain().focus().toggleHeading({level: 2}).run();
                         }}>
        <Icons.Heading2 size={iconSize} strokeWidth={iconStrokeWidth}/>
    </Button><Button variant={editor.isActive("heading", {level: 3}) ? "default" : "ghost"} size={"icon"}
                     onClick={(e) => {
                         e.preventDefault();
                         editor.chain().focus().toggleHeading({level: 3}).run();
                     }}>
        <Icons.Heading3 size={iconSize} strokeWidth={iconStrokeWidth}/>
    </Button>
    </div>;
}

export default TextEditorFixedMenu;
