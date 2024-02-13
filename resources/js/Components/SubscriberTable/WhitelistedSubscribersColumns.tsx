import { ColumnDef } from "@tanstack/react-table";
import { SubscribersPageProps } from "../../Pages/DashBoard/Subscribers/AllSubscribers";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../DropDownMenu";
import { Button } from "../Button";
import { Icons } from "../Icons";
import { router } from "@inertiajs/react";
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
import { AlertDialogCancel } from "@radix-ui/react-alert-dialog";
import { useToast } from "../use-toast";
import axios from "axios";
import { Checkbox } from "../Checkbox";
import React from "react";
import {type Subscriber} from "../../types/models";

export const columns: ColumnDef<Subscriber>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllRowsSelected()}
                onCheckedChange={() => table.toggleAllRowsSelected()}
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={() => row.toggleSelected()}
            />
        ),
    },
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "email",
        header: "Email",

    },
    {
        accessorKey: "createdAt",
        header: "Since",
        cell: ({ row }) => {
            const createdAt: string = row.getValue("createdAt");
            const formatted = new Date(
                Date.parse(createdAt)
            ).toLocaleDateString();
            return <div>{formatted}</div>;
        },
    },
    {
        accessorKey: "unsubscribeToken",
        header: "Unsubscribe Token",
        cell: ({ row }) => {
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
        cell: ({ row }) => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant={"ghost"} size={"icon"}>
                            <Icons.List size={15} />
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
                                            This action will move selected subscriber to blacklist and this subscriber won't be able to receive any more newsletter.
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
