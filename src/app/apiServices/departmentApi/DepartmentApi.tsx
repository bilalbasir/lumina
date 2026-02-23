import axios, { AxiosInstance } from "axios";
import { baseUrl } from "../baseUrl/BaseUrl";

class DepartmentApi {
    private api: AxiosInstance;
    constructor() {
        this.api = axios.create({
            baseURL: `${baseUrl}/departments`,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    async createDepartment(name: string) {
        try {
            const response = await this.api.post("/", { name });
            return response.data;
        } catch (error: any) {
            console.error("error", error);
            throw error.response?.data?.message || "Create department failed";
        }
    }

    async getAllDepartments() {
        try {
            const response = await this.api.get("/");
            return response.data;
        } catch (error: any) {
            console.error("error", error);
            throw error.response?.data?.message || "Fetch departments failed";
        }
    }

    async deleteDepartment(id: string) {
        try {
            const response = await this.api.delete(`/${id}`);
            return response.data;
        } catch (error: any) {
            console.error("error", error);
            throw error.response?.data?.message || "Delete department failed";
        }
    }
}

// Export a single instance
const departmentApi = new DepartmentApi();
export default departmentApi;
