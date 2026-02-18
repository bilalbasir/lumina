import blogApi from "@/app/apiServices/blogApi/BlogApi";
import { useQuery } from "@tanstack/react-query";

export const useGetAllBlogsWoPagination = () => {
    return useQuery({
        queryKey: ["all-blogs-wo-pagination"],
        queryFn: () => blogApi.getAllBlogsWoPagination(),
    });
};
