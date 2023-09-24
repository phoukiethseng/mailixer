import { router, usePage } from "@inertiajs/react";
import React from "react";
import SubscribeCard, { EmailForm } from "../../Components/SubscribeCard";

type SubscribePageProps = {
    user: {
        id: string;
        name: string;
    };
    subscribe: {
        description: string;
    };
    errors: {
        message?: string;
    };
};

export default function SubscribePage() {
    const { props } = usePage<SubscribePageProps>();
    const { user, errors } = props;

    async function handleFormSubmit(data: EmailForm) {
        router.post("/subscribe", {
            user_id: user.id,
            email: data.email,
        });
    }

    return (
        <div className="min-h-screen w-full flex flex-col justify-center items-center gap-6">
            <SubscribeCard
                user={{ name: user.name }}
                subscribe={{ description: props.subscribe.description }}
                errors={{ message: errors?.message }}
                onSubscribe={handleFormSubmit}
            />
        </div>
    );
}
