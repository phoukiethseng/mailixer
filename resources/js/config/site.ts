import { Icons } from "../Components/Icons";

const siteConfig = {
    dashboard: {
        subPages: {
            "Customization": {
                url: "/dashboard/customization_page",
                icon: Icons.Layout,
                description: "Your own subscribe page",
            },
            Subscribers: {
                url: "/dashboard/subscribers_page",
                icon: Icons.UserCheck,
                description: "People who subscribed to your newsletter",
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
