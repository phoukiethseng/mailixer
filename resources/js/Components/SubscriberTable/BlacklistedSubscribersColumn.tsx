import {ColumnDef} from "@tanstack/react-table";
import {Subscriber} from "../../types/models";
import React from "react";
import {Checkbox} from "../../Components/Checkbox";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "../../Components/DropDownMenu";
import {Button} from "../../Components/Button";
import {Icons} from "../../Components/Icons";
import {
    AlertDialog, AlertDialogAction,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader, AlertDialogTitle,
    AlertDialogTrigger
} from "../../Components/AlertDialog";
import {AlertDialogCancel} from "@radix-ui/react-alert-dialog";
import {router} from "@inertiajs/react";

const column: ColumnDef<Subscriber>[] = [
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
        header: "ID",
    },
    {
        accessorKey: "email",
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
                                        // TODO: Fix typescript error
                                        //@ts-ignore
                                        onClick={(event: MouseEvent) => {
                                            event.stopPropagation();
                                            // TODO: Fix row.getValue returning undefined -_-
                                            const id = row.getValue();
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
                </DropdownMenuContent>
            </DropdownMenu>
        )
    }
];

export default column;
