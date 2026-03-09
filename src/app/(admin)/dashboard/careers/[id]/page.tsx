
'use client'
import DropdownField from '@/components/dropdown/DropDown'
import { HorizontalLine } from '@/components/horizontalLine/HorizontalLine'
import InputField from '@/components/inputField/InputField'
import LayoutHeader from '@/components/pages/adminSide/LayoutHeader'
import DeleteIcon from "../../../../../components/icons/deleteIcon/DeleteIcon";

import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import TextArea from '@/components/inputField/TextArea'
import TipTapEditor from '@/components/inputField/TipTapEditor'
import PrimaryButton from '@/components/button/PrimaryButton'
import { useParams, useRouter } from 'next/navigation'
import careerApi from '@/app/apiServices/careerApi/CareerApi'
import { CareerType } from '@/types/CareerType'
import departmentApi from '@/app/apiServices/departmentApi/DepartmentApi'
import jobTypeApi from '@/app/apiServices/jobTypeApi/JobTypeApi'
import toast from 'react-hot-toast'

type FormValues = {
    jobTitle: string,
    location: string,
    jobDescription: string;
    shortDescription: string;
    jobType: string;
    department: string;
    salary: string;
    status: string;
    requirements: string;
}

const Page = () => {
    const navigate = useRouter()
    const { register, handleSubmit, formState: { errors }, control, reset } = useForm<FormValues>({})

    const params = useParams();
    const id = params?.id as string;
    console.log("ID", id);
    const router = useRouter()

    const [responsibilities, setResponsibilities] = useState<string[]>([""])
    const [responsibilitiesErrors, setResponsibilitiesErrors] = useState<boolean[]>([false])
    const [benifitsPerks, setBenifitsPerks] = useState<string[]>([""])
    const [benifitsPerksErrors, setBenifitsPerksErrors] = useState<boolean[]>([false])

    // Department Logic
    const [departmentsList, setDepartmentsList] = useState<string[]>([])
    const [departmentsData, setDepartmentsData] = useState<any[]>([])
    const [isAddingDepartment, setIsAddingDepartment] = useState(false)
    const [newDepartmentName, setNewDepartmentName] = useState("")

    // Job Type Logic
    const [jobTypesList, setJobTypesList] = useState<string[]>([])
    const [jobTypesData, setJobTypesData] = useState<any[]>([])
    const [isAddingJobType, setIsAddingJobType] = useState(false)
    const [newJobTypeName, setNewJobTypeName] = useState("")

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const res = await departmentApi.getAllDepartments()
                const fetchedDepartments = res.data || []
                setDepartmentsData(fetchedDepartments)
                const fetchedNames = fetchedDepartments.map((d: any) => d.name)
                setDepartmentsList(fetchedNames)
            } catch (error) {
                console.error("Error fetching departments:", error)
            }
        }
        const fetchJobTypes = async () => {
            try {
                const res = await jobTypeApi.getAllJobTypes()
                const fetchedJobTypes = res.data || []
                setJobTypesData(fetchedJobTypes)
                const fetchedNames = fetchedJobTypes.map((j: any) => j.name)
                setJobTypesList(fetchedNames)
            } catch (error) {
                console.error("Error fetching job types:", error)
            }
        }
        fetchDepartments()
        fetchJobTypes()
    }, [])

    const handleAddDepartment = async () => {
        if (!newDepartmentName.trim()) return
        try {
            const res = await departmentApi.createDepartment(newDepartmentName.trim())
            setDepartmentsList(prev => [...prev, res.data.name])
            setDepartmentsData(prev => [...prev, res.data])
            setNewDepartmentName("")
            setIsAddingDepartment(false)
            toast.success("Department added successfully")
        } catch (error: any) {
            toast.error(error || "Failed to add department")
        }
    }

    const handleDeleteDepartment = async (optionName: string) => {
        const dept = departmentsData.find((d: any) => d.name === optionName)
        if (!dept) {
            toast.error("Cannot delete default department")
            return
        }
        try {
            await departmentApi.deleteDepartment(dept._id)
            setDepartmentsList(prev => prev.filter(d => d !== optionName))
            setDepartmentsData(prev => prev.filter((d: any) => d._id !== dept._id))
            toast.success("Department deleted successfully")
        } catch (error: any) {
            toast.error(error || "Failed to delete department")
        }
    }

    const handleAddJobType = async () => {
        if (!newJobTypeName.trim()) return
        try {
            const res = await jobTypeApi.createJobType(newJobTypeName.trim())
            setJobTypesList(prev => [...prev, res.data.name])
            setJobTypesData(prev => [...prev, res.data])
            setNewJobTypeName("")
            setIsAddingJobType(false)
            toast.success("Job Type added successfully")
        } catch (error: any) {
            toast.error(error || "Failed to add job type")
        }
    }

    const handleDeleteJobType = async (optionName: string) => {
        const jt = jobTypesData.find((j: any) => j.name === optionName)
        if (!jt) {
            toast.error("Cannot delete default job type")
            return
        }
        try {
            await jobTypeApi.deleteJobType(jt._id)
            setJobTypesList(prev => prev.filter(j => j !== optionName))
            setJobTypesData(prev => prev.filter((j: any) => j._id !== jt._id))
            toast.success("Job Type deleted successfully")
        } catch (error: any) {
            toast.error(error || "Failed to delete job type")
        }
    }

    // --- Responsibilities Logic Starts ---


    const addNewResponsibilitiesFun = () => {
        const lastIndex = responsibilities.length - 1
        if (responsibilities[lastIndex].trim() === "") {
            // show error for last field
            const updatedErrors = [...responsibilitiesErrors]
            updatedErrors[lastIndex] = true
            setResponsibilitiesErrors(updatedErrors)
            return
        }
        setResponsibilities([...responsibilities, ""])
        setResponsibilitiesErrors([...responsibilitiesErrors, false])
    }

    // Update specific  value
    const handleResponsibilitiesChange = (index: number, value: string) => {
        const updated = [...responsibilities]
        updated[index] = value
        setResponsibilities(updated)

        // clear error when typing
        const updatedErrors = [...responsibilitiesErrors]
        updatedErrors[index] = value.trim() === ""
        setResponsibilitiesErrors(updatedErrors)
    }

    // Delete 
    const deleteResponsibilities = (index: number) => {
        if (responsibilities?.length === 1) {
            return;
        }

        const updated = responsibilities.filter((_, i) => i !== index)
        setResponsibilities(updated)
    }

    // --- Responsibilities Logic End ---

    // --- Benefits Logic Starts ---


    const addBenifitsPerksFun = () => {
        const lastIndex = benifitsPerks.length - 1
        if (benifitsPerks[lastIndex].trim() === "") {
            // show error for last field
            const updatedErrors = [...benifitsPerksErrors]
            updatedErrors[lastIndex] = true
            setBenifitsPerksErrors(updatedErrors)
            return
        }
        setBenifitsPerks([...benifitsPerks, ""])
        setBenifitsPerksErrors([...benifitsPerksErrors, false])
    }

    // Update specific  value
    const handleBenifitsPerksChange = (index: number, value: string) => {
        const updated = [...benifitsPerks]
        updated[index] = value
        setBenifitsPerks(updated)

        // clear error when typing
        const updatedErrors = [...benifitsPerksErrors]
        updatedErrors[index] = value.trim() === ""
        setBenifitsPerksErrors(updatedErrors)
    }

    // Delete 
    const deleteBenifitsPerks = (index: number) => {
        if (benifitsPerks?.length === 1) {
            return;
        }

        const updated = benifitsPerks.filter((_, i) => i !== index)
        setBenifitsPerks(updated)
    }

    // --- Benefits Logic Ends ---






    // ✅ Fetch career by ID
    useEffect(() => {
        if (!id) return;

        const fetchCareer = async () => {
            try {
                const res = await careerApi.getCareerId(id);
                const data = res.data;

                reset({
                    jobTitle: data.jobTitle,
                    jobDescription: data.jobDescription,
                    status: data.status,
                    shortDescription: data.shortDescription,
                    salary: data.salary,
                    location: data?.location,
                    jobType: data?.jobType,
                    department: data?.department,
                    requirements: data.requirements || "",
                });

                setResponsibilities(data.responsibilities?.length ? data.responsibilities : [""])
                setResponsibilitiesErrors(new Array(data.responsibilities?.length || 1).fill(false))

                setBenifitsPerks(data.benefits?.length ? data.benefits : [""])
                setBenifitsPerksErrors(new Array(data.benefits?.length || 1).fill(false))
            } catch (err) {
                console.error("❌ Error fetching career:", err);
            }
        };

        fetchCareer();
    }, [id, reset]);

    const updateCareerFun = async (data: FormValues) => {
        const validResponsibilities = responsibilities.filter((f) => f.trim() !== "");
        const validBenefits = benifitsPerks.filter((f) => f.trim() !== "");

        const allData: CareerType = {
            ...data,
            responsibilities: validResponsibilities,
            benefits: validBenefits
        }

        await careerApi.updateCareer(id, allData);
        toast.success("Career has updated successfully")
        router.push("/dashboard/careers");
    }
    return (
        <>
            <LayoutHeader heading='List New Job' />
            <HorizontalLine />
            <form action="" className='mt-6 flex flex-col items-start gap-y-8' >
                <div className='flex items-center justify-between w-full'>

                    <div className='w-[100%] md:w-[49%]'>

                        <InputField
                            label="Job Title"

                            name="jobTitle"
                            placeholder="Enter your jobTitle"
                            register={register}
                            error={errors.jobTitle}
                            required
                        />
                    </div>
                    <div className='w-[100%] md:w-[49%]'>

                        <InputField
                            label="Location"

                            name="location"
                            placeholder="Enter your location"
                            register={register}
                            error={errors.location}
                            required
                        />
                    </div>
                </div>
                <div className='w-[100%]'>
                    <TipTapEditor
                        label="Job description"
                        name="jobDescription"
                        required
                        placeholder="Write description"
                        control={control}
                        error={errors.jobDescription}
                        maxLength={4000}
                        height="150px"
                    />
                </div>
                <div className='w-[100%]'>
                    <TipTapEditor
                        label="Job Short description"
                        name="shortDescription"
                        required
                        placeholder="Write short job description"
                        control={control}
                        error={errors.shortDescription}
                        maxLength={150}
                        height="150px"
                    />
                </div>

                <div className='flex items-center justify-between w-full'>

                    <div className='w-[100%] md:w-[49%]'>
                        {!isAddingJobType ? (
                            <div className="flex items-center gap-2">
                                <DropdownField
                                    label="Job Type"
                                    name="jobType"
                                    options={jobTypesList}
                                    control={control}
                                    error={errors.jobType}
                                    required
                                    onDelete={handleDeleteJobType}
                                    deletableOptions={jobTypesData.map((j: any) => j.name)}
                                    placeholder="Add Job Type"
                                />
                                <div className='flex items-center justify-center border border-[#E6E6E6] rounded-md w-11 h-11 mt-[30px] hover:bg-primaryColor/10 cursor-pointer'>
                                    <button
                                        type="button"
                                        onClick={() => setIsAddingJobType(true)}
                                        className="text-primaryColor text-2xl font-bold cursor-pointer"
                                        title="Add New Job Type"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-2 w-full">
                                <label className="text-sm font-medium text-[#131313]">New Job Type</label>
                                <div className="flex items-center gap-2">
                                    <input
                                        className="flex-1 h-11 px-4 py-3 rounded border-[1.5px] border-[#E6E6E6] outline-none focus:border-[#00634F] text-sm text-[#131313]"
                                        placeholder="Enter job type name"
                                        value={newJobTypeName}
                                        onChange={(e) => setNewJobTypeName(e.target.value)}
                                        style={{
                                            fontFamily: "Onest, -apple-system, Roboto, Helvetica, sans-serif",
                                        }}
                                    />
                                    <button
                                        type="button"
                                        onClick={handleAddJobType}
                                        className="bg-primaryColor text-white px-4 py-2 rounded text-sm h-11"
                                    >
                                        Save
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setIsAddingJobType(false)}
                                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded text-sm h-11"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className='w-[100%] md:w-[49%]'>
                        {!isAddingDepartment ? (
                            <div className="flex items-center gap-2">
                                <DropdownField
                                    label="Department"
                                    name="department"
                                    options={departmentsList}
                                    control={control}
                                    error={errors.department}
                                    required
                                    onDelete={handleDeleteDepartment}
                                    deletableOptions={departmentsData.map((d: any) => d.name)}
                                    placeholder="Add Department"
                                />
                                <div className='flex items-center justify-center border border-[#E6E6E6] rounded-md w-11 h-11 mt-[30px] hover:bg-primaryColor/10 cursor-pointer'>
                                    <button
                                        type="button"
                                        onClick={() => setIsAddingDepartment(true)}
                                        className="text-primaryColor text-2xl font-bold cursor-pointer"
                                        title="Add New Department"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-2 w-full">
                                <label className="text-sm font-medium text-[#131313]">New Department</label>
                                <div className="flex items-center gap-2">
                                    <input
                                        className="flex-1 h-11 px-4 py-3 rounded border-[1.5px] border-[#E6E6E6] outline-none focus:border-[#00634F] text-sm text-[#131313]"
                                        placeholder="Enter department name"
                                        value={newDepartmentName}
                                        onChange={(e) => setNewDepartmentName(e.target.value)}
                                        style={{
                                            fontFamily: "Onest, -apple-system, Roboto, Helvetica, sans-serif",
                                        }}
                                    />
                                    <button
                                        type="button"
                                        onClick={handleAddDepartment}
                                        className="bg-primaryColor text-white px-4 py-2 rounded text-sm h-11"
                                    >
                                        Save
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setIsAddingDepartment(false)}
                                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded text-sm h-11"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className='w-[100%]'>
                    <InputField
                        label='Salary'
                        required
                        name="salary"
                        placeholder="Enter salary"
                        register={register}
                        error={errors.salary}
                    />
                </div>
                <div className='w-[100%]'>

                    <DropdownField
                        label="Status"
                        name="status"
                        options={["Open", "Closed"]}
                        control={control}
                        error={errors.status}
                        required


                    />
                </div>
                <div className='w-[100%]'>
                    <TipTapEditor
                        label="Requirements"
                        name="requirements"
                        placeholder="Write requirements"
                        control={control}
                        error={errors.requirements}
                        maxLength={4000}
                        height="150px"
                    />
                </div>
                <div className='w-[100%]'>
                    <label

                        className="w-full capitalize text-[#131313] text-sm font-medium leading-[150%] mb-2"
                        style={{
                            fontFamily: "Onest, -apple-system, Roboto, Helvetica, sans-serif",
                        }}
                    >
                        Responsibilities
                    </label>
                    {responsibilities.map((resp, index) => (
                        <div className="w-[100%] mb-2 flex items-center justify-between" key={`resp-${index}`}>
                            <input
                                value={resp}
                                onChange={(e) => handleResponsibilitiesChange(index, e.target.value)}
                                className={`w-[97%] border px-4 text-black py-3 rounded ${responsibilitiesErrors[index] ? "border-red-500" : "border-[#E6E6E6]"}`}
                                placeholder={`Enter responsibilities ${index + 1}`}
                            />
                            <div className="w-[2%] cursor-pointer" onClick={() => deleteResponsibilities(index)}>
                                <DeleteIcon width="18.5" height="19.5" />
                            </div>
                        </div>
                    ))}

                    <div className='border-[2px]  mt-4 cursor-pointer agBodyMediumGrey900  border-dashed text-center border-[#E6E6E6] px-4 py-3 rounded'
                        onClick={addNewResponsibilitiesFun}>
                        Add more Responsibility
                    </div>
                </div>

                <div className='w-[100%]'>
                    <label
                        className="w-full mb-2 capitalize text-[#131313] text-sm font-medium leading-[150%]"
                        style={{
                            fontFamily: "Onest, -apple-system, Roboto, Helvetica, sans-serif",
                        }}
                    >
                        Benifits & Perks
                    </label>
                    {benifitsPerks.map((perk, index) => (
                        <div className="w-[100%] mb-2 flex items-center justify-between" key={`perk-${index}`}>
                            <input
                                value={perk}
                                onChange={(e) => handleBenifitsPerksChange(index, e.target.value)}
                                className={`w-[97%] border px-4 text-black py-3 rounded ${benifitsPerksErrors[index] ? "border-red-500" : "border-[#E6E6E6]"}`}
                                placeholder={`Enter Benifits and Perks ${index + 1}`}
                            />
                            <div className="w-[2%] cursor-pointer" onClick={() => deleteBenifitsPerks(index)}>
                                <DeleteIcon width="18.5" height="19.5" />
                            </div>
                        </div>
                    ))}

                    <div className='border-[2px]  mt-4 cursor-pointer agBodyMediumGrey900  border-dashed text-center border-[#E6E6E6] px-4 py-3 rounded'
                        onClick={addBenifitsPerksFun}>
                        Add more Benifits and Perks
                    </div>
                </div>


                <div className='w-[100%] flex items-center justify-end gap-x-3'>
                    <PrimaryButton type='button' text='No, Cancel' bgColor='bg-white' textColor='text-greyscale500' py="py-2" borderColor="border-[#CCCCCC]" onClick={() => navigate.push("/dashboard/careers")} />
                    <PrimaryButton text='Update Job' bgColor='bg-primaryColor' textColor='text-white' py="py-2" onClick={handleSubmit(updateCareerFun)} />
                </div>
            </form>
        </>)
}

export default Page