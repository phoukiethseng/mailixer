import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "./Card";
import { Separator } from "./Separator";
import { InertiaSharedProps, NewsletterContentType } from "../config/site";
import Markdown from "react-markdown";
import { cn } from "../lib/utils";

type NewsletterPreviewProps = {
    subject: string;
    contentType: NewsletterContentType;
    content: string;
} & Pick<InertiaSharedProps, "auth"> &
    React.ComponentPropsWithoutRef<"div">;

export default function NewsletterPreview({
    auth,
    subject,
    contentType,
    content,
    className,
}: NewsletterPreviewProps) {
    return (
        <Card className={cn("h-full ", className)}>
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
                            {subject}
                        </p>
                    </CardContent>
                </Card>
                <Separator />
                <div className="p-2">
                    {contentType === "HTML" && <iframe srcDoc={content} />}
                    {contentType === "MARKDOWN" && (
                        <Markdown className="prose">{content}</Markdown>
                    )}
                    {contentType === "PLAINTEXT" && <p>{content}</p>}
                </div>
            </CardContent>
        </Card>
    );
}