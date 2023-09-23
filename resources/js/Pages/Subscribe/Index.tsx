import { router, usePage } from "@inertiajs/react";
import React, { Suspense, useState } from "react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "../../Components/Form";
import { useForm } from "react-hook-form";
import z from "zod";
import { Input } from "../../Components/Input";
import { Button } from "../../Components/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, AlertDescription, AlertTitle } from "../../Components/Alert";
import { Icons } from "../../Components/Icons";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "../../Components/Card";
import SubscribePrompt from "../../Components/SubscribePrompt";
import SubscribeDescription from "../../Components/SubscribeDescription";
import { Separator } from "../../Components/Separator";

type SubscribePageProps = {
    user: {
        id: string;
        name: string;
    };
    subscribe: {
        description: string;
    };
    errors: {
        message?: string;
    };
};

const emailFormSchema = z.object({
    email: z.string().email(),
});

type EmailForm = z.infer<typeof emailFormSchema>;

export default function SubscribePage() {
    const { props } = usePage<SubscribePageProps>();
    const { user, errors } = props;

    const form = useForm<EmailForm>({
        defaultValues: {
            email: "",
        },
        resolver: zodResolver(emailFormSchema),
    });

    async function handleFormSubmit(data: EmailForm) {
        router.post("/subscribe", {
            user_id: user.id,
            email: data.email,
        });
    }

    return (
        <div className="min-h-screen w-full flex flex-col justify-center items-center gap-6">
            <Card className="w-[90vw] sm:w-[70vw] md:w-[60vw] lg:w-[40vw] xl:w-[30vw] 2xl:w-[20vw] min-h-52">
                <CardHeader>
                    <SubscribePrompt name={user.name}></SubscribePrompt>
                </CardHeader>
                <CardContent>
                    <Separator className="mb-5" />
                    <div className="flex flex-col justify-start items-stretch gap-3 ">
                        <SubscribeDescription>
                            {props?.subscribe?.description}
                        </SubscribeDescription>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(handleFormSubmit)}
                                className="min-h-24 flex flex-col justify-start items-stretch gap-4 "
                            >
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem className="">
                                            <FormMessage />
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
                {errors?.message && (
                    <CardFooter className="flex flex-col">
                        <Separator className="mb-5" />
                        <Alert variant={"destructive"}>
                            <Icons.XCircle strokeWidth={1.5} size={20} />
                            <AlertTitle>Something went wrong</AlertTitle>
                            <AlertDescription>
                                {errors.message}
                            </AlertDescription>
                        </Alert>
                    </CardFooter>
                )}
            </Card>
        </div>
    );
}
