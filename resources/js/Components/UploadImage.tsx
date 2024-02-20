import React, {ChangeEvent, MouseEvent} from "react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "./Tabs";
import {Input} from "./Input";
import {Button} from "./Button";

export function UploadImage(props: {
    ref?: React.MutableRefObject<HTMLInputElement | null>,
    onImageFileSelectionChange: (e: ChangeEvent<HTMLInputElement>) => (Promise<void> | void),
    ref1?: React.MutableRefObject<HTMLInputElement | null>,
    onImageURLSubmission: (e: MouseEvent<HTMLButtonElement>) => void,
    disableFromUrl?: boolean,
    disbaleFileUpload?: boolean,
}) {
    return <Tabs className={"w-full flex flex-col justify-start items-center"} defaultValue={"upload"}>
        <TabsList className={"mb-4"}>
            <TabsTrigger value={"upload"} defaultChecked>Upload</TabsTrigger>
            <TabsTrigger value={"fromUrl"}>From URL</TabsTrigger>
        </TabsList>
        <TabsContent value={"upload"}>
            {!(props?.disbaleFileUpload) && <Input type={"file"} ref={props.ref} accept={"image/*"}
                   onChange={e => props.onImageFileSelectionChange(e)}/>}
            {(props?.disbaleFileUpload) && disableFunctionality()}
        </TabsContent>
        <TabsContent value={"fromUrl"} className={"flex flex-row gap-2 justify-center items-center"}>
            {!(props.disableFromUrl) && <>
                <Input type={"text"} ref={props.ref1} placeholder={"Enter your image url"}
                       className={"w-60"}/>
                <Button variant={"default"} onClick={e => props.onImageURLSubmission(e)}>Confirm</Button>
            </>}
            {(props?.disableFromUrl) && disableFunctionality()}
        </TabsContent>
    </Tabs>;
}

function disableFunctionality() {
    return (
        <span>This functionality is disabled</span>
    )
}
