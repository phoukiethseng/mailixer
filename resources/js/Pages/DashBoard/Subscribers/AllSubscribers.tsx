import React from "react";
import {useMessageToast} from "@/lib/hooks/useMessageToast";
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/Components/Card";
import PieChart from "@/Components/Charts/Pie";
import {getSubscriberESP} from "@/lib/analytics/subscriber";
import {Subscriber} from "@/types/DTO";
import WhitelistedSubscriberTable from "@/Components/SubscriberTable/WhitelistedSubscriberTable";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/Components/Resizable";
import {InertiaSharedProps} from "@/types/inertia";
import NewDashBoardLayout from "@/Layouts/NewDashBoardLayout";

export type SubscribersPageProps = {
    subscribers: Subscriber[];
    subscribersCount: number;
    blacklistedSubscribersCount: number;
} & InertiaSharedProps;

const SubscribersPage = ({
                             subscribers,
                             subscribersCount,
                             blacklistedSubscribersCount,
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
        <ResizablePanelGroup direction={"horizontal"} className={"gap-2 w-full h-full"}>
            <ResizablePanel minSize={20} maxSize={50} defaultSize={30} className={""}>
                <div className={"w-full flex flex-row justify-center items-start flex-wrap gap-4"}>
                    <div className={"flex flex-row gap-3 flex-wrap justify-stretch"}>


                    </div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Subscribers ESP</CardTitle>
                            <CardDescription>
                                Subscriber's Email Service Providers
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="h-[200px] pb-0 w-[300px] flex flex-col justify-center items-center">
                            {ESPStats.length > 0 && (
                                <PieChart
                                    className={"shadow-md"}
                                    data={ESPStats}
                                    innerRadius={0.5}
                                    // arcLabel={(data) =>
                                    //     `${data.id[0].toUpperCase()}${data.id?.slice(
                                    //         1
                                    //     )}`
                                    // }
                                    enableArcLabels={false}
                                    enableArcLinkLabels={true}
                                    arcLinkLabelsDiagonalLength={10}
                                    arcLinkLabelsStraightLength={7}
                                    margin={{
                                        bottom: 0,
                                        top: 5,
                                        left: 60,
                                        right: 60
                                    }}
                                    // legends={[
                                    //     {
                                    //         anchor: "bottom",
                                    //         direction: "row",
                                    //         itemDirection: "top-to-bottom",
                                    //         symbolShape: "square",
                                    //         itemHeight: 0,
                                    //         itemWidth: 55,
                                    //         translateY: 15
                                    //     }
                                    // ]}
                                />
                            )}
                            {ESPStats.length < 1 && (
                                <p className="text-muted-foreground text-sm">
                                    No Data
                                </p>
                            )}
                        </CardContent>
                    </Card>

                </div>

            </ResizablePanel>
            <ResizableHandle withHandle/>
            <ResizablePanel className={"items-start "}>
                <WhitelistedSubscriberTable data={subscribers}/>
            </ResizablePanel>
        </ResizablePanelGroup>
    );
};

SubscribersPage.layout = (page: React.ReactNode) => (
    <NewDashBoardLayout activeSubPageName={"Subscribers"}>{page}</NewDashBoardLayout>
);

export default SubscribersPage;
