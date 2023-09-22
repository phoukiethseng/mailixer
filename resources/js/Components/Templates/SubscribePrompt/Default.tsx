import React from "react";
import { SubscribePromptProps } from "resources/js/lib/SubscribePrompt";
import { cn } from "../../../lib/utils";

export default function DefaultSubscribePrompt({
    name,
    className,
}: SubscribePromptProps) {
    return (
        <h2
            className={cn(
                "text-4xl font-bold text-foreground text-center",
                className
            )}
        >
            Subscribe to {name} email newsletter
        </h2>
    );
}
