import {useEffect, useState} from "react";

export const useFetch = <Type, >(callback: () => Promise<Type>) => {
    const [isLoading, setIsLoading] = useState(true)
    const [response, setResponse] = useState<Type | null>(null)

    useEffect(() => {
        const fetcher = async () => {
            const responce = await callback()
            setResponse(responce)
        }

        fetcher().finally(() => setIsLoading(false))
    }, [callback]);

    return {isLoading, response}
}
