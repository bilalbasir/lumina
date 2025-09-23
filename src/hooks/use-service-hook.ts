import { ServiceType } from "@/types/ServiceType";
import { useApiQuery } from "./use-api-query";
import serviceApi from "@/app/apiServices/servicesApi/ServiceApi";

export const useGetAllServices = (page: number = 1, search: string) =>
    useApiQuery(
        ["services", page?.toString(), search], // include page in query key for caching
        () => serviceApi.getAllService(page, search)
    );
export const useGetAllServicesWoPagination = () =>
    useApiQuery(
        ["services"], // include page in query key for caching
        () => serviceApi.getAllServiceWOPaginatiion()
    );
