import React from "react";
import { Separator } from "../Components/Separator";
import LogoText from "../Components/LogoText";

export default function HomePage() {
    return (
        <>
            <aside className="w-1/6 min-h-screen border-r border-border pt-4">
                <LogoText className="text-3xl" />
                <Separator className="my-4" />
            </aside>
            <div></div>
        </>
    );
}
