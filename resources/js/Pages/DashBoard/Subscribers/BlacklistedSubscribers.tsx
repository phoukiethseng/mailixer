import React from "react";
import DashBoardLayout from "../../../Layouts/DashBoardLayout";
import {Subscriber} from "../../../types/models";
import {InertiaSharedProps} from "../../../config/site";
import {useMessageToast} from "../../../lib/hooks/useMessageToast";
import BlacklistedSubscribersTable from "../../../Components/SubscriberTable/BlacklistedSubscribersTable";

type BlacklistedSubscribersPageProps = {
    subscribers: {
        blacklisted: Array<Subscriber>
    }
} & InertiaSharedProps;

const BlacklistedSubscribers = (props: BlacklistedSubscribersPageProps) => {
    useMessageToast(props);
    console.log(props.subscribers.blacklisted);
    return (
        // Ignore this error since we didn't pass second type parameter to ColumnDef
        //@ts-ignore
        <div className={"w-full h-full"}>
            <BlacklistedSubscribersTable data={props.subscribers.blacklisted}
            />
        </div>

    )
}
BlacklistedSubscribers.layout = (page: React.ReactNode) => (
    <DashBoardLayout activePage={"BlacklistedSubscribers"}>
        {page}
    </DashBoardLayout>
)

export default BlacklistedSubscribers;
