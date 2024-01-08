import NewsletterPreview from "../../../Components/NewsletterPreview";
import DashBoardLayout from "../../../Layouts/DashBoardLayout";
import { InertiaSharedProps } from "../../../config/site";
import React, { useEffect, useState } from "react";
import { DataTable } from "../../../Components/DataTable";
import { columns } from "../../../Components/NewsletterTable/Columns";
import { cn } from "../../../lib/utils";
import { useMessageToast } from "../../../lib/hooks/useMessageToast";
import { Newsletter } from "../../../types/models";

export type DraftNewsletterProps = {
    newsletters: Newsletter[];
} & InertiaSharedProps;

const DraftNewsletter = ({
    auth,
    newsletters,
    message,
    errors,
}: DraftNewsletterProps) => {
    /* Start of Tanstack Table stuff */
    /* We manage Data Table `rowSelection` state
    so we can search currently selected row and display its newsletter content */
    const [rowSelection, setRowSelection] = useState({});
    useEffect(() => {
        /* This will only run once cause we disable multi-row selection
            so object should only contain one property */
        const rowSelectionKeys = Object.keys(rowSelection);
        if (rowSelectionKeys.length > 0) {
            rowSelectionKeys.forEach((selectedId) => {
                const newsletter = newsletters.find(
                    (e) => e.id === parseInt(selectedId)
                );
                if (newsletter) setCurrentPreviewNewsletter(newsletter);
            });
        } else {
            setCurrentPreviewNewsletter(null);
        }
    }, [rowSelection]);
    /* End of Tanstack Table stuff */

    useMessageToast({ message, errors });
    const [currentPreviewNewsletter, setCurrentPreviewNewsletter] = useState<
        DraftNewsletterProps["newsletters"][number] | null
    >(null);
    console.log(currentPreviewNewsletter);

    const draftNewsletters = newsletters.filter(
        (newsletter) => newsletter.status === "DRAFT"
    );
    return (
        <div
            className={cn(
                "grid grid-cols-1 xl:grid-cols-3 grid-rows-2 xl:grid-rows-1 gap-2 items-start"
            )}
        >
            <DataTable
                className={cn(
                    "cursor-pointer",
                    (newsletters.length < 1 ||
                        currentPreviewNewsletter === null) &&
                        "col-span-3"
                )}
                data={draftNewsletters}
                columns={columns}
                tableOptions={{
                    enableRowSelection: true,
                    enableMultiRowSelection: false,
                    getRowId: (row) => `${row.id}` /* Set row's id to data's id
                                                     so we can use that to search
                                                     the corresponding newsletter via its id */,
                    onRowSelectionChange: setRowSelection,
                    state: {
                        rowSelection,
                    },
                }}
            />
            {newsletters.length > 0 && currentPreviewNewsletter !== null && (
                <NewsletterPreview
                    className=" col-span-2"
                    auth={auth}
                    subject={currentPreviewNewsletter.subject}
                    contentType={currentPreviewNewsletter.contentType}
                    content={currentPreviewNewsletter.content}
                />
            )}
        </div>
    );
};

DraftNewsletter.layout = (page: React.ReactNode) => (
    <DashBoardLayout activePage="DraftNewsletter">{page}</DashBoardLayout>
);

export default DraftNewsletter;
