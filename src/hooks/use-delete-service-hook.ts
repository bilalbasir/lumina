// hooks/use-service-hook.ts
import serviceApi from "@/app/apiServices/servicesApi/ServiceApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteService = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => serviceApi.deleteService(id),
        onSuccess: () => {
            console.log("✅ Service deleted");
            queryClient.invalidateQueries({
                queryKey: ["services"],
            });
        },
        onError: (error) => {
            console.error("❌ Error deleting service:", error);
        },
    });
};

