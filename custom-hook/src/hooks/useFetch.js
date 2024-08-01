import { useState, useEffect } from "react";
export function useFetch(fetchFn, initalVal) {
    const [isFetching, setIsFetching] = useState(false);
    const [data, setData] = useState(initalVal);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            setIsFetching(true);
            try {
                const data = await fetchFn();
                setData(data);
            } catch (error) {
                setError({ message: error.message || "Failed to fetch data" });
            }
            setIsFetching(false);
        }

        fetchData();
    }, [fetchFn]);

    return { data, error, isFetching, setData };
}
