const siteConfig = {
    dashboard: {
        subPages: {
            "Subscribe Page": "/dashboard/page",
        },
    },
};

export type DashBoardMenuItems = {
    [Property in keyof typeof siteConfig.dashboard.subPages]: string;
};

export type InertiaSharedData = {
    auth: {
        user: {
            name: string;
            id: number;
        };
    };
};

export default siteConfig;
