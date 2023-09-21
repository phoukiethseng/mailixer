import React, { useState } from "react";
import { Separator } from "../Components/Separator";
import LogoText from "../Components/LogoText";

export default function DashBoardLayout({
    children,
}: {
    children: React.ReactNode;
    layoutProps?: string;
}) {
    return (
        <div className="flex flex-row items-stretch min-h-screen ">
            <aside className="w-1/6 border-r border-border pt-4">
                <LogoText className="text-3xl" />
                <Separator className="my-4" />
            </aside>
            <div>{children}</div>
        </div>
    );
}
