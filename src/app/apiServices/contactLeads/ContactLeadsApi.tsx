import axios, { AxiosInstance } from "axios";
import { baseUrl } from "../baseUrl/BaseUrl";
import { LeadType } from "@/types/LeadType";



class LeadsApi {
    private api: AxiosInstance;
    constructor() {
        this.api = axios.create({
            baseURL: `${baseUrl}/contact-leads`,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
    async addContactLead(data: LeadType) {
        try {
            const isFormData = data instanceof FormData;

            const response = await this.api.post(
                "/create-lead",
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
            throw error || "Something went wrong. Try Again";
        }
    }

    async getAllLeads(page: number = 1, searchTerm: string = "") {
        try {
            const params = new URLSearchParams();
            params.append("page", page.toString());
            if (searchTerm) params.append("search", searchTerm);

            const response = await this.api.get(`/get-all-leads?${params.toString()}`);
            return response.data;
        } catch (error: unknown) {
            console.error("error", error);
            throw error || "Fetch leads failed";
        }
    }
    async getAllLeadsWoPagination() {
        try {


            const response = await this.api.get(`/get-all-leads-wo-pagination`);
            return response.data;
        } catch (error: unknown) {
            console.error("error", error);
            throw error || "Fetch leads failed";
        }
    }

    async getLeadId(id: string) {
        try {
            const response = await this.api.get(`/get-lead-by-id/${id}`);
            console.log("RESPONSE", response);

            return response.data;
        } catch (error: unknown) {
            console.error("error", error);
            throw error || "Fetching leads failed";

        }
    }
    async updateLead(id: string) {
        try {
            const response = await this.api.get(`/update-lead/${id}`);
            console.log("RESPONSE", response);

            return response.data;
        } catch (error: unknown) {
            console.error("error", error);
            throw error || "Fetching leads failed";

        }
    }
    async deleteLead(id: string) {
        try {
            const response = await this.api.delete(`/delete-lead/${id}`);
            return response.data;
        } catch (error: unknown) {
            console.error("error", error);
            throw error || "Delete lead failed";

        }
    }
}
// Export a single instance
const leadsApi = new LeadsApi();
export default leadsApi;

