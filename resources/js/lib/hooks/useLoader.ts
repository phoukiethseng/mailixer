import {useState} from "react";

export default function useLoader() {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    function load(loadFn: () => (void | Promise<void>)) {
        setIsLoading(true)
        Promise.resolve().then(() => {
            const loadFnReturn = loadFn();
            if (loadFnReturn instanceof Promise) {
                loadFnReturn.then(() => setIsLoading(false))
            } else {
                setIsLoading(false)
            }
        })
    }

    return {
        isLoading,
        load
    }
}
