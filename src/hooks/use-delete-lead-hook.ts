// hooks/use-service-hook.ts
import leadsApi from "@/app/apiServices/contactLeads/ContactLeadsApi";
import serviceApi from "@/app/apiServices/servicesApi/ServiceApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useDeleteLead = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => leadsApi.deleteLead(id),
        onSuccess: () => {
            toast.success("Lead deleted Successfully");
            queryClient.invalidateQueries({
                queryKey: ["leads"],
            });
        },
        onError: (error) => {
            console.error("❌ Error deleting service:", error);
            toast.error("Something went wrong");

        },
    });
};

