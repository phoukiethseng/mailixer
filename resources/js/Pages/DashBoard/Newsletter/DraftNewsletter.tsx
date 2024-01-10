import DashBoardLayout from "../../../Layouts/DashBoardLayout";
import {InertiaSharedProps} from "../../../config/site";
import React, {useEffect, useState} from "react";
import {useMessageToast} from "../../../lib/hooks/useMessageToast";
import {Newsletter} from "../../../types/models";
import ComposeNewsletterTextEditor from "../../../Components/ComposeNewsletterTextEditor";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "../../../Components/Resizable";
import {Card, CardContent} from "../../../Components/Card";
import {htmlToText} from "../../../lib/utils";
import {Icons} from "../../../Components/Icons";
import {router} from "@inertiajs/react";

export type DraftNewsletterProps = {
    newsletters: Newsletter[];
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
        Newsletter | null
    >(null);
    console.log(currentPreviewNewsletter);
    const isNewsletterSelected = newsletters.length > 0 && currentPreviewNewsletter !== null;

    function handleDeleteDraftNewsletter(newsletter: Newsletter) {
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
            className={"gap-2"}
        >
            <ResizablePanel minSize={30} maxSize={50} defaultSize={35} className={"flex flex-col gap-3"}>
                {
                    draftNewsletters.map((newsletter, index) => {
                        const displayCharLimit = 130;
                        return (
                            <Card key={index} className={"py-3 hover:bg-muted group/draftcard"}
                                  onClick={() => setCurrentPreviewNewsletter(newsletter)}>
                                <CardContent className={"flex flex-row justify-between items-center gap-4 pr-2.5"}>
                                    <div className={"flex flex-col justify-start items-stretch gap-1 w-full"}>
                                        <p className={"font-semibold cursor-default"}>{newsletter.subject}</p>
                                        <p className={"text-sm text-muted-foreground text-wrap cursor-default"}>{htmlToText(newsletter.content).slice(0, displayCharLimit)}{"..."}</p>
                                    </div>
                                    <div
                                        className={"cursor-pointer hidden group-hover/draftcard:flex self-start hover:bg-muted"}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDeleteDraftNewsletter((newsletter));
                                        }}>
                                        <Icons.Cross2Icon size={16} strokeWidth={2}
                                                          className={"text-muted-foreground"}/>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })
                }
            </ResizablePanel>
            <ResizableHandle/>
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
                    }} onSave={() => {
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
    <DashBoardLayout activePage="DraftNewsletter">{page}</DashBoardLayout>
);

export default DraftNewsletter;
