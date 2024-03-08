import {ColumnDef} from "@tanstack/react-table";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,} from "../DropDownMenu";
import {Button} from "@/Components/Button";
import {Icons} from "@/Components/Icons";
import {router} from "@inertiajs/react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "../AlertDialog";
import {AlertDialogCancel} from "@radix-ui/react-alert-dialog";
import {useToast} from "../use-toast";
import axios from "axios";
import {Checkbox} from "../Checkbox";
import React from "react";
import {type Subscriber} from "@/types/models";

export const columns: ColumnDef<Subscriber>[] = [
    {
        id: "select",
        header: ({table}) => (
            <Checkbox
                checked={table.getIsAllRowsSelected()}
                onCheckedChange={() => table.toggleAllRowsSelected()}
            />
        ),
        cell: ({row}) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={() => row.toggleSelected()}
            />
        ),
        filterFn: (row, filterValue) => String(row.getValue('id')) === filterValue
    },
    {
        accessorKey: "id",
        header: ({column}) => {
            return (
                <Button
                    variant={"ghost"}
                    className={"flex justify-between gap-1"}
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    ID
                    <Icons.ChevronsUpDown strokeWidth={1.5} size={14}/>
                </Button>
            )
        }
    },
    {
        accessorKey: "email",
        header: ({column}) => {
            return (
                <Button
                    variant={"ghost"}
                    className={"flex justify-between gap-1"}
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Email
                    <Icons.ChevronsUpDown strokeWidth={1.5} size={14}/>
                </Button>
            )
        }

    },
    {
        accessorKey: "createdAt",
        header: ({column}) => {
            return (
                <Button
                    variant={"ghost"}
                    className={"flex justify-between gap-1"}
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Since
                    <Icons.ChevronsUpDown strokeWidth={1.5} size={14}/>
                </Button>
            )
        },
        cell: ({row}) => {
            const createdAt: string = row.getValue("createdAt");
            const formatted = new Date(
                Date.parse(createdAt)
            ).toLocaleDateString();
            return <div>{formatted}</div>;
        },
    },
    {
        accessorKey: "unsubscribeToken",
        header: ({column}) => {
            return (
                <Button
                    variant={"ghost"}
                    className={"flex justify-between gap-1"}
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Unsubscribe Token
                    <Icons.ChevronsUpDown strokeWidth={1.5} size={14}/>
                </Button>
            )
        },
        cell: ({row}) => {
            const token: string = row.getValue("unsubscribeToken");
            const subscriberId = row.getValue("id");
            const toasts = useToast();
            return (
                <div className="flex flex-row gap-1 justify-start items-center group/container">
                    <p>{token}</p>
                    <Button
                        className="text-transparent group-hover/container:text-primary"
                        variant={"link"}
                        onClick={() => {
                            axios
                                .get<{ url: string }>(
                                    `/dashboard/unsubscribe_url/${subscriberId}`
                                )
                                .then((res) => {
                                    navigator.clipboard.writeText(res.data.url);
                                    toasts.toast({
                                        description:
                                            "Unsubscribe token has been copied to clipboard",
                                    });
                                })
                                .catch((err) =>
                                    toasts.toast({
                                        variant: "destructive",
                                        title: "Error",
                                        description:
                                            "Could not retrieve unsubscribe url",
                                    })
                                );
                        }}
                    >
                        Copy URL
                    </Button>
                </div>
            );
        },
    },
    {
        id: "actions",
        cell: ({row}) => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant={"ghost"} size={"icon"}>
                            <Icons.MoreHorizontal strokeWidth={1.5} size={15}/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent sideOffset={8} align="end">
                        <DropdownMenuItem asChild>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant={"ghost"} className={"flex flex-row justify-start gap-3 w-full"}>
                                        <Icons.UserX size={14}/>
                                        <span>Blacklist</span>
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>
                                            Are you sure?
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action will move selected subscriber to blacklist and this subscriber
                                            won't be able to receive any more newsletter.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter className="flex flex-row start gap-3">
                                        <AlertDialogCancel asChild>
                                            <Button variant={"ghost"}>
                                                Cancel
                                            </Button>
                                        </AlertDialogCancel>
                                        <AlertDialogAction
                                            onClick={() =>
                                                router.put(
                                                    `/dashboard/blacklistSubscriber/`,
                                                    {
                                                        id: row.getValue("id"),
                                                    }
                                                )
                                            }
                                        >
                                            Confirm
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button
                                        variant={"ghost"}
                                        className="flex flex-row justify-between gap-3"
                                    >
                                        <Icons.UserMinus
                                            size={14}
                                            className="text-destructive"
                                        />
                                        <span className="text-destructive">
                                            Unsubscribe
                                        </span>
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>
                                            Are you sure?
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action will permanently delete
                                            subscriber
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter className="flex flex-row justify-between gap-2">
                                        <AlertDialogCancel asChild>
                                            <Button variant={"ghost"}>
                                                Cancel
                                            </Button>
                                        </AlertDialogCancel>
                                        <AlertDialogAction
                                            onClick={() =>
                                                router.delete(
                                                    `/dashboard/subscriber/${row.getValue(
                                                        "id"
                                                    )}`
                                                )
                                            }
                                        >
                                            Confirm
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
export const filterColumnList = [
    {
        name: "ID", value: "id"
    },
    {
        name: "Email", value: "email"
    },
    {
        name: "Unsubscribe Token", value: "unsubscribeToken"
    },
];
