import axios, { AxiosInstance } from "axios";
import { baseUrl } from "../baseUrl/BaseUrl";

class JobTypeApi {
    private api: AxiosInstance;
    constructor() {
        this.api = axios.create({
            baseURL: `${baseUrl}/job-types`,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    async createJobType(name: string) {
        try {
            const response = await this.api.post("/", { name });
            return response.data;
        } catch (error: any) {
            console.error("error", error);
            throw error.response?.data?.message || "Create job type failed";
        }
    }

    async getAllJobTypes() {
        try {
            const response = await this.api.get("/");
            return response.data;
        } catch (error: any) {
            console.error("error", error);
            throw error.response?.data?.message || "Fetch job types failed";
        }
    }

    async deleteJobType(id: string) {
        try {
            const response = await this.api.delete(`/${id}`);
            return response.data;
        } catch (error: any) {
            console.error("error", error);
            throw error.response?.data?.message || "Delete job type failed";
        }
    }
}

// Export a single instance
const jobTypeApi = new JobTypeApi();
export default jobTypeApi;
