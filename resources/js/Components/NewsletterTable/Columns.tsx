import {ColumnDef} from "@tanstack/react-table";
import {DraftNewsletterProps} from "@/Pages/DashBoard/Newsletter/DraftNewsletter";
import {Button} from "@/Components/Button";
import {Icons} from "@/Components/Icons";
import React from "react";
import {router} from "@inertiajs/react";
import {Checkbox} from "@/Components/Checkbox";

type Newsletter = DraftNewsletterProps["newsletters"][number];
export const columns: ColumnDef<Newsletter>[] = [
    {
        id: "select",
        cell: ({row}) => {
            return (
                <Checkbox checked={row.getIsSelected()} onCheckedChange={() => row.toggleSelected()}/>
            )
        }
    },
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "subject",
        header: "Subject",
    },
    {
        accessorKey: "contentType",
        header: "Content Type",
    },
    {
        id: "action",
        cell: ({row}) => {
            return (
                <div className={"flex flex-row gap-2 items-center"}>
                    <Button
                        variant={"secondary"}
                        size={"icon"}
                        className="text-muted-foreground hover:text-destructive hover:border-destructive"
                        onClick={(e) => {
                            e.stopPropagation();
                            router.delete("/dashboard/deleteNewsletter", {
                                data: {
                                    id: row.getValue("id"),
                                },
                            });
                        }}
                    >
                        <Icons.Trash size={12}/>
                    </Button>
                    <Button
                        variant={"secondary"}
                        size={"icon"}
                        className="text-muted-foreground hover:text-destructive hover:border-destructive"
                        onClick={(e) => {
                            e.stopPropagation();
                            router.put("/dashboard/sendDraftNewsletter", {
                                id: row.getValue("id"),
                            });
                        }}
                    >
                        <Icons.Send size={12}/>
                    </Button>
                </div>
            );
        },
    },
];
