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
import { z } from "zod";
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
    getNewsletterContentTypeId,
    newsletterContentType,
} from "../../../config/site";
import { Markdown } from "../../../Components/Markdown";
import { router } from "@inertiajs/react";
import { useMessageToast } from "../../../lib/hooks/useMessageToast";

const composeNewsletterSchema = z.object({
    subject: z.string().nonempty().default("Mailixer Newsletter"),
    content_type: z.enum(newsletterContentType),
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
            content_type: "Plaintext",
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
        router.post("/dashboard/sendNewsletter", {
            subject: data.subject,
            content_type_id: getNewsletterContentTypeId(data.content_type),
            content: data.content,
        });
    }
    function handleSaveNewsletter(data: ComposeNewsletter) {
        router.post("/dashboard/saveNewsletter", {
            subject: data.subject,
            content_type_id: getNewsletterContentTypeId(data.content_type),
            content: data.content,
        });
    }
    return (
        <div className="h-full w-full grid grid-cols-1 xl:grid-cols-5 gap-3">
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
                                render={({ field }) => (
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
                                                <SelectItem value="Plaintext">
                                                    Plain Text
                                                </SelectItem>
                                                <SelectItem value="HTML">
                                                    HTML
                                                </SelectItem>
                                                <SelectItem value="Markdown">
                                                    Markdown
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
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
                            <Button type="submit">Send</Button>
                            <Button
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
                        </form>
                    </Form>
                </CardContent>
            </Card>
            <Card className="h-full col-span-3">
                <CardHeader>
                    <CardTitle>Preview</CardTitle>
                    <CardDescription>
                        Preview rendered content of your email
                    </CardDescription>
                </CardHeader>
                <Separator />
                <CardContent className="flex flex-col gap-4 pt-3">
                    <Card>
                        <CardContent className="py-2 text-sm">
                            <p>
                                <span className="font-semibold">From: </span>
                                {`${auth.user.name} <no-reply@mailixer.com>`}
                            </p>
                            <p>
                                <span className="font-semibold">Subject: </span>
                                {emailSubject}
                            </p>
                        </CardContent>
                    </Card>
                    <Separator />
                    <div className="p-2">
                        {emailContentType === "HTML" && (
                            <iframe srcDoc={emailContent} />
                        )}
                        {emailContentType === "Markdown" && (
                            <Markdown className="prose dark:prose-invert">
                                {emailContent}
                            </Markdown>
                        )}
                        {emailContentType === "Plaintext" && (
                            <p>{emailContent}</p>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

ComposeNewsletterPage.layout = (page: React.ReactNode) => (
    <DashBoardLayout activePage="ComposeNewsletter">{page}</DashBoardLayout>
);

export default ComposeNewsletterPage;
