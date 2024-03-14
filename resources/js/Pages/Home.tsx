import React from "react";
import LogoText from "@/Components/LogoText";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle
} from "@/Components/NavigationMenu";
import {Button} from "@/Components/Button";
import {cn} from "@/lib/utils";

const HomePage = () => {
    return (
        <div className={"w-screen min-h-screen bg-[url(/background.png)] bg-top bg-cover dark  text-foreground"}>
            <header className={"w-full pb-4 flex justify-center items-center"}>
                <section
                    className={"m-0 flex flex-row py-5 px-1 justify-between items-center w-[60%] min-h-[60px] "}>
                    <nav className={"flex flex-row justify-start gap-3 items-center"}>
                        <a href={"/"}>
                            <LogoText className={"text-3xl"}/>
                        </a>
                        <NavigationMenu>
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <a href={"/docs"}>
                                        <NavigationMenuLink
                                            className={cn(navigationMenuTriggerStyle(), "bg-transparent")}>
                                            Documentation
                                        </NavigationMenuLink>
                                    </a>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                    </nav>
                    <div>
                        <a href={"/register"}>
                            <Button size={"lg"} variant={"outline"}
                                    className={"rounded-xl border-primary text-primary hover:text-primary font-semibold"}>Sign
                                Up</Button>
                        </a>
                    </div>
                </section>

            </header>
            <main className={"flex flex-col justify-start items-center"}>
                <h1 className={"text-6xl font-extrabold text-center mt-[120px] text-[#29332D] font-['futura-pt'] leading-tight text-foreground"}>Hassle
                    Free<br/>
                    <span className={"text-primary drop-shadow-xl"}>Newsletter</span> List
                    Management</h1>
                <h2 className={"text-center text-2xl max-w-xl mt-4 mx-auto font-medium font-['futura-pt']"}>No need
                    to setup your
                    own
                    subscribe page.
                    Send
                    newsletter to your subscribers with ease.</h2>
                <div className={"mt-7 flex flex-row gap-4 justify-center items-center"}>
                    <a href={"/login"}>
                        <Button size={"lg"} variant={"default"} className={"rounded-xl"}>Get Started</Button>
                    </a>
                    <a href={"/docs"}>
                        <Button size={"lg"} variant={"secondary"} className={"rounded-xl"}>Learn More</Button>
                    </a>
                </div>
            </main>
        </div>
    )
};

export default HomePage;
