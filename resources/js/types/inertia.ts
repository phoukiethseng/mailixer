import {User} from "@/types/DTO";

export type ResponseMessage<TFormValidationErrorBag = {}> = {
    message?: string;
    errors: {
        message?: string;
    } & TFormValidationErrorBag;
}

export type InertiaSharedProps<TFormValidationErrorBag = {}> = {
    auth: {
        user: User
    };
} & ResponseMessage<TFormValidationErrorBag>;
