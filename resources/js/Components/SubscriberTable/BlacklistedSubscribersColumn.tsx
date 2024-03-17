import {ColumnDef} from "@tanstack/react-table";
import {Subscriber} from "@/types/DTO";
import React from "react";
import {Checkbox} from "@/Components/Checkbox";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/Components/DropDownMenu";
import {Button} from "@/Components/Button";
import {Icons} from "@/Components/Icons";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "../../Components/AlertDialog";
import {AlertDialogCancel} from "@radix-ui/react-alert-dialog";
import {router} from "@inertiajs/react";

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
    },
    {
        accessorKey: "id",
        header: ({column}) => {
            return (
                <Button
                    variant={"ghost"}
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className={"flex flex-row justify-between gap-3"}
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
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className={"flex flex-row justify-between gap-3"}
                >
                    Email
                    <Icons.ChevronsUpDown strokeWidth={1.5} size={14}/>
                </Button>
            )
        }
    },
    {
        id: "action",
        cell: ({row}) => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant={"ghost"} size={"icon"}>
                        <Icons.List size={15}/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent sideOffset={8} align="end">
                    <DropdownMenuItem asChild>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button
                                    variant={"ghost"}
                                    className="flex flex-row justify-start w-full gap-3"
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
                                        // TODO: Fix typescript error
                                        //@ts-ignore
                                        onClick={(event: MouseEvent) => {
                                            event.stopPropagation();
                                            // TODO: Fix row.getValue returning undefined -_-
                                            const id = row.getValue("id");
                                            router.delete(
                                                `/dashboard/subscriber/${id}`
                                            )
                                        }
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
                                    className="flex flex-row justify-start gap-3 w-full"
                                >
                                    <Icons.UserCheck
                                        size={14}
                                    />
                                    <span>
                                            Whitelist
                                    </span>
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        Are you sure?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action will add subscriber to whitelist. This subscriber will be able to
                                        receive newsletter in the future.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter className="flex flex-row justify-between gap-2">
                                    <AlertDialogCancel asChild>
                                        <Button variant={"ghost"}>
                                            Cancel
                                        </Button>
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                        // TODO: Fix typescript error
                                        //@ts-ignore
                                        onClick={(event: MouseEvent) => {
                                            event.stopPropagation();
                                            // TODO: Fix row.getValue returning undefined -_-
                                            router.put(
                                                `/dashboard/whitelistSubscriber`,
                                                {
                                                    id: row.getValue("id"),
                                                }
                                            )
                                        }
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
        )
    }
];

