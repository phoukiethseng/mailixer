import React, {useMemo} from "react";
import {NewsletterSendResult} from "@/types/models";
import DashBoardLayout from "@/Layouts/DashBoardLayout";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/Components/Resizable";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/Components/Card";
import {Badge} from "@/Components/Badge";
import {Icons} from "@/Components/Icons";
import {useSelectableList} from "@/lib/hooks/useSelectableList";
import {cn} from "@/lib/utils";

type NewsletterStatusPageProps = {
    newsletters: NewsletterSendResult[]
};

const NewsletterStatus = (props: NewsletterStatusPageProps) => {

    const newsletters = useMemo(() => {
        return props.newsletters.filter(v => v.status !== "DRAFT");
    }, [props.newsletters])

    const {list, select, unselect, getCurrentSelectionKey} = useSelectableList({
        list: newsletters
    });

    const currentNewsletter = list.get(getCurrentSelectionKey() ?? "");
    return (
        <ResizablePanelGroup direction={"horizontal"}>
            <ResizablePanel minSize={23} maxSize={35} defaultSize={28}>
                <div className={"flex flex-col gap-3 justify-stretch pr-4"}>
                    {
                        Array.from(list.values()).map((item) => (
                            <Card key={item.id}
                                  className={cn("transition-colors duration-100 cursor-default hover:bg-muted", {
                                      "border-primary": getCurrentSelectionKey() === item.id
                                  })}
                                  onClick={() => select(item.id)}
                            >
                                <CardHeader>
                                    <CardTitle className={"text-lg"}>
                                        {item.value.subject}
                                    </CardTitle>
                                </CardHeader>
                                {/*<CardContent>*/}
                                {/*    <p>{newsletter.content}</p>*/}
                                {/*</CardContent>*/}
                                <CardFooter>
                                    <div className={"flex flex-row gap-2 justify-between w-full"}>
                                        <Badge variant={"outline"}>{item.value.status}</Badge>
                                        <div className={"flex flex-row justify-between gap-2"}>
                                            <div
                                                className={"flex flex-row gap-1.5 justify-between items-center rounded-lg px-2 py-1 bg-muted"}>

                                                <Icons.UserCheck strokeWidth={1} size={15}

                                                />
                                                <span className={"text-muted-foreground text-sm"}>
                                                    {item.value.sendResults.filter(v => v.isSuccess).length}
                                                </span>
                                            </div>
                                            <div
                                                className={"flex flex-row gap-1.5 justify-between items-center rounded-lg px-2 py-1 bg-muted"}>

                                                <Icons.UserX strokeWidth={1} size={15}
                                                             className={"text-destructive text-sm"}
                                                />
                                                <span className={"text-destructive text-sm"}>
                                                    {item.value.sendResults.filter(v => v.isSuccess).length}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </CardFooter>
                            </Card>
                        ))
                    }
                </div>
            </ResizablePanel>
            <ResizableHandle withHandle/>
            <ResizablePanel>
                <div className={"w-full h-full flex flex-col gap-3 justify-start items-center"}>
                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Successfully Delivered</CardTitle>
                            </CardHeader>
                            <CardContent>{currentNewsletter?.value.sendResults.filter(v => v.isSuccess).length}</CardContent>
                            <CardFooter></CardFooter>
                        </Card>
                    </div>
                </div>
            </ResizablePanel>
        </ResizablePanelGroup>
    )
}

NewsletterStatus.layout = (page: React.ReactNode) => (
    <DashBoardLayout activePage="NewsletterStatus">{page}</DashBoardLayout>
);

export default NewsletterStatus;

