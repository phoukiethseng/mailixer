import {UseFormReturn} from "react-hook-form";
import {InertiaSharedProps} from "@/config/site";
import useErrorBag from "./useErrorBag";
import {useEffect} from "react";

export default function useServerValidationErrorMessage<TFormData>(form: UseFormReturn<any>, errorBagName: string, props: InertiaSharedProps<Partial<TFormData>>) {
    const errorBag = useErrorBag<TFormData>(errorBagName, props);
    useEffect(() => {
        if (errorBag !== null) {
            Object.entries(errorBag).forEach(([errorFieldName, errorMessage]) => {
                // @ts-ignore
                form.setError(errorFieldName, {
                    type: "manual",
                    message: errorMessage as string
                })
            });
        }
    }, [errorBag]);
}
