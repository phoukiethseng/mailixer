import { ColumnDef } from "@tanstack/react-table";
import { SubscribersPageProps } from "../../Pages/DashBoard/Subscribers";
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

type Subscriber = SubscribersPageProps["subscribers"][number];
export const columns: ColumnDef<Subscriber>[] = [
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
            console.log(createdAt);
            const formatted = new Date(
                Date.parse(createdAt)
            ).toLocaleDateString();
            return <div>{formatted}</div>;
        },
    },
    // TODO: Implement `unsubscribe` feature
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
