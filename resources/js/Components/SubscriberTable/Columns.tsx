import { ColumnDef } from "@tanstack/react-table";
import { SubscribersPageProps } from "../../Pages/DashBoard/Subscribers";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../DropDownMenu";
import { Button } from "../Button";
import { Icons } from "../Icons";
import { router } from "@inertiajs/react";

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
                        <Button variant={"outline"} size={"icon"}>
                            <Icons.List size={15} />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent sideOffset={8}>
                        <DropdownMenuItem
                            asChild
                            onSelect={() =>
                                router.delete(
                                    `/dashboard/subscriber/${row.getValue(
                                        "id"
                                    )}`
                                )
                            }
                        >
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
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
