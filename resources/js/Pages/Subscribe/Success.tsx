import { usePage } from "@inertiajs/react";
import React from "react";
import LogoText from "../../Components/LogoText";

type SuccessPageProps = {
    user: {
        name: string;
    };
};

export default function SuccessPage() {
    const { props } = usePage<SuccessPageProps>();
    return (
        <div className="min-h-screen flex flex-col justify-center items-center gap-6">
            <LogoText className="text-5xl" />
            <div className="flex flex-col justify-start items-center gap-1 tracking-tight">
                <h2 className="text-2xl font-medium text-foreground">
                    You have subscribed to {props?.user?.name} newsletter
                </h2>
                <h3>
                    You will now start receiving email newsletter from{" "}
                    {props?.user?.name}.
                </h3>
            </div>
        </div>
    );
}
