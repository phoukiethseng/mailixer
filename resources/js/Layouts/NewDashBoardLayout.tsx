import React from "react";
import {Link, router, usePage} from "@inertiajs/react";
import {InertiaSharedProps} from "@/types/inertia";
import LogoText from "@/Components/LogoText";
import {Avatar, AvatarFallback, AvatarImage} from "@/Components/Avatar";
import {Icons} from "@/Components/Icons";
import {Button} from "@/Components/Button";
import {Popover, PopoverContent, PopoverTrigger} from "@/Components/Popover";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem, DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/Components/DropDownMenu";
import {useProfilePicture} from "@/lib/hooks/useProfilePicture";
import site, {dashboardPageGroups} from "@/config/site";
import {DashBoardMenuItems, DashBoardPageDescription, DashBoardPageGroupDescription} from "@/types/dashboard_page";
import {cn} from "@/lib/utils";
import {route} from "../../../vendor/tightenco/ziggy";
import {LucideIcon} from "lucide-react";
import {Dialog, DialogContent, DialogHeader, DialogTrigger} from "@/Components/Dialog";


type NewDashBoardLayoutProps = {
    activeSubPageName: DashBoardMenuItems
} & React.ComponentPropsWithoutRef<"div">;

function getPageGroupDescriptionFor(subPageName: DashBoardMenuItems): DashBoardPageGroupDescription | null{
    let pageGroup = null
    Object.values(dashboardPageGroups).forEach(pageGroupDescription => {
        if (pageGroupDescription.pages.includes(subPageName)) {
            pageGroup = pageGroupDescription;
            return;
        }
    });
    return pageGroup;
}

function getPageDescriptionFor(pageName: DashBoardMenuItems): DashBoardPageDescription | null{
    return site.dashboard.pages?.[pageName] ?? null;
}

const NewDashBoardLayout = ({children, activeSubPageName}: NewDashBoardLayoutProps) => {
    const inertiaPage = usePage<InertiaSharedProps>();
    const profilePicture = useProfilePicture(inertiaPage.props.auth.user.profilePictureUrl);
    const userDisplayName = inertiaPage.props.auth.user.name ?? "Unknown";
    const userEmail = inertiaPage.props.auth.user.email ?? "Unknown";

    const currentPageGroup = getPageGroupDescriptionFor(activeSubPageName);

    return (
        <div className={"flex flex-col w-full h-screen"}>
            <div className={"w-full h-14 px-4 flex flex-row items-center justify-between border-b border-neutral-200"}>
                <article className={"flex flex-row justify-start items-center"}>
                    <LogoText className={"text-2xl"}/>
                    <Icons.ChevronRight strokeWidth={2} size={20} className={"text-muted-foreground ml-2"}/>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"ghost"}
                                className={"flex flex-row justify-start items-center gap-2 px-2 py-1 rounded-md hover:bg-muted cursor-pointer "}>
                                <Avatar className={"w-8 h-8"}>
                                    <AvatarImage
                                        src={profilePicture ?? ""}/>
                                    <AvatarFallback>MX</AvatarFallback>
                                </Avatar>
                                <span
                                    className={"text-muted-foreground text-sm font-semibold max-w-44 truncate"}>{userDisplayName}</span>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className={"flex flex-col gap-4"}>
                            <div className={"flex flex-row justify-start items-center gap-4"}>
                                <Avatar className={"w-16 h-16"}>
                                    <AvatarImage
                                        src={profilePicture ?? ""}/>
                                    <AvatarFallback>MX</AvatarFallback>
                                </Avatar>
                                <div className={"flex flex-col justify-start items-stretch"}>
                                    <span className={"truncate max-w-44 text-sm text-foreground font-semibold"}>{userDisplayName}</span>
                                    <span className={"truncate max-w-44 text-xs text-muted-foreground"}>{userEmail}</span>
                                </div>
                            </div>
                            <Button variant={"destructive"} className={"w-full"} size={"sm"} onClick={() => {
                                router.post("/logout")
                            }}>Sign Out</Button>
                        </PopoverContent>
                    </Popover>
                </article>
                <nav className={"flex flex-row h-full gap-0"}>
                    {
                        currentPageGroup && currentPageGroup.pages.map((page, index) => {
                            const pageDescription = getPageDescriptionFor(page)
                            const Icon = pageDescription?.icon ?? Icons.List;
                            const isActive = activeSubPageName === page;
                            return (
                                <Link href={pageDescription?.url ?? ""} key={index} className={"h-full flex flex-col justify-center items-center relative"}>
                                    <div className={cn("flex flex-row justify-center items-center gap-3 px-5", isActive && "text-primary")}>
                                        <Icon strokeWidth={1.5} size={19}/>
                                        <span className={"font-semibold text-sm"}>{pageDescription?.displayName}</span>
                                    </div>
                                    {
                                        isActive &&
                                        <span className={"w-full bg-primary h-[3px] absolute bottom-0"}/>
                                    }
                                </Link>
                            )
                        })
                    }
                </nav>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant={"ghost"} size={"icon"}>
                            <Icons.Settings strokeWidth={1.5} size={18} className={"text-muted-foreground"}/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Settings</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => router.visit(route("setting.account"))}>Account Setting</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className={"w-ful h-full flex flex-row"}>
                <aside className={"min-w-60 mt-7"}>
                    <nav className={"w-full h-full"}>
                        <ul className={"w-full h-full flex flex-col justify-start items-stretch px-4 gap-2"}>
                            {
                                Object.values(dashboardPageGroups).map((pageGroup, index) => {
                                    const Icon = (pageGroup?.icon ?? Icons.List) as LucideIcon ;
                                    const isActive = pageGroup === currentPageGroup;
                                    const redirectUrl = getPageDescriptionFor(pageGroup.pages[0])?.url ?? "";
                                    return (
                                        <li key={index}>
                                            <Link href={redirectUrl} className={cn("flex flex-row gap-2 font-bold p-3 rounded-lg", isActive && "text-primary bg-slate-100")}>
                                                <Icon strokeWidth={2.5} size={20}/>
                                                <span>{pageGroup.displayName}</span>
                                            </Link>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </nav>

                </aside>
                <div className={"bg-muted w-full pb-5 flex flex-col justify-start items-center"}>
                    <main className={"mt-5 px-5 2xl:px-0 min-h-[80vh] w-full xl:max-w-[1100px] overflow-x-auto"}>
                        {children}
                    </main>
                </div>
            </div>
        </div>
    )
};

export default NewDashBoardLayout;
