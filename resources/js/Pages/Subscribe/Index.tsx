import { router, usePage } from "@inertiajs/react";
import React from "react";
import SubscribeCard, { EmailForm } from "../../Components/SubscribeCard";
import { InertiaSharedProps } from "../../config/site";
import {User} from "../../types/models";

type SubscribePageProps = {
    subscribePage: {
        user: User,
        showProfilePicture: boolean;
        description: string;
    };
} & InertiaSharedProps;

export default function SubscribePage({ auth, subscribePage }: SubscribePageProps) {
    const { props } = usePage();
    const { errors } = props;

    async function handleFormSubmit(formData: EmailForm) {
        router.post("/subscribe_page", {
            user_id: subscribePage.user.id,
            email: formData.email,
        });
    }

    return (
        <div className="min-h-screen w-full flex flex-col justify-center items-center gap-6">
            <SubscribeCard
                user={{ name: subscribePage.user.name, profilePicture: subscribePage.user.profilePicture }}
                subscribePage={subscribePage}
                errors={{ message: errors?.message }}
                onSubscribe={handleFormSubmit}
            />
        </div>
    );
}
