import {zodResolver} from "@hookform/resolvers/zod";
import React from "react";
import {useForm} from "react-hook-form";
import {Card, CardHeader, CardFooter, CardContent} from "./Card";
import {z} from "zod";
import SubscribePrompt from "./SubscribePrompt";
import {Separator} from "./Separator";
import SubscribeDescription from "./SubscribeDescription";
import {Form, FormControl, FormField, FormItem, FormMessage} from "./Form";
import {Input} from "./Input";
import {Button} from "./Button";
import {Alert, AlertDescription, AlertTitle} from "./Alert";
import {Icons} from "./Icons";
import {cn} from "../lib/utils";
import {Avatar, AvatarFallback, AvatarImage} from "./Avatar";
import {User} from "@/resources/js/types/models";

const emailFormSchema = z.object({
    email: z.string().email(),
});

export type EmailForm = z.infer<typeof emailFormSchema>;

type SubscribeCardProps = {
    user: {
        name: string;
        profilePicture: User["profilePicture"]
    };
    subscribePage: {
        showProfilePicture: boolean
        description: string;
    };
    errors?: {
        message?: string;
    };
    onSubscribe: (formData: EmailForm) => void;
} & React.ComponentPropsWithoutRef<"div">;

export default function SubscribeCard(props: SubscribeCardProps) {
    const form = useForm<EmailForm>({
        defaultValues: {
            email: "",
        },
        resolver: zodResolver(emailFormSchema),
    });

    function defaultHandleSubmit(data: EmailForm) {
    }

    return (
        <Card
            className={cn(
                "w-[90vw] sm:w-[70vw] md:w-[40vw] lg:w-[35vw] xl:w-[30vw] min-h-52 xl:max-w-[350px]",
                props.className
            )}
        >
            <CardHeader>
                <SubscribePrompt name={props.user.name}></SubscribePrompt>
                {props.subscribePage.showProfilePicture &&
                    <Avatar className={"w-[7.5rem] h-[7.5rem] self-center border-2 border-primary shadow-lg"}>
                        <AvatarImage src={props.user.profilePicture ?? ""} alt={"Author's profile picture"}/>
                        <AvatarFallback>MX</AvatarFallback>
                    </Avatar>}
            </CardHeader>
            <CardContent>
                <Separator className="mb-5"/>
                <div className="flex flex-col justify-start items-stretch gap-3 ">
                    <SubscribeDescription>
                        {props?.subscribePage?.description}
                    </SubscribeDescription>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(
                                props.onSubscribe ?? defaultHandleSubmit
                            )}
                            className="min-h-24 flex flex-col justify-start items-stretch gap-4 "
                        >
                            <FormField
                                control={form.control}
                                name="email"
                                render={({field}) => (
                                    <FormItem className="">
                                        <FormMessage/>
                                        <FormControl>
                                            <Input
                                                className="text-foreground h-10 w-full text-sm"
                                                {...field}
                                                placeholder="Your Email"
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" size={"lg"}>
                                Subscribe
                            </Button>
                        </form>
                    </Form>
                </div>
            </CardContent>
            {props?.errors?.message && (
                <CardFooter className="flex flex-col">
                    <Separator className="mb-5"/>
                    <Alert variant={"destructive"}>
                        <Icons.XCircle strokeWidth={1.5} size={20}/>
                        <AlertTitle>Something went wrong</AlertTitle>
                        <AlertDescription>
                            {props.errors.message}
                        </AlertDescription>
                    </Alert>
                </CardFooter>
            )}
        </Card>
    );
}
