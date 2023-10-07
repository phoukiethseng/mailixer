import React from "react";

type DashBoardSubPageHeaderProps = {
    title: string;
    description?: string;
};

export default function DashBoardSubPageHeader({
    title,
    description,
}: DashBoardSubPageHeaderProps) {
    return (
        <div className="flex flex-col justify-start items-stretch text-left w-full">
            <h2 className="text-3xl text-foreground font-bold tracking-tight">
                {title}
            </h2>
            {description && (
                <p className="text-md text-muted-foreground">{description}</p>
            )}
        </div>
    );
}
