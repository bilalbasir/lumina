export type ServiceStatus = "Active" | "Inactive";

export interface ServiceType {
    id: string;
    name: string;
    category?: string;
    bannerImage?: string;
    description?: string;
    serviceSuccessRate?: string;
    status: ServiceStatus;
    features: FeatureType[]; tags?: string[];
    createdAt: string;
    updatedAt: string;
}

export interface FeatureType {
    title: string,
    description: string
}