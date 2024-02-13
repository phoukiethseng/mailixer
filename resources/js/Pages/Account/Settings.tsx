import React from "react";
import {InertiaSharedProps} from "../../config/site";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "../../Components/Card";
import {Separator} from "../../Components/Separator";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "../../Components/Resizable";
import {ScrollArea} from "../../Components/ScrollArea";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "../../Components/Tabs";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "../../Components/Form";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod"
import {z} from "zod";
import {Input} from "../../Components/Input";
import {Button} from "../../Components/Button";

type SettingsPageProps = {
    account: {
        displayName: string;
        email: string;
    }
} & InertiaSharedProps;

const profileFormZod = z.object({
    displayName: z.string(),
    email: z.string().email(),
})

export default function SettingsPage(props: SettingsPageProps) {
    const profileForm = useForm<z.infer<typeof profileFormZod>>({
        resolver: zodResolver(profileFormZod),
        defaultValues: {
            displayName: props.account.displayName,
            email: props.account.email,
        }
    });

    function handleProfileFormSubmit(data: z.infer<typeof profileFormZod>) {
        // TODO: Create controller action for this
        window.alert(JSON.stringify(data));
    }

    const tabsTriggerClassName = "justify-start data-[state=active]:bg-secondary data-[state=active]:shadow-none py-2.5";
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
                                <TabsTrigger value={"example"} className={tabsTriggerClassName}>Example</TabsTrigger>
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
                                              className={"pt-3 pl-5 gap-3 flex flex-col justify-start items-start"}>
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
                                            <FormField control={profileForm.control} name={"email"}
                                                       render={({field}) => {
                                                           return (
                                                               <FormItem className={"min-w-[230px]"}>
                                                                   <FormLabel>Email</FormLabel>
                                                                   <Input {...field} />
                                                                   <FormDescription>Your account email.</FormDescription>
                                                                   <FormMessage/>
                                                               </FormItem>
                                                           )
                                                       }}>

                                            </FormField>
                                            <Button type={"submit"}>Save</Button>
                                        </form>
                                    </Form>
                                </TabsContent>
                                <TabsContent value={"example"}>Example</TabsContent>
                            </ScrollArea>
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </Tabs>
            </CardContent>
        </Card>
    )
}


