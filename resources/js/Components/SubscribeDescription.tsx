import React from "react";
import {cn} from "@/lib/utils";

type SubscribeDescriptionProps = {} & React.HTMLAttributes<HTMLHeadingElement>;

export default function SubscribeDescription({
                                                 children,
                                                 className,
                                             }: SubscribeDescriptionProps) {
    return (
        <h2
            className={cn(
                "text-base font-light tracking-tight text-center leading-tight",
                className
            )}
        >
            {children}
        </h2>
    );
}
