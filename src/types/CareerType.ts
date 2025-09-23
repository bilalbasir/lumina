
export interface CareerType {
    _id?: string,
    jobTitle: string,
    location: string,
    shortDescription: string,
    jobDescription: string,
    jobType: string,
    department: string,
    minSalary: number | string,
    maxSalary: number | string,
    status: string,
    requirements?: string[],
    responsibilities?: string[],
    benefits?: string[],
    createdAt?: string | undefined
}