import { ColumnDef } from "@tanstack/react-table";
import { DraftNewsletterProps } from "../../Pages/DashBoard/Newsletter/DraftNewsletter";
import { Button } from "../Button";
import { Icons } from "../Icons";
import React from "react";
import { router } from "@inertiajs/react";
import { Checkbox } from "../Checkbox";

type Newsletter = DraftNewsletterProps["newsletters"][number];
export const columns: ColumnDef<Newsletter>[] = [
    {
        id: "select",
        cell: ({ row }) => {
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
        cell: ({ row }) => {
            return (
                <Button
                    variant={"outline"}
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
                    <Icons.Trash size={16} />
                </Button>
            );
        },
    },
];
