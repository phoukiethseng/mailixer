import React from "react";
import {Icons} from "../Components/Icons";

export type PageDescription = {
    displayName: string;
    url: string;
    icon: React.FunctionComponent;
    description: string;
};
type PageGroupDescription = {
    [key: string]: {
        pages: Array<DashBoardMenuItems>;
        icon: React.FunctionComponent;
    };
};

const siteConfig = {
    dashboard: {
        // Dashboard subpages Name as key
        pages: {
            CustomizePage: {
                displayName: "Customize",
                url: "/dashboard/customize_page",
                icon: Icons.Layout,
                description: "Your own subscribe page",
            },
            Subscribers: {
                displayName: "All Subscribers",
                url: "/dashboard/all_subscribers_page",
                icon: Icons.TwoUsers,
                description: "People who subscribed to your newsletter",
            },
            ComposeNewsletter: {
                displayName: "Compose",
                url: "/dashboard/compose_newsletter_page",
                icon: Icons.PenSquare,
                description:
                    "Keep your subscribers updated by composing newsletter",
            },
            DraftNewsletter: {
                displayName: "Drafts",
                url: "/dashboard/draft_newsletter_page",
                icon: Icons.FolderOpen,
                description: "Drafts of all Newsletter",
            },
            BlacklistedSubscribers: {
                displayName: "Blacklisted",
                url: "/dashboard/blacklisted_subscribers",
                icon: Icons.UserX,
                description: "All blacklisted subscribers"
            }
        } satisfies { [key: string]: PageDescription },
    },
};

// Defining a grouping of dashboard sub pages
export const dashboardPageGroups: PageGroupDescription = {
    "Subscribe Page": {
        icon: Icons.Layout,
        pages: ["CustomizePage"],
    },
    Subscribers: {
        icon: Icons.UserCheck,
        pages: ["Subscribers", "BlacklistedSubscribers"],
    },
    Newsletter: {
        icon: Icons.Newspaper,
        pages: ["ComposeNewsletter", "DraftNewsletter"],
    },
};

export type DashBoardMenuItems = keyof typeof siteConfig.dashboard.pages;

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

export const QRCodeOptions = {
    color: {
        dark: "#16a34a"
    }
}

export default siteConfig;
