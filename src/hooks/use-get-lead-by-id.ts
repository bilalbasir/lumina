// hooks/use-lead.ts
import { useQuery } from "@tanstack/react-query";
import leadsApi from "@/app/apiServices/contactLeads/ContactLeadsApi";

export const useGetLeadById = (id: string | null) => {
    return useQuery({
        queryKey: ["leads", id],
        queryFn: () => leadsApi.getLeadId(id!).then((res) => res.data),
        enabled: !!id, // ✅ agar id null hai to query run na ho
    });
};
