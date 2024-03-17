import React from "react";
import {DashBoardMenuItems} from "@/config/site";

export type DashBoardPageDescription = {
    displayName: string;
    url: string;
    icon: React.FunctionComponent;
    description: string;
};
export type DashBoardPageGroupDescription = {
    [key: string]: {
        pages: Array<DashBoardMenuItems>;
        icon: React.FunctionComponent;
    };
};
