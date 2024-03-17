import React, {MouseEventHandler, useEffect, useState} from "react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/Components/Card";
import {Separator} from "@/Components/Separator";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/Components/Resizable";
import {ScrollArea} from "@/Components/ScrollArea";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/Components/Tabs";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/Components/Form";
import {useForm, useWatch} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod"
import {z} from "zod";
import {Input} from "@/Components/Input";
import {Button} from "@/Components/Button";
import {router} from "@inertiajs/react";
import {useMessageToast} from "@/lib/hooks/useMessageToast";
import { MIME_TYPE } from "@/types/DTO";
import {Avatar, AvatarFallback, AvatarImage} from "@/Components/Avatar";
import {Dialog, DialogContent, DialogTrigger} from "@/Components/Dialog";
import {UploadImage} from "@/Components/UploadImage";
import imageCompression from "browser-image-compression";
import {blobToBase64} from "base64-blob";
import useServerValidationErrorMessage from "@/lib/hooks/useServerValidationErrorMessage";
import {useProfilePicture} from "@/lib/hooks/useProfilePicture";
import {InertiaSharedProps} from "@/types/inertia";

type SettingsPageProps = {
    account: {
        profilePictureUrl: string,
        profilePictureType: MIME_TYPE
        displayName: string;
        email: string;
    }
} & InertiaSharedProps;

const profileFormZod = z.object({
    profilePicture: z.string(),
    displayName: z.string(),
})
const accountFormZod = z.object({
    email: z.string().email(),
    newPassword: z.string(),
    oldPassword: z.string().nullish(),
})

function FormAction(props: { onBackButtonClick: MouseEventHandler<HTMLButtonElement> }) {
    return <div className={"flex flex-row gap-2"}>
        <Button type={"submit"}>Save</Button>
        <Button type={"button"} variant={"secondary"} onClick={props.onBackButtonClick}>Back</Button>
    </div>;
}

export default function SettingsPage(props: SettingsPageProps) {
    useMessageToast(props);

    const profilePicture = useProfilePicture(props.account.profilePictureUrl);

    useEffect(() => {
        if (profilePicture && profilePicture !== "") {
            profileForm.setValue('profilePicture', profilePicture);
        }
    }, [profilePicture]);

    const profileForm = useForm<z.infer<typeof profileFormZod>>({
        resolver: zodResolver(profileFormZod),
        defaultValues: {
            profilePicture: profilePicture ?? "/default_avatar.png",
            displayName: props.account.displayName,
        }
    });


    const accountForm = useForm<z.infer<typeof accountFormZod>>({
        resolver: zodResolver(accountFormZod),
        defaultValues: {
            email: props.account.email,
            newPassword: "",
            oldPassword: "",
        }
    })

    useServerValidationErrorMessage<z.infer<typeof profileFormZod>>(profileForm, "profile", props);
    useServerValidationErrorMessage<z.infer<typeof accountFormZod>>(accountForm, "account", props);

    const currentProfilePicture = useWatch({name: "profilePicture", control: profileForm.control});
    const profilePictureHasChanged =  profilePicture !== currentProfilePicture;
    console.log(currentProfilePicture)

    const [currentProfilePictureType, setCurrentProfilePictureType] = useState<string>(props.account.profilePictureType);

    function handleProfileFormSubmit(data: z.infer<typeof profileFormZod>) {
        const {profilePicture, ...dataWithoutProfilePicture} = data;
        const formData = {
            ...dataWithoutProfilePicture,
            profilePicture: profilePictureHasChanged ? profilePicture : undefined,
            isChangeProfilePicture: profilePictureHasChanged,
            profilePictureType: profilePictureHasChanged ? currentProfilePictureType : undefined,
        };
        router.post('/user/profile', formData);
    }

    function handleAccountFormSubmit(data: z.infer<typeof accountFormZod>) {

        // Error if user enter new password but old password field is empty
        if (data.newPassword.length > 0 && (data.oldPassword === "" || data.oldPassword === null || data.oldPassword === undefined)) {
            accountForm.setError("oldPassword", {
                type: "manual",
                message: "Old password cannot be empty"
            });
            return;
        }

        router.post('/user/account', {
            ...data
        });
    }

    const tabsTriggerClassName = "justify-start data-[state=active]:bg-secondary data-[state=active]:shadow-none py-2.5";
    const formClassName = "pt-3 pl-5 gap-3 flex flex-col justify-start items-start";
    const onBackButtonClick: MouseEventHandler<HTMLButtonElement> = e => {
        router.visit('/dashboard/customize_page');
    };
    const newPasswordFieldIsDirty = accountForm.getFieldState("newPassword").isDirty;
    return (
        <Card className={"m-6 min-h-[90vh]"}>
            <CardHeader className={"p-4"}>
                <CardTitle className={"text-2xl"}>Settings</CardTitle>
                <CardDescription>Edit your settings</CardDescription>
            </CardHeader>
            <Separator/>
            <CardContent>
                <Tabs defaultValue={"profile"}>
                    <ResizablePanelGroup direction={"horizontal"}>
                        <ResizablePanel defaultSize={17} minSize={15} maxSize={20}>
                            <TabsList
                                className={"w-full min-h-[80vh] mt-3 pr-2.5 gap-1 flex flex-col justify-start items-stretch bg-background"}>
                                <TabsTrigger className={tabsTriggerClassName} value={"profile"}>
                                    Profile
                                </TabsTrigger>
                                <TabsTrigger value={"account"} className={tabsTriggerClassName}>Account</TabsTrigger>
                            </TabsList>
                        </ResizablePanel>
                        <ResizableHandle/>
                        <ResizablePanel defaultSize={85}>
                            <ScrollArea>
                                <TabsContent value={"profile"}>
                                    <CardHeader>
                                        <CardTitle>Profile</CardTitle>
                                        <CardDescription>Edit your personal information</CardDescription>
                                    </CardHeader>
                                    <Separator/>
                                    <Form {...profileForm} >
                                        <form onSubmit={profileForm.handleSubmit(handleProfileFormSubmit)}
                                              className={formClassName}>
                                            <FormField control={profileForm.control} name={"profilePicture"}
                                                       render={({field}) => {
                                                           const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
                                                           return (
                                                               <FormItem>
                                                                   <FormLabel>Profile Picture</FormLabel>
                                                                   <Avatar
                                                                       className={"w-[110px] h-[110px] border-2 shadow-md border-primary "}>
                                                                       <AvatarImage src={field.value}
                                                                                    alt={"profile picture"}
                                                                                    className={"object-cover"}/>
                                                                       <AvatarFallback>
                                                                           X
                                                                       </AvatarFallback>
                                                                   </Avatar>
                                                                   <FormDescription>Your profile
                                                                       picture. Maximum size is 1MB</FormDescription>
                                                                   <FormMessage/>
                                                                   <Dialog open={isDialogOpen}
                                                                           onOpenChange={setIsDialogOpen}>
                                                                       <DialogTrigger asChild>
                                                                           <Button variant={"secondary"}>Change</Button>
                                                                       </DialogTrigger>
                                                                       <DialogContent>
                                                                           <UploadImage
                                                                               disableFromUrl
                                                                               onImageFileSelectionChange={async e => {
                                                                                   const imageFile = e.target.files?.[0];
                                                                                   if (imageFile) {
                                                                                       const fileMIMEType = imageFile.type;
                                                                                       const compressedImageFile = await imageCompression(imageFile, {
                                                                                           maxSizeMB: 1,
                                                                                           maxWidthOrHeight: 800,
                                                                                           useWebWorker: true,
                                                                                       });
                                                                                       const base64Image = await blobToBase64(compressedImageFile);
                                                                                       field.onChange(base64Image);
                                                                                       setIsDialogOpen(false);
                                                                                       setCurrentProfilePictureType(fileMIMEType);
                                                                                   }
                                                                               }} onImageURLSubmission={e => {
                                                                           }}/>
                                                                       </DialogContent>
                                                                   </Dialog>
                                                               </FormItem>
                                                           )
                                                       }}
                                            />
                                            <FormField control={profileForm.control} name={"displayName"}
                                                       render={({field}) => {
                                                           return (
                                                               <FormItem className={"min-w-[200px]"}>
                                                                   <FormLabel>Name</FormLabel>
                                                                   <FormControl>
                                                                       <Input {...field}/>
                                                                   </FormControl>
                                                                   <FormDescription>Your display name. This will also
                                                                       show up on your subscribe page as
                                                                       well.</FormDescription>
                                                                   <FormMessage/>
                                                               </FormItem>
                                                           )
                                                       }}/>
                                            <FormAction onBackButtonClick={onBackButtonClick}/>
                                        </form>
                                    </Form>
                                </TabsContent>
                                <TabsContent value={"account"}>
                                    <CardHeader>
                                        <CardTitle>Account</CardTitle>
                                        <CardDescription>Edit your account's credentials</CardDescription>
                                    </CardHeader>
                                    <Separator/>
                                    <Form {...accountForm}>
                                        <form onSubmit={accountForm.handleSubmit(handleAccountFormSubmit)}
                                              className={formClassName}>
                                            <FormField name={"email"} render={({field}) => {
                                                return (
                                                    <FormItem className={"min-w-[200px]"}>
                                                        <FormLabel>Email</FormLabel>
                                                        <Input  {...field}/>
                                                        <FormDescription>Your account's email. This will be used for
                                                            login</FormDescription>
                                                        <FormMessage/>
                                                    </FormItem>
                                                )
                                            }}/>
                                            <FormField name={"newPassword"} render={({field}) => {
                                                return (
                                                    <FormItem className={"min-w-[200px]"}>
                                                        <FormLabel>New Password</FormLabel>
                                                        <Input  {...field} type={"password"}/>
                                                        <FormDescription>Change your account password</FormDescription>
                                                        <FormMessage/>
                                                    </FormItem>
                                                )
                                            }}/>
                                            <FormField disabled={!newPasswordFieldIsDirty}
                                                       name={"oldPassword"} render={({field, fieldState}) => {
                                                return (
                                                    <FormItem className={"min-w-[200px]"}>
                                                        <FormLabel>Old Password</FormLabel>
                                                        <Input  {...field} type={"password"}/>
                                                        <FormDescription>Enter your old password in order to change your
                                                            password</FormDescription>
                                                        <FormMessage/>
                                                    </FormItem>
                                                )
                                            }}/>

                                            <FormAction onBackButtonClick={onBackButtonClick}/>
                                        </form>
                                    </Form>
                                </TabsContent>
                            </ScrollArea>
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </Tabs>
            </CardContent>
        </Card>
    )
}


