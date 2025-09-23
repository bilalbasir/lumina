export type ServiceStatus = "Active" | "Inactive";

export interface LeadType {
    _id?: string;
    firstName: string,
    lastName: string,
    companyName: string,
    jobTitle: string,
    email: string,
    phoneNumber: string,
    country: string,
    help: string,
    message: string,
    regularUpdates: boolean

    createdAt?: string;
    updatedAt?: string;
}

export interface data {
    total: number
    page: number
    totalPages: number
    data: LeadType
}

export interface leadResType {
    data: data

    message: string
    statusCode: number
    success: boolean
}