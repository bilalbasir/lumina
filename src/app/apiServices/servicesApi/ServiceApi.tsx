import axios, { AxiosInstance } from "axios";
import { baseUrl } from "../baseUrl/BaseUrl";
import { ServiceType } from "@/types/ServiceType";



class ServiceApi {
    private api: AxiosInstance;
    constructor() {
        this.api = axios.create({
            baseURL: `${baseUrl}/services`,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
    async addService(data: ServiceType | FormData) {
        try {
            const isFormData = data instanceof FormData;

            const response = await this.api.post(
                "/add-service",
                data,
                {
                    headers: {
                        "Content-Type": isFormData ? "multipart/form-data" : "application/json",
                    },
                }
            );

            return response.data;
        } catch (error: unknown) {
            console.error("error", error);
            throw error || "Add service failed";
        }
    }
    async updateService(id: string, data: ServiceType | FormData) {
        try {
            const isFormData = data instanceof FormData;

            const response = await this.api.patch(
                `/update-service/${id}`,
                data,
                {
                    headers: {
                        "Content-Type": isFormData ? "multipart/form-data" : "application/json",
                    },
                }
            );

            return response.data;
        } catch (error: unknown) {
            console.error("error", error);
            throw error || "Add service failed";
        }
    }
    async getAllService(page: number = 1, search = "") {
        try {
            const response = await this.api.get("/get-all-services", { params: { page, search } });
            return response.data;
        } catch (error: unknown) {
            console.error("error", error);
            throw error || "Something went wrong";
        }
    }
    async getAllServiceWOPaginatiion() {
        try {
            const response = await this.api.get("/get-all-services-wo-pagination");
            return response.data;
        } catch (error: unknown) {
            console.error("error", error);
            throw error || "Something went wrong";
        }
    }

    async getServiceId(id: string) {
        try {
            const response = await this.api.get(`/get-service-id/${id}`);
            console.log("RESPONSE", response);

            return response.data;
        } catch (error: unknown) {
            console.error("error", error);
            throw error || "Sign up failed";

        }
    }

    async getServiceBySlug(slug: string) {
        try {
            const response = await this.api.get(`/get-service-slug/${slug}`);
            return response.data;
        } catch (error: unknown) {
            console.error("error", error);
            throw error || "Fetch service by slug failed";
        }
    }
    async deleteService(id: string) {
        try {
            const response = await this.api.delete(`/delete-service/${id}`);
            return response.data;
        } catch (error: unknown) {
            console.error("error", error);
            throw error || "Sign up failed";

        }
    }
}
// Export a single instance
const serviceApi = new ServiceApi();
export default serviceApi;

