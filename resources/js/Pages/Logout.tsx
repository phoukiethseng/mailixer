import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../Components/Card";
import { Button } from "../Components/Button";
import { router } from "@inertiajs/react";

export default function LogoutPage() {
    function handleCancel() {
        router.visit("/");
    }
    function handleConfirm() {
        router.post("/logout");
    }
    return (
        <div className="min-h-screen w-full flex justify-center items-center">
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl">Are you sure?</CardTitle>
                </CardHeader>
                <CardContent>
                    <h2 className="text-md">
                        You will be logged out from <b>Mailixer</b>
                    </h2>
                </CardContent>
                <CardFooter className="gap-2">
                    <Button onClick={(e) => handleConfirm()}>Confirm</Button>
                    <Button onClick={(e) => handleCancel()} variant={"outline"}>
                        Cancel
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
