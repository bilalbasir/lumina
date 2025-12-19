import axios, { AxiosInstance } from "axios";
import { baseUrl } from "../baseUrl/BaseUrl";
import toast from "react-hot-toast";

class BlogApi {
    private api: AxiosInstance;
    constructor() {
        this.api = axios.create({
            baseURL: `${baseUrl}/blogs`,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    async addBlog(data: FormData) {
        try {
            const response = await this.api.post(
                "/add-blog",
                data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            return response.data;
        } catch (error: any) {
            console.error("error", error);
            const message = error.response?.data?.message || "Add blog failed";
            toast.error(message);
            throw error;
        }
    }

    async getAllBlogs(page: number = 1, search = "") {
        try {
            const response = await this.api.get("/get-all-blogs", { params: { page, search } });
            return response.data;
        } catch (error: unknown) {
            console.error("error", error);
            throw error;
        }
    }

    async getBlogId(id: string) {
        try {
            const response = await this.api.get(`/get-blog-by-id/${id}`);
            return response.data;
        } catch (error: unknown) {
            console.error("error", error);
            throw error;
        }
    }

    async getBlogBySlug(slug: string) {
        try {
            const response = await this.api.get(`/get-blog-by-slug/${slug}`);
            return response.data;
        } catch (error: unknown) {
            console.error("error", error);
            throw error;
        }
    }

    async updateBlog(id: string, data: FormData) {
        try {
            const response = await this.api.put(
                `/${id}`,
                data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            return response.data;
        } catch (error: any) {
            console.error("error", error);
            const message = error.response?.data?.message || "Update blog failed";
            toast.error(message);
            throw error;
        }
    }

    async deleteBlog(id: string) {
        try {
            const response = await this.api.delete(`/delete-blog/${id}`);
            return response.data;
        } catch (error: unknown) {
            console.error("error", error);
            throw error;
        }
    }
}

const blogApi = new BlogApi();
export default blogApi;
