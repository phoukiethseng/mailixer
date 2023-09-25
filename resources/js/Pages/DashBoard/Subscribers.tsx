import React from "react";
import { InertiaSharedProps } from "../../config/site";
import DashBoardLayout from "../../Layouts/DashBoardLayout";
import { useErrorMessageToast } from "../../lib/useErrorMessageToast";
import { useToast } from "../../Components/use-toast";
import { DataTable } from "../../Components/DataTable";
import { columns as subscriberTableCloumns } from "../../Components/SubscriberTable/Columns";

export type SubscribersPageProps = {
    subscribers: {
        id: number;
        email: string;
        createdAt: Date;
    }[];
} & InertiaSharedProps;

const SubscribersPage = ({ subscribers, ...props }: SubscribersPageProps) => {
    const toasts = useToast();
    useErrorMessageToast(props, toasts);
    return (
        <div className="px-4">
            <DataTable columns={subscriberTableCloumns} data={subscribers} />
        </div>
    );
};

SubscribersPage.layout = (page: React.ReactNode) => (
    <DashBoardLayout activePage="Subscribers">{page}</DashBoardLayout>
);

export default SubscribersPage;
