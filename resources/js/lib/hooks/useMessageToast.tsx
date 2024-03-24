import React, {useEffect} from "react";
import {useToast} from "@/Components/use-toast";
import {InertiaSharedProps, ResponseMessage} from "@/types/inertia";
import {ToastAction, ToastActionElement} from "@/Components/Toast";

type UseMessageToastProps = ResponseMessage;

export function useMessageToast(
    props: UseMessageToastProps
): ReturnType<typeof useToast> {
    const {errors, message} = props;
    const toasts = useToast();
    const {toast} = toasts;
    useEffect(() => {
        let errorToast: ReturnType<typeof toast>,
            messageToast: ReturnType<typeof toast>;
        if (errors?.message) {
            errorToast = toast({
                title: "Uh Oh",
                description: errors.message,
                variant: "destructive",
                action: <ToastAction altText={"close"} onClick={() => messageToast.dismiss()}>Dismiss</ToastAction>
            });
        }
        if (message) {
            messageToast = toast({
                title: "Success",
                description: message,
                action: <ToastAction altText={"close"} onClick={() => messageToast.dismiss()}>Dismiss</ToastAction>
            });
        }

        return () => {
            try {
                if (errorToast !== null) {
                    errorToast.dismiss();
                }
                if (messageToast !== null) {
                    messageToast.dismiss();
                }
            } catch (err) {
                // Do nothing
            }
        };
    }, [errors, message]);
    return toasts;
}
