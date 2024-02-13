import React from "react";
import DashBoardLayout from "../../../Layouts/DashBoardLayout";
import {Subscriber} from "../../../types/models";
import {InertiaSharedProps} from "../../../config/site";
import {DataTable} from "../../../Components/DataTable";
import BlacklistedSubscribersColumn from "../../../Components/SubscriberTable/BlacklistedSubscribersColumn";
import {useMessageToast} from "../../../lib/hooks/useMessageToast";

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
            <DataTable columns={BlacklistedSubscribersColumn} data={props.subscribers.blacklisted}
                       className={"self-center"}
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
