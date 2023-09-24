import React, { useId } from "react";
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
import { InertiaSharedData } from "resources/js/config/site";

const SubscribePageCustomizationFormSchema = z.object({
    description: z.string().nonempty(),
});

type PageCustomizationForm = z.infer<
    typeof SubscribePageCustomizationFormSchema
>;

const Page = () => {
    const { props } = usePage<InertiaSharedData & { description: string }>();
    const descriptionTextareaId = useId();
    const customizationFormId = useId();
    const descriptionDefaultText = props.description ?? "";
    const customizationForm = useForm<PageCustomizationForm>({
        defaultValues: {
            description: descriptionDefaultText,
        },
        resolver: zodResolver(SubscribePageCustomizationFormSchema),
    });

    const description = useWatch({
        control: customizationForm.control,
        name: "description",
        defaultValue: descriptionDefaultText,
    });

    function handleDescriptionFormSubmit(data: PageCustomizationForm) {
        router.post("/dashboard/page/description", {
            user_id: props.auth.user.id,
            description,
        });
    }

    return (
        <div className="px-4">
            <Card>
                <CardHeader></CardHeader>
                <CardContent className="flex flex-row justify-center items-start gap-3">
                    <Card className="min-w-[450px]">
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
                                                        id={
                                                            descriptionTextareaId
                                                        }
                                                        className="min-h-[150px]"
                                                    />
                                                    <FormDescription className="text-xs text-muted-foreground">
                                                        This will show up on
                                                        your subscribe page
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
                                <Button
                                    type="submit"
                                    form={customizationFormId}
                                >
                                    Save
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>
                    <Separator orientation="vertical" decorative />
                    <Card className="min-w-[600px]">
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
                                    name: props?.auth?.user?.name ?? "Unknown",
                                }}
                                subscribe={{ description: description }}
                                onSubscribe={() => {}}
                            />
                        </CardContent>
                    </Card>
                </CardContent>
            </Card>
        </div>
    );
};

Page.layout = (page: React.ReactNode) => (
    <DashBoardLayout activePage="Subscribe Page">{page}</DashBoardLayout>
);

export default Page;
