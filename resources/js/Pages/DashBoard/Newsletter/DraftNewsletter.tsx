import DashBoardLayout from "@/Layouts/DashBoardLayout";
import React, {useEffect, useState} from "react";
import {useMessageToast} from "@/lib/hooks/useMessageToast";
import {NewsletterWithStatus} from "@/types/DTO";
import ComposeNewsletterTextEditor from "@/Components/ComposeNewsletterTextEditor";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/Components/Resizable";
import {Card, CardContent} from "@/Components/Card";
import {cn, htmlToText} from "@/lib/utils";
import {Icons} from "@/Components/Icons";
import {router} from "@inertiajs/react";
import {InertiaSharedProps} from "@/types/inertia";
import NewDashBoardLayout from "@/Layouts/NewDashBoardLayout";

export type DraftNewsletterProps = {
    newsletters: NewsletterWithStatus[];
} & InertiaSharedProps;

const DraftNewsletter = ({
                             newsletters,
                             message,
                             errors,
                         }: DraftNewsletterProps) => {
    useMessageToast({message, errors});
    const draftNewsletters = newsletters.filter(
        (newsletter) => newsletter.status === "DRAFT"
    );
    const [currentPreviewNewsletter, setCurrentPreviewNewsletter] = useState<
        NewsletterWithStatus | null
    >(null);
    const isNewsletterSelected = newsletters.length > 0 && currentPreviewNewsletter !== null;

    function handleDeleteDraftNewsletter(newsletter: NewsletterWithStatus) {
        const id = newsletter.id;
        router.delete("/dashboard/deleteNewsletter", {
            data: {
                id
            }
        });
    }

    useEffect(() => {
        if (currentPreviewNewsletter !== null) setCurrentPreviewNewsletter(null);
    }, [newsletters]);

    return (
        <ResizablePanelGroup
            direction={"horizontal"}
            className={"gap-2 max-h-[100vh]"}
        >
            <ResizablePanel minSize={30} maxSize={50} defaultSize={35} className={"flex flex-col gap-3"}>
                {
                    draftNewsletters.map((newsletter, index) => {
                        const displayCharLimit = 130;
                        return (
                            <Card key={index}
                                  className={cn("py-3 hover:bg-muted group/draftcard", (currentPreviewNewsletter ? currentPreviewNewsletter.id === newsletter.id : false) && "border-primary")}
                                  onClick={() => setCurrentPreviewNewsletter(newsletter)}>
                                <CardContent className={"flex flex-col justify-center items-stretch gap-1 pr-2.5"}>
                                    <div className={"flex flex-row justify-between items-center gap-2"}>
                                        <p className={"font-semibold cursor-default truncate"}>{newsletter.subject}</p>
                                        <div
                                            className={"cursor-pointer hidden group-hover/draftcard:flex self-start hover:bg-muted"}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteDraftNewsletter((newsletter));
                                            }}>
                                            <Icons.Cross2Icon size={16} strokeWidth={2}
                                                              className={"text-muted-foreground"}/>
                                        </div>
                                    </div>
                                    <p className={"text-sm text-muted-foreground text-wrap cursor-default"}>{htmlToText(newsletter.content).slice(0, displayCharLimit)}{"..."}</p>
                                </CardContent>
                            </Card>
                        );
                    })
                }
            </ResizablePanel>
            <ResizableHandle withHandle={true}/>
            <ResizablePanel>
                {isNewsletterSelected && (
                    // <NewsletterPreview
                    //     className=" col-span-2"
                    //     auth={auth}
                    //     subject={currentPreviewNewsletter.subject}
                    //     contentType={currentPreviewNewsletter.contentType}
                    //     content={currentPreviewNewsletter.content}
                    // />
                    <ComposeNewsletterTextEditor newsletter={currentPreviewNewsletter} onSend={() => {
                        router.put('/dashboard/sendDraftNewsletter', {
                            id: currentPreviewNewsletter.id
                        })
                    }} onSave={(data) => {
                        console.log(" updateDraftNewsletter", data);
                        router.put('/dashboard/updateNewsletter', {
                            id: currentPreviewNewsletter.id,
                            subject: data.subject,
                            content: data.content,
                            contentType: data.contentType
                        })
                    }}/>
                )}
                {
                    !isNewsletterSelected &&
                    <div className={"w-full h-full flex justify-center items-center text-muted-foreground"}>No draft
                        newsletter selected</div>
                }
            </ResizablePanel>
        </ResizablePanelGroup>
    );
};

DraftNewsletter.layout = (page: React.ReactNode) => (
    <NewDashBoardLayout activeSubPageName="DraftNewsletter">{page}</NewDashBoardLayout>
);

export default DraftNewsletter;
