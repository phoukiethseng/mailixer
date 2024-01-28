import React from "react";
import { InertiaSharedProps } from "../../../config/site";
import DashBoardLayout from "../../../Layouts/DashBoardLayout";
import { useMessageToast } from "../../../lib/hooks/useMessageToast";
import { DataTable } from "../../../Components/DataTable";
import { columns as subscriberTableCloumns } from "../../../Components/SubscriberTable/WhitelistedSubscribersColumns";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../../../Components/Card";
import { Icons } from "../../../Components/Icons";
import PieChart from "../../../Components/Charts/Pie";
import { getSubscriberESP } from "../../../lib/analytics/subscriber";
import { Subscriber } from "../../../types/models";
export type SubscribersPageProps = {
    subscribers: Subscriber[];
    subscribersCount: number;
} & InertiaSharedProps;

const SubscribersPage = ({
    subscribers,
    subscribersCount,
    ...props
}: SubscribersPageProps) => {
    useMessageToast(props);
    // Email Service Provider
    const ESPStats = React.useMemo(
        () =>
            getSubscriberESP(subscribers).map((e) => ({
                id: e.id,
                value: e.count,
                label: e.id,
            })),
        [subscribers]
    );
    return (
        <div className="grid grid-cols-5 grid-rows-6 gap-2 min-h-[100vh]">
            <div className="min-h-[200px] w-full grid grid-cols-1 sm:grid-cols-2 gap-2 items-start col-span-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Subscribers ESP</CardTitle>
                        <CardDescription>
                            Subscriber's Email Service Providers
                        </CardDescription>
                    </CardHeader>
                    <div className="h-[200px] w-full flex flex-col justify-center items-center">
                        {ESPStats.length > 0 && (
                            <PieChart
                                data={ESPStats}
                                innerRadius={0.3}
                                arcLabel={(data) =>
                                    `${data.id[0].toUpperCase()}${data.id.slice(
                                        1
                                    )}`
                                }
                                enableArcLinkLabels={false}
                            />
                        )}
                        {ESPStats.length < 1 && (
                            <p className="text-muted-foreground text-sm">
                                No Data
                            </p>
                        )}
                    </div>
                    <CardFooter />
                </Card>
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
                // Ignore this error since we didn't pass second type parameter to ColumnDef
                //@ts-ignore
                columns={subscriberTableCloumns}
                data={subscribers}
                className="w-full h-full col-span-3 row-auto"
            />
        </div>
    );
};

SubscribersPage.layout = (page: React.ReactNode) => (
    <DashBoardLayout activePage="Subscribers">{page}</DashBoardLayout>
);

export default SubscribersPage;
