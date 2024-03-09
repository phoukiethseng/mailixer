import React, {useEffect, useMemo, useState} from "react";
import {NewsletterSendResult} from "@/types/models";
import DashBoardLayout from "@/Layouts/DashBoardLayout";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/Components/Resizable";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/Components/Card";
import {Badge} from "@/Components/Badge";
import {Icons} from "@/Components/Icons";
import {useSelectableList} from "@/lib/hooks/useSelectableList";
import {cn} from "@/lib/utils";
import axios from "axios";
import {ScrollArea} from "@/Components/ScrollArea";
import {HashLoader} from "react-spinners";

type NewsletterStatusPageProps = {
    newsletters: NewsletterSendResult[]
};

const NewsletterStatus = (props: NewsletterStatusPageProps) => {
    const [previewHTML, setPreviewHTML] = useState("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const newsletters = useMemo(() => {
        return props.newsletters.filter(v => v.status !== "DRAFT");
    }, [props.newsletters])

    const {list, select, unselect, getCurrentSelectionKey} = useSelectableList({
        list: newsletters
    });

    const currentNewsletter = list.get(getCurrentSelectionKey() ?? "");

    useEffect(() => {
        if (currentNewsletter) {
            setIsLoading(true);
            axios.get(`/dashboard/previewNewsletter/${currentNewsletter.value.id}`).then((res) => {
                if (res.status === 200) {
                    setPreviewHTML(res.data.html);
                }
            })
                .finally(() => setIsLoading(false));
        }
        return () => {
        };
    }, [currentNewsletter]);

    return (
        <ResizablePanelGroup direction={"horizontal"}>
            <ResizablePanel minSize={23} maxSize={35} defaultSize={25} onClick={(e) => {
                unselect()
            }}>
                <ScrollArea>
                    <div className={"w-full h-full flex flex-col gap-3 justify-stretch pr-4"}>
                        {
                            Array.from(list.values()).map((item) => (
                                <Card key={item.id}
                                      className={cn("transition-colors duration-100 cursor-default hover:bg-muted", {
                                          "border-primary": getCurrentSelectionKey() === item.id
                                      })}
                                      onClick={(e) => {
                                          e.stopPropagation();
                                          select(item.id);
                                      }}
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

                                                    <Icons.UserCheck strokeWidth={2} size={17}
                                                                     className={"text-green-600 "}
                                                    />
                                                    <span className={"text-primary text-sm font-semibold"}>
                                                    {item.value.sendResults.filter(v => v.isSuccess).length}
                                                </span>
                                                </div>
                                                <div
                                                    className={"flex flex-row gap-1.5 justify-between items-center rounded-lg px-2 py-1 border border-red-200"}>

                                                    <Icons.UserX strokeWidth={2} size={17}
                                                                 className={"text-destructive"}
                                                    />
                                                    <span className={"text-destructive text-sm font-semibold"}>
                                                    {item.value.sendResults.filter(v => !(v.isSuccess)).length}
                                                </span>
                                                </div>
                                            </div>
                                        </div>
                                    </CardFooter>
                                </Card>
                            ))
                        }
                    </div>
                </ScrollArea>
            </ResizablePanel>
            <ResizableHandle withHandle/>
            <ResizablePanel>
                {
                    isLoading &&
                    <div
                        className={"w-full h-full flex justify-center items-center"}>
                        {/*<Icons.Loader2 strokeWidth={1.5} size={50} className={"animate-spin text-muted-foreground"}/>*/}
                        <HashLoader size={80} color={"#16a34a"}/>
                    </div>
                }
                {
                    !isLoading && currentNewsletter &&
                    <div className={"w-full flex flex-col justify-start items-center"}>
                        <div
                            className={"flex flex-row gap-4 justify-center items-center w-full h-full mb-5"}>
                            <Card className={"w-36 h-32"}>
                                <CardHeader className={"flex flex-row justify-between gap-4 items-center"}>
                                    <CardTitle>Delivered</CardTitle>
                                    <Icons.UserCheck strokeWidth={1.5} size={17}/>
                                </CardHeader>
                                <CardContent>
                                    <p className={"text-5xl font-bold text-center"}>{
                                        currentNewsletter
                                            .value
                                            .sendResults
                                            .filter(result => result.isSuccess).length
                                    }</p>
                                </CardContent>
                            </Card>
                            <Card className={"w-36 h-32 text-destructive"}>
                                <CardHeader className={"flex flex-row justify-between gap-4 items-center"}>
                                    <CardTitle>Failed</CardTitle>
                                    <Icons.UserCheck strokeWidth={1.5} size={17}/>
                                </CardHeader>
                                <CardContent>
                                    <p className={"text-5xl font-bold text-center"}>{
                                        currentNewsletter
                                            .value
                                            .sendResults
                                            .filter(result => !(result.isSuccess)).length
                                    }</p>
                                </CardContent>
                            </Card>
                        </div>
                        <iframe srcDoc={previewHTML} height={720} width={1280}
                                className={"mt-3 max-w-[900px]"}
                                sandbox={"allow-scripts allow-forms"}/>
                    </div>
                }
                {
                    !currentNewsletter && !isLoading &&
                    <div
                        className={"w-full h-full flex justify-center items-center"}>
                        <span className={"text-muted-foreground"}>No newsletter selected</span>
                    </div>
                }
            </ResizablePanel>
        </ResizablePanelGroup>
    )
}

NewsletterStatus.layout = (page: React.ReactNode) => (
    <DashBoardLayout activePage="NewsletterStatus">{page}</DashBoardLayout>
);

export default NewsletterStatus;

