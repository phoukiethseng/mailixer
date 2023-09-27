import React from "react";
import { InertiaSharedProps } from "../../config/site";
import DashBoardLayout from "../../Layouts/DashBoardLayout";
import { useErrorMessageToast } from "../../lib/useErrorMessageToast";
import { useToast } from "../../Components/use-toast";
import { DataTable } from "../../Components/DataTable";
import { columns as subscriberTableCloumns } from "../../Components/SubscriberTable/Columns";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../../Components/Card";
import { Icons } from "../../Components/Icons";

export type SubscribersPageProps = {
    subscribers: {
        id: number;
        email: string;
        createdAt: Date;
        unsubscribe_token: string;
    }[];
    subscribersCount: number;
} & InertiaSharedProps;

const SubscribersPage = ({
    subscribers,
    subscribersCount,
    ...props
}: SubscribersPageProps) => {
    const toasts = useToast();
    useErrorMessageToast(props, toasts);
    return (
        <div className="grid grid-cols-1 gap-6 align-start justify-items-center ">
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
                <Card>
                    <CardHeader className="flex flex-row justify-between items-center">
                        <CardTitle className="max-w-[100px] leading-5">
                            Total Subscribers
                        </CardTitle>
                        <Icons.UserCheck
                            size={16}
                            strokeWidth={1.5}
                            className="hidden lg:flex"
                        />
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold ">
                            {subscribersCount}
                        </p>
                    </CardContent>
                </Card>
            </div>
            <DataTable
                columns={subscriberTableCloumns}
                data={subscribers}
                className="w-full"
            />
        </div>
    );
};

SubscribersPage.layout = (page: React.ReactNode) => (
    <DashBoardLayout activePage="Subscribers">{page}</DashBoardLayout>
);

export default SubscribersPage;
