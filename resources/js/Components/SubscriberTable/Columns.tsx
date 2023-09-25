import { ColumnDef } from "@tanstack/react-table";
import { SubscribersPageProps } from "../../Pages/DashBoard/Subscribers";

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
];
