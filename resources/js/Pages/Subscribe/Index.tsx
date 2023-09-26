import { router, usePage } from "@inertiajs/react";
import React from "react";
import SubscribeCard, { EmailForm } from "../../Components/SubscribeCard";
import { InertiaSharedProps } from "resources/js/config/site";

type SubscribePageProps = {
    subscribe: {
        description: string;
    };
} & InertiaSharedProps;

export default function SubscribePage({ auth, subscribe }: SubscribePageProps) {
    const { props } = usePage();
    const { errors } = props;

    async function handleFormSubmit(formData: EmailForm) {
        router.post("/subscribe_page", {
            user_id: auth.user.id,
            email: formData.email,
        });
    }

    return (
        <div className="min-h-screen w-full flex flex-col justify-center items-center gap-6">
            <SubscribeCard
                user={{ name: auth.user.name }}
                subscribe={{ description: subscribe.description }}
                errors={{ message: errors?.message }}
                onSubscribe={handleFormSubmit}
            />
        </div>
    );
}
