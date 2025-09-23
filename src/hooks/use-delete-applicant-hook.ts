// hooks/use-service-hook.ts
import careerApi from "@/app/apiServices/careerApi/CareerApi";
import serviceApi from "@/app/apiServices/servicesApi/ServiceApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteApplicant = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => careerApi.deleteApplicant(id),
        onSuccess: () => {
            console.log("✅ Career deleted");
            queryClient.invalidateQueries({
                queryKey: ["applicants"],
            });
        },
        onError: (error) => {
            console.error("❌ Error deleting service:", error);
        },
    });
};

