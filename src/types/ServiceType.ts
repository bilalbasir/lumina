export type ServiceStatus = "Active" | "Inactive";

export interface FeatureType {
    title: string;
    description: string;
}

export interface ServiceType {
    id: string;
    name: string;
    category?: string;
    bannerImage?: string;
    secondaryImage?: string;
    description?: string;
    serviceSuccessRate?: string;
    status: ServiceStatus;
    features: FeatureType[];
    tags?: string[];
    createdAt: string;
    updatedAt: string;
}