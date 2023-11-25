import React from "react";
import LogoText from "../../Components/LogoText";
import { InertiaSharedProps } from "../../config/site";
import Confetti from "react-confetti";

type SuccessPageProps = {} & InertiaSharedProps;

export default function SuccessPage({ auth }: SuccessPageProps) {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center gap-6">
            <Confetti gravity={0.2}/>
            <LogoText className="text-5xl" />
            <div className="flex flex-col justify-start items-center gap-1 tracking-tight">
                <h2 className="text-2xl font-medium text-foreground">
                    You have subscribed to {auth.user.name} newsletter
                </h2>
                <h3>
                    You will now start receiving email newsletter from{" "}
                    {auth.user.name}.
                </h3>
            </div>
        </div>
    );
}
