import { User } from '@/types/dto'

export type ResponseMessage<TFormValidationErrorBag = {}> = {
  message?: string
  errors: {
    message?: string
  } & TFormValidationErrorBag
}

export type InertiaSharedProps<TFormValidationErrorBag = {}> = {
  auth: {
    user: User
  }
} & ResponseMessage<TFormValidationErrorBag>
