import React from "react";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "../Components/Collapsible";
import DashBoardNavigationItem from "./DashBoardNavigationItem";
import siteConfig, {
    DashBoardMenuItems,
    PageDescription,
    dashboardPageGroups,
} from "../config/site";

type DashBoardNavigationItemGroupProps = {
    groupName: string;
    icon: React.FunctionComponent;
    pages: Array<PageDescription>;
    activePage: DashBoardMenuItems;
};

export default function DashBoardNavigationItemGroup({
    icon,
    groupName,
    pages,
    activePage,
}: DashBoardNavigationItemGroupProps) {
    const GroupIcon = icon;
    return (
        <Collapsible className="hover:text-primary">
            <CollapsibleTrigger className="w-full flex flex-row gap-3 justify-start p-0">
                <GroupIcon />
                <p className={"text-lg font-bold"}>{groupName}</p>
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-2 flex flex-col gap-2">
                {pages.map(({ displayName, url, icon }, index) => (
                    <DashBoardNavigationItem
                        key={index}
                        name={displayName}
                        url={url}
                        icon={icon}
                        isActive={
                            siteConfig.dashboard.pages[activePage].url === url
                        }
                    />
                ))}
            </CollapsibleContent>
        </Collapsible>
    );
}
