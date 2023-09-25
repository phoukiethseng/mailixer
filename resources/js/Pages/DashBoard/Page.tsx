import React, { useEffect, useId } from "react";
import DashBoardLayout from "../../Layouts/DashBoardLayout";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../../Components/Card";
import { Separator } from "../../Components/Separator";
import { useForm, useWatch } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "../../Components/Label";
import { Textarea } from "../../Components/TextArea";
import { Button } from "../../Components/Button";
import SubscribeCard from "../../Components/SubscribeCard";
import { router, usePage } from "@inertiajs/react";
import {
    Form,
    FormDescription,
    FormField,
    FormItem,
    FormMessage,
} from "../../Components/Form";
import { InertiaSharedProps } from "../../config/site";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogTitle,
} from "../../Components/AlertDialog";
import { Input } from "../../Components/Input";
import { Icons } from "../../Components/Icons";
import { useToast } from "../../Components/use-toast";
import { useErrorMessageToast } from "../../lib/useErrorMessageToast";

const SubscribePageCustomizationFormSchema = z.object({
    description: z.string().nonempty(),
});

type PageCustomizationForm = z.infer<
    typeof SubscribePageCustomizationFormSchema
>;

type DashBoardCustomizationPageProps = {
    description: string;
    preview: {
        liveUrl: string;
    };
} & InertiaSharedProps;

const Page = ({
    description,
    preview,
    auth,
    errors,
    message,
}: DashBoardCustomizationPageProps) => {
    const toasts = useToast();
    const descriptionTextareaId = useId();
    const customizationFormId = useId();
    const descriptionText = description ?? "";
    const customizationForm = useForm<PageCustomizationForm>({
        defaultValues: {
            description: descriptionText,
        },
        resolver: zodResolver(SubscribePageCustomizationFormSchema),
    });

    useErrorMessageToast({ errors, message }, toasts);

    const viewLiveUrl = preview.liveUrl;

    const currentDescriptionText = useWatch({
        control: customizationForm.control,
        name: "description",
        defaultValue: descriptionText,
    });

    function handleDescriptionFormSubmit(data: PageCustomizationForm) {
        router.post("/dashboard/page/description", {
            user_id: auth.user.id,
            description: data.description,
        });
    }

    return (
        <div className="flex flex-col justify-start items-stretch w-full gap-2 pt-4">
            <div className="flex flex-row justify-center items-start gap-2">
                <Card className="min-w-[200px] w-[350px]">
                    <CardHeader>
                        <CardTitle>Customize</CardTitle>
                        <CardDescription>
                            Personalize your subscribe page
                        </CardDescription>
                    </CardHeader>
                    <Separator />
                    <CardContent>
                        <div className="flex flex-col gap-2 justify-start items-stretch mt-3">
                            <div className="flex flex-row justify-between items-stretch">
                                <Label
                                    htmlFor={descriptionTextareaId}
                                    className="text-base text-card-foreground font-semibold "
                                >
                                    Description
                                </Label>
                            </div>
                            <Form {...customizationForm}>
                                <form
                                    id={customizationFormId}
                                    onSubmit={customizationForm.handleSubmit(
                                        handleDescriptionFormSubmit
                                    )}
                                >
                                    <FormField
                                        name="description"
                                        control={customizationForm.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormMessage />
                                                <Textarea
                                                    {...field}
                                                    id={descriptionTextareaId}
                                                    className="min-h-[150px]"
                                                />
                                                <FormDescription className="text-xs text-muted-foreground">
                                                    This will show up on your
                                                    subscribe page
                                                </FormDescription>
                                            </FormItem>
                                        )}
                                    />
                                </form>
                            </Form>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <div className="flex flex-row justify-center">
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button
                                        disabled={
                                            descriptionText ===
                                            currentDescriptionText
                                        }
                                    >
                                        Save
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>
                                            Are you sure?
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This will overwrite your exisitng
                                            description
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>
                                            Cancel
                                        </AlertDialogCancel>
                                        <AlertDialogAction
                                            type="submit"
                                            form={customizationFormId}
                                        >
                                            Confirm
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </CardFooter>
                </Card>
                <Separator orientation="vertical" decorative />
                <Card>
                    <CardHeader>
                        <CardTitle>Preview</CardTitle>
                        <CardDescription>
                            What will you subscribe page looks like
                        </CardDescription>
                    </CardHeader>
                    <Separator />
                    <CardContent className="flex justify-center items-center pt-6">
                        <SubscribeCard
                            user={{
                                name: auth.user.name ?? "Unknown",
                            }}
                            subscribe={{
                                description: currentDescriptionText,
                            }}
                            onSubscribe={() => {}}
                        />
                    </CardContent>
                </Card>
                <Separator orientation="vertical" />
                <Card>
                    <CardHeader>
                        <CardTitle>View Live</CardTitle>
                        <CardDescription>
                            Send this link your potential subscriber
                        </CardDescription>
                    </CardHeader>
                    <Separator />
                    <CardContent className="mt-4 flex flex-row gap-2 justify-between items-center">
                        <Input
                            type="text"
                            readOnly
                            defaultValue={viewLiveUrl}
                            onClick={() => router.visit(viewLiveUrl)}
                            className="cursor-pointer"
                        />
                        <Button
                            variant={"outline"}
                            size={"icon"}
                            onClick={() => {
                                navigator.clipboard.writeText(viewLiveUrl);
                                toasts.toast({
                                    description: "Copied to clipboard",
                                });
                            }}
                        >
                            <Icons.Clipboard
                                size={20}
                                strokeWidth={1.5}
                                className="text-card-foreground w-4 h-4"
                            />
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

Page.layout = (page: React.ReactNode) => (
    <DashBoardLayout activePage="Subscribe Page">{page}</DashBoardLayout>
);

export default Page;
