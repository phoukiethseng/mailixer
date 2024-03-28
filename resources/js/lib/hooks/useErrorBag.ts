import { InertiaSharedProps } from '@/types/inertia'

export default function useErrorBag<TFormData = {}>(
  errorBagName: string,
  props: InertiaSharedProps<Partial<TFormData>>
): Partial<TFormData> | null {
  let errorBag = null
  Object.entries(props.errors).forEach(([key, value]) => {
    if (key === errorBagName) {
      errorBag = value
      return
    }
  })
  return errorBag as TFormData
}
