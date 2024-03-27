import React, {useEffect, useMemo, useState} from "react";
import NewDashBoardLayout from "@/Layouts/NewDashBoardLayout";
import {InertiaSharedProps} from "@/types/inertia";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/Components/Card";
import {Icons} from "@/Components/Icons";
import {cn} from "@/lib/utils";
import Line from "@/Components/Charts/Line";
import {Popover, PopoverContent, PopoverTrigger} from "@/Components/Popover";
import {DateRange} from "react-day-picker";
import {Button} from "@/Components/Button";
import {format, subDays} from "date-fns";
import {Calendar} from "@/Components/Calendar";
import {SubscriptionRecord} from "@/types/DTO";
import axios from "axios";
import {route} from "../../../../../vendor/tightenco/ziggy";
import useLoader from "@/lib/hooks/useLoader";
import {getSubscriberGainCountHistory, getSubscriberLossHistory} from "@/lib/analytics/subscriber";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/Components/Tabs";

type SubscriberOverviewPageProps = {
    subscribersCount: number;
    blacklistedSubscribersCount: number;
} & InertiaSharedProps;

const SubscriberOverviewPage = (props: SubscriberOverviewPageProps) => {

    const headingStyle = {
        h2: "text-2xl font-bold text-foreground"
    }

    const [date, setDate] = useState<DateRange | undefined>({
        from: subDays(new Date(), 7),
        to: new Date()
    })

    const [subscriptionRecords, setSubscriptionRecords] = useState<Array<SubscriptionRecord>>()

    const {isLoading, load} = useLoader();

    useEffect(() => {
        console.log("date has changed", date)
        if (date?.from && date?.to) {
            console.log("fetching")
            load(() => axios.get(route("dashboard.subscription.records", {
                from: date?.from?.toISOString(),
                to: date?.to?.toISOString(),
            }))
                .then(res => {
                    if (res.status === 200) {
                        setSubscriptionRecords(res.data.subscriptionRecords)
                    }
                }))
        }
    }, [date])

    const subscriberGainHistory = useMemo(() => {
        if (subscriptionRecords && date?.from && date?.to) {
            return getSubscriberGainCountHistory(subscriptionRecords, date?.from, date?.to)
        } else return [];
    }, [subscriptionRecords])

    const subscriberLossHistory = useMemo(() => {
        if (subscriptionRecords && date?.from && date?.to) {
            return getSubscriberLossHistory(subscriptionRecords, date?.from, date?.to)
        } else return [];
    }, [subscriptionRecords])

    return (
        <div className={"flex flex-col gap-3 items-stretch"}>
            <h2 className={headingStyle.h2}>Overview</h2>
            <div className={"flex flex-row gap-3 items-center"}>
                <Card >
                    <CardHeader className="flex flex-row justify-between items-center gap-4">
                        <CardTitle className="leading-5">
                            Subscribers
                        </CardTitle>
                        <Icons.UserCheck
                            size={16}
                            strokeWidth={1.5}
                            className="hidden lg:flex"
                        />
                    </CardHeader>
                    <CardContent className={"min-w-[200px]"}>
                        <p className="text-4xl font-extrabold">
                            {props.subscribersCount}
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row justify-between items-center gap-4">
                        <CardTitle className="leading-5">Blacklisted</CardTitle>
                        <Icons.UserX
                            size={16}
                            strokeWidth={1.5}
                            className="hidden lg:flex"/>
                    </CardHeader>
                    <CardContent className={"min-w-[200px]"}>
                        <p className="text-4xl font-bold">{props.blacklistedSubscribersCount}</p>
                    </CardContent>
                </Card>
            </div>
            <h2 className={cn(headingStyle.h2, "mt-2")}>History</h2>
            <div className={"flex flex-row items-center"}>
                <Tabs defaultValue={"subscription"} className={"w-full h-auto"}>
                    <TabsList className={"grid grid-cols-2 border"}>
                        <TabsTrigger value={"subscription"}>Subscriptions</TabsTrigger>
                        <TabsTrigger value={"another"}>Another</TabsTrigger>
                    </TabsList>
                    <TabsContent value={"subscription"}>
                        <Card className={"w-auto overflow-clip"}>
                            <CardHeader>

                            </CardHeader>
                            <CardContent className={"w-full h-[380px] flex flex-col gap-2"}>
                                <Popover>
                                    <PopoverTrigger>
                                        <Button variant={"outline"} className={"flex flex-row gap-2 "}>
                                            <Icons.Calendar strokeWidth={1.5} size={14}/>
                                            {date?.from ? (
                                                date.to ? (
                                                    <>
                                                        {format(date.from, "LLL dd, y")} -{" "}
                                                        {format(date.to, "LLL dd, y")}
                                                    </>
                                                ) : (
                                                    format(date.from, "LLL dd, y")
                                                )
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className={"w-auto"} align={"start"}>
                                        <Calendar
                                            initialFocus
                                            mode={"range"}
                                            defaultMonth={date?.from}
                                            selected={date}
                                            onSelect={setDate}
                                            numberOfMonths={2}
                                        />
                                    </PopoverContent>
                                </Popover>
                                <Line
                                    curve={"monotoneX"}
                                    lineWidth={3}
                                    useMesh={true}
                                    enablePoints={false}
                                    enableGridY={true}
                                    enableArea={true}
                                    yScale={{
                                        type: "linear",
                                        min:0,
                                        max: 'auto'
                                    }}
                                    xScale={{
                                        type: "time",
                                        format: "%Y-%m-%dT%H:%M:%S.%L%Z"
                                    }}
                                    margin={{
                                        top: 20,
                                        bottom: 70,
                                        left: 50,
                                        right: 50
                                    }}
                                    xFormat={value => new Date(value).toDateString()}
                                    axisLeft={{
                                        tickValues: 2,
                                        legend: "Count",
                                        legendOffset: -40,
                                        legendPosition: "middle",
                                    }}
                                    axisBottom={{
                                        format: '%b %d',
                                        tickValues: 'every 3 days',
                                    }}
                                    legends={[
                                        {
                                            anchor: "bottom",
                                            direction: "row",
                                            itemDirection: "left-to-right",
                                            itemWidth: 130,
                                            itemHeight: 0,
                                            translateY: 50
                                        }
                                    ]}
                                    data={[
                                        {
                                            id: "Subscriber Gained",
                                            data: subscriberGainHistory
                                        },
                                        {
                                            id: "Subscriber Loss",
                                            data: subscriberLossHistory
                                        }
                                    ]}/>
                            </CardContent>
                            <CardFooter></CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}

SubscriberOverviewPage.layout = (page: React.ReactElement) => (
    <NewDashBoardLayout activeSubPageName={"SubscriberOverview"}>{page}</NewDashBoardLayout>
)

export default SubscriberOverviewPage;
