import { useApiQuery } from "./use-api-query";
import { leadResType, LeadType } from "@/types/LeadType";
import leadsApi from "@/app/apiServices/contactLeads/ContactLeadsApi";

export const useGetAllLeads = (page: number, searchTerm: string) =>
    useApiQuery<leadResType>(
        ["leads", page?.toString(), searchTerm],
        () => leadsApi?.getAllLeads(page, searchTerm),
    );

export const useGetAllLeadsWoPagination = () =>
    useApiQuery<any>(
        ["leads"],
        () => leadsApi?.getAllLeadsWoPagination(),
    );
