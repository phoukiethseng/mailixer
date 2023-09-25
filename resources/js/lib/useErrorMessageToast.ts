import { useEffect } from "react";
import { InertiaSharedProps } from "../config/site";
import { useToast } from "../Components/use-toast";

export function useErrorMessageToast(
    props: Partial<InertiaSharedProps>,
    toasts: ReturnType<typeof useToast>
) {
    const { errors, message } = props;
    const { toast } = toasts;
    useEffect(() => {
        let errorToast: ReturnType<typeof toast>,
            messageToast: ReturnType<typeof toast>;
        if (errors?.message) {
            errorToast = toast({
                title: "Uh Oh",
                description: errors.message,
                variant: "destructive",
            });
        }
        if (message) {
            messageToast = toast({
                description: message,
            });
        }

        return () => {
            try {
                if (errorToast !== null) {
                    errorToast.dismiss();
                }
                if (messageToast !== null) {
                    errorToast.dismiss();
                }
            } catch (err) {
                // Do nothing
            }
        };
    }, [errors, message]);
}