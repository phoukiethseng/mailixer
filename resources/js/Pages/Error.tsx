import { usePage } from "@inertiajs/react";
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "../Components/Alert";

type ErrorPageProps = {
    message: string;
};

export default function ErrorPage() {
    const { props } = usePage<ErrorPageProps>();
    return (
        <div className="min-h-screen flex justify-center items-center">
            <Alert variant={"destructive"} className="w-1/4">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{props?.message}</AlertDescription>
            </Alert>
        </div>
    );
}
