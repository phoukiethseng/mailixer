import React from "react";
import {Button} from "@/Components/Button";
import {router, usePage} from "@inertiajs/react";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/Components/Card";
import {useForm} from "react-hook-form";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/Components/Form";
import {Input} from "@/Components/Input";
import {Alert, AlertDescription, AlertTitle} from "@/Components/Alert";
import {Icons} from "@/Components/Icons";
import LogoText from "@/Components/LogoText";
import IconInput from "@/Components/IconInput";

const loginSchema = z.object({
    email: z.string().email().nonempty(),
    password: z.string().nonempty(),
});

export default function LoginPage() {
    const page = usePage();
    const {errors} = page.props;

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    function handleLoginSubmit(values: z.infer<typeof loginSchema>) {
        router.post("/login", values);
    }

    return (
        <div className="w-screen min-h-screen flex flex-col justify-center items-center gap-6">
            <LogoText/>
            <Card className="min-w-[350px]">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Welcome Back!</CardTitle>
                    <CardDescription>Sign in to continue</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(handleLoginSubmit)}
                            className="flex flex-col gap-2"
                        >
                            <FormField
                                control={form.control}
                                name="email"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <IconInput
                                                icon={Icons.Mail}
                                                {...field}
                                                placeholder="hello@example.com"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-sm text-right font-md"/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <div className="flex flex-row justify-between">
                                                <IconInput
                                                    icon={Icons.Lock}
                                                    {...field}
                                                    placeholder="Password"
                                                    type={"password"}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage className="text-sm text-right font-md"/>
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="mt-4 w-full">
                                Sign In
                            </Button>
                        </form>
                    </Form>
                    {errors?.message && (
                        <Alert variant={"destructive"} className="mt-3">
                            <Icons.XCircle size={20} strokeWidth={1}/>
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>
                                {errors.message}
                            </AlertDescription>
                        </Alert>
                    )}
                </CardContent>
                <CardFooter>
                    <p className={"text-xs text-muted-foreground"}>Don't have account yet? <a className={"text-primary font-semibold"} href={"/register"}>Sign Up</a></p>
                </CardFooter>
            </Card>
        </div>
    );
}
