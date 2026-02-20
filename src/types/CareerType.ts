
export interface CareerType {
    _id?: string,
    jobTitle: string,
    location: string,
    shortDescription: string,
    jobDescription: string,
    jobType: string,
    department: string,
    salary: number | string,
    status: string,
    requirements?: string[],
    totalApplications?: string | number,
    responsibilities?: string[],
    benefits?: string[],
    createdAt?: string | undefined
}



export interface ApplicantType {
    _id?: string,
    candidate?: { name: string },
    career: string, // kis job ke liye apply kiya
    lastName: string,
    firstName: string,
    department: string,
    experience: string,
    linkedInProfileUrl: string,
    coverLetter: string,
    email: string, // email unique hogi per job ke liye
    phone: string,
    resume: string,
    createdAt?: string | undefined
}



export interface careerData {
    total: number
    page: number
    totalPages: number
    careers: CareerType
}