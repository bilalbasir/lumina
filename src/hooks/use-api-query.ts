'use client'
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export function useApiQuery<T>(
    key: string[],
    fetchFn: () => Promise<T>
): UseQueryResult<T> {
    return useQuery({
        queryKey: key,
        queryFn: fetchFn,
    });
}
