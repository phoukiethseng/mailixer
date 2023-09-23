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
import {
    SubscribePromptProps,
    getSubscribePromptComponent,
} from "../../lib/SubscribePrompt";
import { Button } from "../../Components/Button";
import LogoText from "../../Components/LogoText";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, AlertDescription, AlertTitle } from "../../Components/Alert";

type SubscribePageProps = {
    user: {
        id: string;
        name: string;
    };
    errors: {
        message?: string;
    };
    subscribePromptTemplate: string;
};

const emailFormSchema = z.object({
    email: z.string().email(),
});

type EmailForm = z.infer<typeof emailFormSchema>;

export default function SubscribePage() {
    const { props } = usePage<SubscribePageProps>();
    const { user, subscribePromptTemplate, errors } = props;

    // Get SubscribePrompt Component base on user's preferred template name
    const SubscribePrompt: React.FunctionComponent<SubscribePromptProps> =
        getSubscribePromptComponent(subscribePromptTemplate);

    const form = useForm<EmailForm>({
        defaultValues: {
            email: "",
        },
        resolver: zodResolver(emailFormSchema),
    });

    async function handleFormSubmit(data: EmailForm) {
        router.post("/api/subscribe", {
            user_id: "1",
            email: data.email,
        });
    }

    return (
        <div className="min-h-screen w-full flex flex-col justify-center items-center gap-6">
            <LogoText className="text-6xl" />
            <Suspense fallback={<p>Loading...</p>}>
                <SubscribePrompt
                    name={user.name}
                    className="max-w-[600px] text-3xl"
                ></SubscribePrompt>
            </Suspense>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleFormSubmit)}
                    className="flex flex-col justify-start items-stretch gap-3"
                >
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="w-[90vw] sm:w-[70vw] md:w-[60vw] lg:w-[40vw] xl:w-[30vw] 2xl:w-[20vw]">
                                <FormControl>
                                    <Input
                                        className="text-foreground h-10 w-full text-sm"
                                        {...field}
                                        placeholder="Your Email"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" size={"lg"}>
                        Subscribe
                    </Button>
                </form>
            </Form>
            {errors?.message && (
                <Alert variant={"destructive"}>
                    <AlertTitle>Something went wrong</AlertTitle>
                    <AlertDescription>{errors?.message}</AlertDescription>
                </Alert>
            )}
        </div>
    );
}
