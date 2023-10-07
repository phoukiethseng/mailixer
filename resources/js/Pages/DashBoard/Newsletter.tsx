import React from "react";
import DashBoardLayout from "../../Layouts/DashBoardLayout";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../../Components/Card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../../Components/Form";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../Components/Input";
import { Textarea } from "../../Components/TextArea";
import { Button } from "../../Components/Button";
import { Separator } from "../../Components/Separator";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../Components/Select";

const composeNewsletterSchema = z.object({
    subject: z.string().nonempty().default("Mailixer Newsletter"),
    content_type: z.enum(["1", "2"]).transform((value) => parseInt(value)),
    content: z.string(),
});

type ComposeNewsletter = z.infer<typeof composeNewsletterSchema>;

const NewsletterPage = () => {
    const form = useForm<ComposeNewsletter>({
        resolver: zodResolver(composeNewsletterSchema),
        defaultValues: {
            subject: "Mailixer Newsletter",
            content_type: 1,
            content: "",
        },
    });

    const emailContent = useWatch({
        control: form.control,
        name: "content",
    });

    const contentType = useWatch({
        control: form.control,
        name: "content_type",
    });

    function handleComposeNewsletterSubmit(data: ComposeNewsletter) {}
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
                                            value={`${field.value}`} // Had to transform `number` type value to numberic string (-_-)
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Content Type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="1">
                                                    HTML
                                                </SelectItem>
                                                <SelectItem value="2">
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
                <CardContent className="pt-3">
                    <div className="w-full h-full">
                        {emailContent}
                        <br />
                        {contentType}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

NewsletterPage.layout = (page: React.ReactNode) => (
    <DashBoardLayout activePage="Newsletter">{page}</DashBoardLayout>
);

export default NewsletterPage;
