import React, { useState } from "react";
import { Separator } from "../Components/Separator";
import LogoText from "../Components/LogoText";
import { Avatar, AvatarFallback, AvatarImage } from "../Components/Avatar";
import { router, usePage } from "@inertiajs/react";
import { dashboardPageGroups, type DashBoardMenuItems } from "../config/site";
import siteConfig from "../config/site";
import { Button } from "../Components/Button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuItem,
} from "../Components/DropDownMenu";
import { Icons } from "../Components/Icons";
import DashBoardSubPageHeader from "./DashBoardSubPageHeader";
import DashBoardNavigationItemGroup from "./DashBoardNavigationItemGroup";

type DashBoardLayoutProps = {
    activePage: DashBoardMenuItems; // Current active page, must be any key from `siteConfig.dashboard.pages`
} & React.ComponentPropsWithoutRef<"div">;

export default function DashBoardLayout({
    children,
    activePage,
}: DashBoardLayoutProps) {
    const { props } = usePage<{ auth?: { user: { name: string } } }>();
    const pageDescription = siteConfig.dashboard.pages[activePage].description;
    const pageTitle = siteConfig.dashboard.pages[activePage].displayName;
    return (
        <div className="flex flex-row items-stretch min-h-screen w-full">
            <aside className="w-[90%] sm:w-[70%] md:w-[50%] lg:w-[30%] xl:w-[20%] border-r border-border pt-4 flex flex-col justify-start items-center gap-4">
                <LogoText className="text-3xl" />
                <Separator className="my-4" />
                <Avatar className="w-12 h-12 lg:w-16 lg:h-16">
                    <AvatarImage src="/default_avatar.png" />
                    <AvatarFallback className="text-sm font-bold">
                        MX
                    </AvatarFallback>
                </Avatar>
                {props?.auth && (
                    <p className="text-xl font-bold text-foreground">
                        {props?.auth.user.name}
                    </p>
                )}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant={"outline"} size={"icon"}>
                            <Icons.Settings className="w-4 h-4 text-foreground" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Settings</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onSelect={() => router.visit("/logout")}
                        >
                            <Icons.LogOut className="mr-2 w-4 h-4" />
                            <span className="font-medium">Logout</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <Separator />
                <div className="w-[90%] flex flex-col justify-start items-stretch gap-4 transition-color duration-150">
                    {/* {Object.entries(siteConfig.dashboard.pages).map(
                        ([pageName, pageInfo], index) => (
                            <DashBoardNavigationItem
                                icon={pageInfo.icon}
                                key={index}
                                name={pageInfo?.displayName ?? pageName}
                                url={pageInfo.url}
                                isActive={pageName === activePage}
                            />
                        )
                    )} */}
                    {Object.entries(dashboardPageGroups).map(
                        ([pageGroupName, pageGroupInfo], index, arr) => (
                            <>
                                <DashBoardNavigationItemGroup
                                    icon={pageGroupInfo.icon}
                                    groupName={pageGroupName}
                                    pages={pageGroupInfo.pages.map(
                                        (pageName) =>
                                            siteConfig.dashboard.pages[pageName]
                                    )}
                                    activePage={activePage}
                                />
                                {index + 1 !== arr.length && <Separator />}
                            </>
                        )
                    )}
                </div>
                <Separator />
            </aside>
            <div className="w-full overflow-x-scroll h-screen p-6 gap-6 flex flex-col justify-start items-stretch">
                <DashBoardSubPageHeader
                    title={pageTitle}
                    description={pageDescription}
                />
                {children}
            </div>
        </div>
    );
}
