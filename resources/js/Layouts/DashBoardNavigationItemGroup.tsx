import React from "react";
import {Collapsible, CollapsibleContent, CollapsibleTrigger,} from "@/Components/Collapsible";
import DashBoardNavigationItem from "@/Layouts/DashBoardNavigationItem";
import siteConfig, {DashBoardMenuItems} from "@/config/site";
import {cn} from "@/lib/utils";
import {DashBoardPageDescription} from "@/types/dashboard_page";

type DashBoardNavigationItemGroupProps = {
    groupName: string;
    icon: React.FunctionComponent;
    pages: Array<DashBoardPageDescription>;
    activePage: DashBoardMenuItems;
} & React.ComponentPropsWithoutRef<"div">;

export default function DashBoardNavigationItemGroup({
                                                         icon,
                                                         groupName,
                                                         pages,
                                                         activePage,
                                                         className,
                                                     }: DashBoardNavigationItemGroupProps) {
    const GroupIcon = icon;
    return (
        <Collapsible
            className={cn("text-foreground hover:text-primary", className)}
        >
            <CollapsibleTrigger className="w-full flex flex-row gap-3 justify-start p-0">
                <GroupIcon/>
                <p className={"text-lg font-bold "}>{groupName}</p>
            </CollapsibleTrigger>
            <CollapsibleContent className="flex flex-col">
                {pages.map(({displayName, url, icon}, index) => (
                    <DashBoardNavigationItem
                        className="mt-1"
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
