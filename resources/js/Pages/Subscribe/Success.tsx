import { usePage } from "@inertiajs/react";
import React from "react";

type SuccessPageProps = {
    user: {
        name: string;
    };
};

export default function SuccessPage() {
    const { props } = usePage<SuccessPageProps>();
    return <div>{`Successfully subscribed to ${props.user.name}`}</div>;
}
