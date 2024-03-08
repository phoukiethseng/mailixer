import React from "react";
import {cn} from "@/lib/utils";

export default function LogoText({
                                     className,
                                 }: React.HTMLAttributes<HTMLHeadingElement>) {
    return (
        <h1
            className={cn(
                "font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-[#00B88F] to-[#0092D2]",
                "text-5xl",
                className
            )}
        >
            Mailixer
        </h1>
    );
}
