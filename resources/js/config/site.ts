import { Icons } from "../Components/Icons";

const siteConfig = {
    dashboard: {
        // Dashboard subpages Name as key
        subPages: {
            Customization: {
                url: "/dashboard/customization_page",
                icon: Icons.Layout,
                description: "Your own subscribe page",
            },
            Subscribers: {
                url: "/dashboard/subscribers_page",
                icon: Icons.UserCheck,
                description: "People who subscribed to your newsletter",
            },
            Newsletter: {
                url: "/dashboard/newsletter_page",
                icon: Icons.Newspaper,
                description:
                    "Keep your subscribers updated by composing newsletter",
            },
        },
    },
};

export type DashBoardMenuItems = {
    [Property in keyof typeof siteConfig.dashboard.subPages]: string;
};

export type InertiaSharedProps = {
    auth: {
        user: {
            name: string;
            id: number;
        };
    };
    message?: string;
    errors: {
        message?: string;
    };
};

export default siteConfig;
