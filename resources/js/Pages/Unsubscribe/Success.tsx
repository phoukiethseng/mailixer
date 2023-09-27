import React from "react";
import LogoText from "../../Components/LogoText";
import { InertiaSharedProps } from "../../config/site";

type UnsubscribeSuccessPageProps = {} & InertiaSharedProps;

export default function SuccessPage({ auth }: InertiaSharedProps) {
    return (
        <div className="w-full min-h-screen flex gap-3 flex-col justify-center items-center">
            <LogoText />
            <h1 className="text-3xl font-bold tracking-tight">
                Successfully unsubscribed newsletter
            </h1>
            <p>
                You will not be receiving any{" "}
                {auth?.user?.name && `${auth.user.name}'s `}newsletter in the
                future
            </p>
        </div>
    );
}
