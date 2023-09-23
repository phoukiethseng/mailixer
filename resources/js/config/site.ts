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

export default siteConfig;
