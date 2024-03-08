import React from "react";
import {InertiaSharedProps} from "@/config/site";
import {Card, CardContent, CardHeader, CardTitle,} from "@/Components/Card";

type UnsubscribeErrorPageProps = {} & InertiaSharedProps;

export default function ErrorPage({message}: UnsubscribeErrorPageProps) {
    return (
        <div className="w-full min-h-screen flex justify-center items-center">
            {message && (
                <Card>
                    <CardHeader>
                        <CardTitle>Error</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>{message}</p>
                    </CardContent>
                </Card>
            )}
            {!message && (
                <Card>
                    <CardHeader>
                        <CardTitle>Error</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Couldn't unsubscribe</p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
