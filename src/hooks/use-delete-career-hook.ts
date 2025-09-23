// hooks/use-service-hook.ts
import careerApi from "@/app/apiServices/careerApi/CareerApi";
import serviceApi from "@/app/apiServices/servicesApi/ServiceApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useDeleteCareer = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => careerApi.deleteCareer(id),
        onSuccess: () => {
            console.log("✅ Career deleted");
            toast.success("Career Deleted Sucessfully")
            queryClient.invalidateQueries({
                queryKey: ["services"],
            });
        },
        onError: (error) => {
            console.error("❌ Error deleting service:", error);
            toast.error("Something went wrong.")
        },
    });
};

