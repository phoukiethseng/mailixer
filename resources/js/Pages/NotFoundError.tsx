import React from "react";
import {Button} from "@/Components/Button";

type NotFoundErrorPageProps = {
    error: {
        message?: string,
        statusCode: number;
    }
}

export default function NotFoundErrorPage(props: NotFoundErrorPageProps) {
    return (
        <main className={"w-full min-h-screen flex flex-col justify-center items-center"}>
            <div className={"flex flex-col justify-start items-center"}>
                <div className={"flex flex-row justify-start items-center gap-4"}>
                    <span
                        className={"text-7xl font-bold text-primary self-start border-b-[5px] border-primary"}>{props.error.statusCode} </span>
                    <span className={"text-7xl"}>🤨</span>
                </div>
                <h1 className={"text-4xl font-bold font-[futura-pt] mt-7 text-foreground"}>Uh Oh, Page does not exist</h1>
                <p className={" text-muted-foreground mt-2"}>{props.error?.message}</p>
                <a href={"/"} className={"mt-5"}>
                    <Button size={"lg"} className={"font-bold text-lg rounded-3xl"}>Home</Button>
                </a>
            </div>
        </main>
    )
}
