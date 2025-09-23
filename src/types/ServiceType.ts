export type ServiceStatus = "Active" | "Inactive";

export interface ServiceType {
    id: string;
    name: string;
    category?: string;
    bannerImage?: string;
    description?: string;
    serviceSuccessRate?: string;
    status: ServiceStatus;
    features?: string[];
    tags?: string[];
    createdAt: string;
    updatedAt: string;
}