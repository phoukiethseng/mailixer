import React from "react";
import { cn } from "../lib/utils";
import { Link } from "@inertiajs/react";

type DashBoardNavigationItemProps = {
    name: string;
    url: string;
    isActive?: boolean;
    icon: React.FunctionComponent;
} & React.ComponentPropsWithoutRef<"a">;

export default function DashBoardNavigationItem({
    name,
    url,
    isActive = false,
    icon,
    className,
}: DashBoardNavigationItemProps) {
    const Icon = icon;
    return (
        <Link
            disabled
            className={cn(
                "w-full flex flex-row justify-start gap-3 text-left font-semibold pl-5 py-3 text-foreground rounded-md hover:bg-accent hover:text-accent-foreground hover:underline",
                "items-center sm:items-start",
                isActive && "text-primary bg-accent hover:text-primary",
                className
            )}
            href={url}
        >
            <span className="hidden sm:block">
                <Icon />
            </span>
            <span>{name}</span>
        </Link>
    );
}
