import React from "react";
import { Icons } from "../Components/Icons";

export type PageDescription = {
    displayName: string;
    url: string;
    icon: React.FunctionComponent;
    description: string;
};
type PageGroupConfig = {
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
        } satisfies { [key: string]: PageDescription },
    },
};

// Defining a grouping of dashboard sub pages
export const dashboardPageGroups: PageGroupConfig = {
    "Subscribe Page": {
        icon: Icons.Layout,
        pages: ["CustomizePage"],
    },
    Subscribers: {
        icon: Icons.UserCheck,
        pages: ["Subscribers"],
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

// Enum for Newsletter Content Type
export const newsletterContentType = {
    HTML: 1,
    MARKDOWN: 2,
    PLAINTEXT: 3,
};
export type NewsletterContentType = keyof typeof newsletterContentType;
export function getContentTypeNameById(id: number): string | null {
    const entry = Object.entries(newsletterContentType).find(
        ([key, value]) => value === id
    );
    if (entry) return entry[0];
    else return null;
}
export default siteConfig;
