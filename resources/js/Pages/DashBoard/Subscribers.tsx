import React from "react";
import { InertiaSharedProps } from "../../config/site";
import DashBoardLayout from "../../Layouts/DashBoardLayout";

type SubscribersPageProps = {
    subscribers: {
        id: number;
        email: string;
    }[];
} & InertiaSharedProps;

const SubscribersPage = ({ subscribers }: SubscribersPageProps) => {
    console.log(subscribers);
    return (
        <div>
            {subscribers.map((subscriber) => (
                <p key={subscriber.id}>{subscriber.email}</p>
            ))}
        </div>
    );
};

SubscribersPage.layout = (page: React.ReactNode) => (
    <DashBoardLayout activePage="Subscribers">{page}</DashBoardLayout>
);

export default SubscribersPage;
