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
            Customization: {
                displayName: "Customize",
                url: "/dashboard/customize_page",
                icon: Icons.Layout,
                description: "Your own subscribe page",
            },
            Subscribers: {
                displayName: "All Subscribers",
                url: "/dashboard/all_subscribers_page",
                icon: Icons.UserCheck,
                description: "People who subscribed to your newsletter",
            },
            ComposeNewsletter: {
                displayName: "Compose",
                url: "/dashboard/compose_newsletter_page",
                icon: Icons.Newspaper,
                description:
                    "Keep your subscribers updated by composing newsletter",
            },
            DraftNewsletter: {
                displayName: "Drafts",
                url: "",
                icon: Icons.Cross2Icon,
                description: "Drafts of all Newsletter",
            },
        } satisfies { [key: string]: PageDescription },
    },
};

export const dashboardPageGroups: PageGroupConfig = {
    "Subscribe Page": {
        icon: Icons.Layout,
        pages: ["Customization"],
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
export const newsletterContentType = ["HTML", "Markdown", "Plaintext"] as const;
export type NewsletterContentType = (typeof newsletterContentType)[number];
export function getNewsletterContentTypeId(type: NewsletterContentType) {
    return newsletterContentType.indexOf(type) + 1;
}

export default siteConfig;
