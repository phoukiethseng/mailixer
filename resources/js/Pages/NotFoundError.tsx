import React from "react";
import {Button} from "@/Components/Button";
import NoMessage from "@/SVGs/NoMessage";
import {Separator} from "@/Components/Separator";

type NotFoundErrorPageProps = {
    error: {
        message?: string,
        statusCode: number;
    }
}

export default function NotFoundErrorPage(props: NotFoundErrorPageProps) {
    return (
        <main className={"w-full min-h-screen flex flex-row justify-center items-center gap-8"}>
            <div className={"flex flex-col justify-start items-start"}>
                <div className={"flex flex-row justify-start items-center gap-4"}>
                    <span
                        className={"text-7xl font-bold text-primary self-start border-b-[5px] border-primary"}>{props.error.statusCode} </span>
                    {/*<span className={"text-7xl"}>🤨</span>*/}
                    <span className={"w-20 h-20"}>
                        <img className={"object-contain"} src={"/raised_eyebrow.gif"} alt={"raised-eyebrow-emoji"}/>
                    </span>
                </div>
                <h1 className={"text-4xl font-bold font-[futura-pt] mt-4 text-foreground"}>Uh Oh, Page does not exist</h1>
                <p className={" text-muted-foreground mt-2"}>{props.error?.message}</p>
                <a href={"/"} className={"mt-5"}>
                    <Button size={"lg"} className={"font-bold text-lg rounded-3xl"}>Home</Button>
                </a>
            </div>
            <Separator orientation={"vertical"} className={"h-40"}/>
            <NoMessage size={{
                width: 400,
                height:400
            }}/>
        </main>
    )
}
