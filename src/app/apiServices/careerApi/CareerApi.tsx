import axios, { AxiosInstance } from "axios";
import { baseUrl } from "../baseUrl/BaseUrl";
import { ServiceType } from "@/types/ServiceType";
import { CareerType } from "@/types/CareerType";
import { log } from "util";
import toast from "react-hot-toast";



class CareerApi {
    private api: AxiosInstance;
    constructor() {
        this.api = axios.create({
            baseURL: `${baseUrl}/careers`,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
    async addCareer(data: CareerType) {
        try {
            const isFormData = data instanceof FormData;

            const response = await this.api.post(
                "/add-career",
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
            throw error || "Add career failed";
        }
    }

    async updateCareer(id: string, data: CareerType) {
        console.log("Id", id, "data", data);

        try {
            const isFormData = data instanceof FormData;

            const response = await this.api.put(
                `/update-career/${id}`,
                data,
                {
                    headers: {
                        "Content-Type": isFormData ? "multipart/form-data" : "application/json",
                    },
                }
            );
            console.log("update career", response);


            return response.data;
        } catch (error: unknown) {
            console.error("error", error);
            toast.error("Something went wrong")
            throw error || "update career failed";
        }
    }
    async getAllCareers(page: number = 1, search = "") {
        try {
            const response = await this.api.get("/get-all-careers", { params: { page, search } });
            return response.data;
        } catch (error: unknown) {
            console.error("error", error);
            throw error || "Fetching careers failed";

        }
    }
    async getAllCareersWoPagination() {
        try {
            const response = await this.api.get("/get-careers");
            return response.data;
        } catch (error: unknown) {
            console.error("error", error);
            throw error || "Fetching careers failed";

        }
    }
    async getCareerId(id: string) {
        try {
            const response = await this.api.get(`/get-career-id/${id}`);
            console.log("RESPONSE", response);

            return response.data;
        } catch (error: unknown) {
            console.error("error", error);
            throw error || "Fetching career failed";

        }
    }
    async getApplicantId(applicantId: any) {
        console.log("APPLICANT ID", applicantId);

        try {
            const response = await this.api.get(`/get-applicant-id/${applicantId}`);
            console.log("RESPONSE", response);

            return response.data;
        } catch (error: unknown) {
            console.error("error", error);
            throw error || "Fetching career failed";

        }
    }
    async deleteCareer(id: string) {
        try {
            const response = await this.api.delete(`/delete-career/${id}`);
            return response.data;
        } catch (error: unknown) {
            console.error("error", error);
            throw error || "Deleting career failed";

        }
    }

    //JOB APPLICATION
    async applyJob(id: string, data: any) {
        try {
            const isFormData = data instanceof FormData;

            const response = await this.api.post(
                `/${id}/apply`,
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
            throw error || "Apply job failed";
        }
    }
    async getApplicationByJob(jobId: string, currentPage: number = 1, searchTerm: string = "") {
        try {
            const response = await this.api.get(`${jobId}/allApplicantions`, {
                params: {
                    page: currentPage,
                    search: searchTerm
                }
            });

            return response.data;
        } catch (error: unknown) {
            console.error("error", error);
            throw error || "Apply job failed";
        }
    }

    async deleteApplicant(id: string) {
        try {
            const response = await this.api.delete(`/delete-applicant/${id}`);
            return response.data;
        } catch (error: unknown) {
            console.error("error", error);
            throw error || "Deleting career failed";

        }
    }
}
// Export a single instance
const careerApi = new CareerApi();
export default careerApi;

