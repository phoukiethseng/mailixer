import { useMemo, useState } from 'react'

export default function useLoader(delay: number = 200) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const load = useMemo(
    () => (loadFn: () => void | Promise<void>) => {
      // Transit to loading state only after specified delay time
      // So we only display loading state for slow loading operation
      const timeout = setTimeout(() => setIsLoading(true), delay)
      Promise.resolve().then(() => {
        const loadFnReturn = loadFn()
        if (loadFnReturn instanceof Promise) {
          loadFnReturn.then(() => {
            setIsLoading(false)
            clearTimeout(timeout)
          })
        } else {
          setIsLoading(false)
          clearTimeout(timeout)
        }
      })
    },
    [isLoading, setIsLoading]
  )

  return {
    isLoading,
    load,
  }
}
