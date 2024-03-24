import React from "react";
import siteConfig from "@/config/site";

export type DashBoardPageDescription = {
    displayName: string;
    url: string;
    icon: React.FunctionComponent;
    description: string;
};
export type DashBoardMenuItems = keyof typeof siteConfig.dashboard.pages;
export type DashBoardPageGroupDescription = {
    displayName: string;
    pages: Array<DashBoardMenuItems>;
    icon: React.FunctionComponent;
};
