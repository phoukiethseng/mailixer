import React, { useEffect } from "react";
import DashBoardLayout from "../../../Layouts/DashBoardLayout";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../../../Components/Card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../../../Components/Form";
import { useForm, useWatch } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../../Components/Input";
import { Textarea } from "../../../Components/TextArea";
import { Button } from "../../../Components/Button";
import { Separator } from "../../../Components/Separator";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../../Components/Select";

import {
    InertiaSharedProps,
    getContentTypeNameById,
    newsletterContentType,
} from "../../../config/site";
import { router } from "@inertiajs/react";
import { useMessageToast } from "../../../lib/hooks/useMessageToast";
import NewsletterPreview from "../../../Components/NewsletterPreview";

const composeNewsletterSchema = z.object({
    subject: z.string().nonempty().default("Mailixer Newsletter"),
    content_type: z.string().nonempty(),
    content: z.string(),
});

type ComposeNewsletter = z.infer<typeof composeNewsletterSchema>;
type NewsletterPageProps = {} & InertiaSharedProps;

const ComposeNewsletterPage = ({ auth, ...props }: NewsletterPageProps) => {
    const toast = useMessageToast(props);
    const form = useForm<ComposeNewsletter>({
        resolver: zodResolver(composeNewsletterSchema),
        defaultValues: {
            subject: "Mailixer Newsletter",
            content_type: "HTML",
            content: "",
        },
    });

    const emailContent = useWatch({
        control: form.control,
        name: "content",
    });

    const emailContentType = useWatch({
        control: form.control,
        name: "content_type",
    });

    const emailSubject = useWatch({
        control: form.control,
        name: "subject",
    });

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
    function handleSaveNewsletter(data: ComposeNewsletter) {
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
        <div className="h-full w-full grid grid-cols-1 xl:grid-cols-5 gap-3 items-start">
            <Card className="col-span-2">
                <CardHeader>
                    <CardTitle>Compose Newsletter</CardTitle>
                    <CardDescription>Create new newsletter</CardDescription>
                </CardHeader>
                <Separator />
                <CardContent className="pt-3">
                    <Form {...form}>
                        <form
                            className="flex flex-col gap-4"
                            onSubmit={form.handleSubmit(
                                handleComposeNewsletterSubmit
                            )}
                        >
                            <FormField
                                name="subject"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-semibold">
                                            Subject
                                        </FormLabel>
                                        <Input
                                            {...field}
                                            placeholder="Email Subject"
                                        />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="content_type"
                                control={form.control}
                                render={({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormLabel>Content Type</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                value={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Content Type" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem
                                                        value={getContentTypeNameById(
                                                            newsletterContentType.PLAINTEXT
                                                        )}
                                                    >
                                                        Plain Text
                                                    </SelectItem>
                                                    <SelectItem
                                                        value={getContentTypeNameById(
                                                            newsletterContentType.HTML
                                                        )}
                                                    >
                                                        HTML
                                                    </SelectItem>
                                                    <SelectItem
                                                        value={getContentTypeNameById(
                                                            newsletterContentType.MARKDOWN
                                                        )}
                                                    >
                                                        Markdown
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    );
                                }}
                            />

                            <FormField
                                name="content"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-semibold">
                                            Content
                                        </FormLabel>
                                        <Textarea
                                            {...field}
                                            className="min-h-[270px]"
                                            placeholder="Your email newsletter content"
                                        />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="grid grid-cols-2 justify-around items-stretch gap-2 w-full h-full">
                                <Button type="submit">Send</Button>
                                <Button
                                    type="button"
                                    variant={"outline"}
                                    onClick={() =>
                                        handleSaveNewsletter({
                                            content: emailContent,
                                            content_type: emailContentType,
                                            subject: emailSubject,
                                        })
                                    }
                                >
                                    Save as draft
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
            <NewsletterPreview
                className="col-span-3"
                auth={auth}
                subject={emailSubject}
                contentType={emailContentType}
                content={emailContent}
            />
        </div>
    );
};

ComposeNewsletterPage.layout = (page: React.ReactNode) => (
    <DashBoardLayout activePage="ComposeNewsletter">{page}</DashBoardLayout>
);

export default ComposeNewsletterPage;
