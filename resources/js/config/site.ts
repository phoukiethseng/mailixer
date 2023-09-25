import { Icons } from "../Components/Icons";

const siteConfig = {
    dashboard: {
        subPages: {
            "Subscribe Page": {
                url: "/dashboard/page",
                icon: Icons.Layout,
            },
            Subscribers: {
                url: "/dashboard/subscribers",
                icon: Icons.UserCheck,
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
};

export default siteConfig;
