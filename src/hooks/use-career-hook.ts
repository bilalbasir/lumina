import { useApiQuery } from "./use-api-query";
import CareerApi from "@/app/apiServices/careerApi/CareerApi";
import { CareerType } from "@/types/CareerType";

export const useGetAllCareers = (page: number, search: string) =>
    useApiQuery(
        ["careers", page?.toString(), search],
        () => CareerApi?.getAllCareers(page, search)
    );

export const useGetAllCareersWoPagination = () =>
    useApiQuery<any>(
        ["careers"],
        () => CareerApi?.getAllCareersWoPagination()
    );
