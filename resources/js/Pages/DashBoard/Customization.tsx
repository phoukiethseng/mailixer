import React, {useEffect, useId, useState} from "react";
import DashBoardLayout from "@/Layouts/DashBoardLayout";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/Components/Card";
import {Separator} from "@/Components/Separator";
import {useForm, useWatch} from "react-hook-form";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Textarea} from "@/Components/TextArea";
import {Button} from "@/Components/Button";
import SubscribeCard from "../../Components/SubscribeCard";
import {router} from "@inertiajs/react";
import {Form, FormDescription, FormField, FormItem, FormLabel, FormMessage,} from "@/Components/Form";
import {QRCodeConversionOptions} from "@/config/site";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/Components/AlertDialog";
import {Input} from "@/Components/Input";
import {Icons} from "@/Components/Icons";
import {useToast} from "@/Components/use-toast";
import {useMessageToast} from "@/lib/hooks/useMessageToast";
import QRCode from "qrcode";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger} from "@/Components/Dialog";
import {useToPng} from '@hugocxl/react-to-image';

// @ts-ignore
import dataUrlToBlob from "dataurl-to-blob";

import {Switch} from "@/Components/Switch";
import {InertiaSharedProps} from "@/types/inertia";
import NewDashBoardLayout from "@/Layouts/NewDashBoardLayout";

const SubscribePageCustomizationFormSchema = z.object({
    showProfilePicture: z.boolean(),
    description: z.string().nonempty(),
});

type PageCustomizationForm = z.infer<
    typeof SubscribePageCustomizationFormSchema
>;

type DashBoardCustomizationPageProps = {
    subscribePage: {
        showProfilePicture: boolean;
        description: string;
        subscribeUrl: string;
    }
} & InertiaSharedProps;


const Page = ({
                  subscribePage,
                  auth,
                  errors,
                  message,
              }: DashBoardCustomizationPageProps) => {
    const toasts = useToast();
    const descriptionTextareaId = useId();
    const customizationFormId = useId();
    const descriptionText = subscribePage.description ?? "";
    const customizationForm = useForm<PageCustomizationForm>({
        values: {
            showProfilePicture: subscribePage.showProfilePicture,
            description: descriptionText,
        },
        resolver: zodResolver(SubscribePageCustomizationFormSchema),
    });

    useMessageToast({errors, message});

    const viewLiveUrl = subscribePage.subscribeUrl;

    const currentDescriptionText = useWatch({
        control: customizationForm.control,
        name: "description",
        defaultValue: descriptionText,
    });

    const customizationFormHasChanged =
        customizationForm.formState.isDirty;

    function handleDescriptionFormSubmit(data: PageCustomizationForm) {
        router.post("/dashboard/subscribePage", {
            user_id: auth.user.id,
            showProfilePicture: data.showProfilePicture,
            description: data.description,
        });
    }

    const [isSaveQRCodeDialogOpen, setIsSaveQRCodeDialogOpen] = useState<boolean>(false);
    const [viewLiveQRCodeImage, setViewLiveQRCodeImage] = useState<string>("");
    const [reactToPngConversionState, convertReactToPng, conversionDOMRef] = useToPng<HTMLDivElement>({
        onSuccess: async (base64EncodedImage) => {
            // Once conversion is finished, we prompt user for save location
            // @ts-ignore
            const qrCodeFileHandle = await window.showSaveFilePicker({
                types: [{
                    accept: {
                        "image/png": [".png"]
                    }
                }]
            });

            setIsSaveQRCodeDialogOpen(false);

            // Conversion result is base64 encoded format, so we have to
            // convert it to BLOB first before writing to file
            const image = dataUrlToBlob(base64EncodedImage);

            const writeStream: FileSystemWritableFileStream = await qrCodeFileHandle.createWritable();
            const writer = await writeStream.getWriter();
            await writer.write(image);
            await writer.close();
            await writeStream.close();


        }
    });

    useEffect(() => {
        // Generate QR code base on given subscribe page url
        QRCode.toDataURL(subscribePage.subscribeUrl, QRCodeConversionOptions)
            .then((qrCodeURL) => {
                setViewLiveQRCodeImage(qrCodeURL);
            });
    }, []);

    return (
        <div className="flex flex-col justify-start items-center w-full gap-2 pt-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 items-start max-w-[1300px]">
                <Card className="self-start">
                    <CardHeader>
                        <CardTitle>Customize</CardTitle>
                        <CardDescription>
                            Personalize your subscribe page
                        </CardDescription>
                    </CardHeader>
                    <Separator/>
                    <CardContent className="flex flex-col gap-2 justify-start items-stretch pt-4">

                        <Form {...customizationForm}>
                            <form
                                className={"flex flex-col gap-4"}
                                id={customizationFormId}
                                onSubmit={customizationForm.handleSubmit(
                                    handleDescriptionFormSubmit
                                )}
                            >
                                <Card>
                                    <CardContent className={"pt-2"}>
                                        <FormField name={"showProfilePicture"} render={({field}) => {
                                            return (
                                                <FormItem className={"flex flex-row gap-4 items-center"}>
                                                    <Switch checked={field.value} onCheckedChange={field.onChange}
                                                            className={""}/>
                                                    <div className={"flex flex-col justify-start items-start gap-1"}>
                                                        <FormLabel>Show Profile Picture</FormLabel>
                                                        <FormDescription>Decide whether or not you want to show picture
                                                            of
                                                            your profile in subscribe page</FormDescription>
                                                    </div>
                                                </FormItem>
                                            )
                                        }}/>
                                    </CardContent>
                                </Card>
                                <FormField
                                    name="description"
                                    control={customizationForm.control}
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormDescription className="text-xs text-muted-foreground">
                                                This will show up on your
                                                subscribe page
                                            </FormDescription>
                                            <FormMessage/>
                                            <Textarea
                                                {...field}
                                                id={descriptionTextareaId}
                                                className="min-h-[130px]"
                                            />
                                        </FormItem>
                                    )}
                                />
                            </form>
                        </Form>
                    </CardContent>
                    <CardFooter className="flex flex-row justify-start gap-2">
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button disabled={!customizationFormHasChanged}>
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
                        {customizationFormHasChanged && (
                            <Button
                                variant={"ghost"}
                                size={"icon"}
                                onClick={() =>
                                    customizationForm.reset()
                                }
                            >
                                <Icons.Undo2
                                    size={18}
                                    strokeWidth={1.5}
                                    className="text-muted-foreground"
                                />
                            </Button>
                        )}
                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Preview</CardTitle>
                        <CardDescription>
                            What will you subscribe page looks like
                        </CardDescription>
                    </CardHeader>
                    <Separator/>
                    <CardContent className="flex justify-center items-center pt-5">
                        <SubscribeCard
                            user={{
                                name: auth.user.name ?? "Unknown",
                                profilePictureUrl: auth.user.profilePictureUrl
                            }}
                            subscribePage={{
                                showProfilePicture: subscribePage.showProfilePicture,
                                description: currentDescriptionText,
                            }}
                            onSubscribe={() => {
                            }}
                        />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>View Live</CardTitle>
                        <CardDescription>
                            Send this link your potential subscriber
                        </CardDescription>
                    </CardHeader>
                    <Separator/>
                    <CardContent>
                        <div className={"flex flex-col justify-center items-stretch gap-3"}>
                            <div className="mt-4 flex flex-row gap-2 justify-between items-center">
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
                            </div>
                            <div className={"self-center flex flex-col justify-center items-center gap-1 w-[200px]"}>
                                {
                                    viewLiveQRCodeImage !== "" &&
                                    <img src={viewLiveQRCodeImage} alt={"View Live QR Code"}/>
                                }
                                <Dialog open={isSaveQRCodeDialogOpen} onOpenChange={setIsSaveQRCodeDialogOpen}>
                                    <DialogTrigger>
                                        <Button variant={"secondary"}>Save as Image</Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>
                                                Save Image
                                            </DialogTitle>
                                            <DialogDescription>
                                                Send this image to your potential subscriber
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div
                                            className={"w-full h-full p-3 gap-4 flex flex-col justify-start items-center bg-background"}>
                                            <div
                                                ref={conversionDOMRef}
                                                className="min-w-[400px] max-h-[600px] bg-primary py-7 flex flex-col justify-stretch items-center">
                                                <div
                                                    className="rounded-xl w-[85%] bg-amber-50 flex flex-col items-center justify-start pb-5"
                                                >
                                                    <h1
                                                        className="font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-[#00B88F] to-[#0092D2] text-4xl pt-5"
                                                    >
                                                        Mailixer
                                                    </h1>

                                                    <img
                                                        className="object-center object-cover self-center my-5"
                                                        src={viewLiveQRCodeImage}
                                                    />

                                                    <p className="text-slate-600 font-semibold text-lg">
                                                        Subscribe to {auth.user.name} newsletter
                                                    </p>
                                                </div>
                                            </div>
                                            <Button disabled={reactToPngConversionState.isLoading} onClick={() => {
                                                // Start react to image conversion
                                                convertReactToPng();
                                            }}>
                                                {
                                                    !reactToPngConversionState.isLoading &&
                                                    "Download"
                                                }
                                                {
                                                    reactToPngConversionState.isLoading &&
                                                    <Icons.Loader2 size={20} strokeWidth={2}
                                                                   className={"animate-spin"}/>
                                                }
                                            </Button>
                                        </div>
                                    </DialogContent>
                                </Dialog>

                            </div>
                        </div>

                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

Page.layout = (page: React.ReactNode) => (
    <NewDashBoardLayout activeSubPageName={"CustomizePage"}>{page}</NewDashBoardLayout>
);

export default Page;
