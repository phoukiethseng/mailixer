import { router, usePage } from "@inertiajs/react";
import React from "react";
import SubscribeCard, { EmailForm } from "../../Components/SubscribeCard";
import { InertiaSharedProps } from "resources/js/config/site";

type SubscribePageProps = {
    subscribePage: {
        showProfilePicture: boolean;
        description: string;
    };
} & InertiaSharedProps;

export default function SubscribePage({ auth, subscribePage }: SubscribePageProps) {
    const { props } = usePage();
    const { errors } = props;

    async function handleFormSubmit(formData: EmailForm) {
        router.post("/subscribe_page", {
            user_id: auth.user.id,
            email: formData.email,
        });
    }

    console.log(props.auth.user)

    return (
        <div className="min-h-screen w-full flex flex-col justify-center items-center gap-6">
            <SubscribeCard
                user={{ name: auth.user.name, profilePicture: auth.user.profilePicture }}
                subscribePage={subscribePage}
                errors={{ message: errors?.message }}
                onSubscribe={handleFormSubmit}
            />
        </div>
    );
}
