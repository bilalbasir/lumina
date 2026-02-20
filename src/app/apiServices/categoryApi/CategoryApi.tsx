import axios, { AxiosInstance } from "axios";
import { baseUrl } from "../baseUrl/BaseUrl";

class CategoryApi {
    private api: AxiosInstance;
    constructor() {
        this.api = axios.create({
            baseURL: `${baseUrl}/categories`,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    async createCategory(name: string) {
        try {
            const response = await this.api.post("/", { name });
            return response.data;
        } catch (error: any) {
            console.error("error", error);
            throw error.response?.data?.message || "Create category failed";
        }
    }

    async getAllCategories() {
        try {
            const response = await this.api.get("/");
            return response.data;
        } catch (error: any) {
            console.error("error", error);
            throw error.response?.data?.message || "Fetch categories failed";
        }
    }
}

// Export a single instance
const categoryApi = new CategoryApi();
export default categoryApi;
