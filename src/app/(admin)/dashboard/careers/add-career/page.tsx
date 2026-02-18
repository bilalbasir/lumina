
'use client'
import DropdownField from '@/components/dropdown/DropDown'
import { HorizontalLine } from '@/components/horizontalLine/HorizontalLine'
import InputField from '@/components/inputField/InputField'
import LayoutHeader from '@/components/pages/adminSide/LayoutHeader'
import DeleteIcon from "../../../../../components/icons/deleteIcon/DeleteIcon";

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import TipTapEditor from '@/components/inputField/TipTapEditor'
import PrimaryButton from '@/components/button/PrimaryButton'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import careerApi from '@/app/apiServices/careerApi/CareerApi'
import toast from 'react-hot-toast'
import { CareerType } from '@/types/CareerType'
type FormValues = {
    jobTitle: string,
    location: string,
    shortDescription: string,
    jobDescription: string;
    jobType: string;
    department: string;
    maxSalary: string;
    minSalary: string;
    status: string;


}
const Page = () => {
    const [requirements, setRequirements] = useState<string[]>([""])
    const [requirementErrors, setRequirementErrors] = useState<boolean[]>([false])
    const [responsibilities, setResponsibilities] = useState<string[]>([""])
    const [responsibilitiesErrors, setResponsibilitiesErrors] = useState<boolean[]>([false])
    const [benifitsPerks, setBenifitsPerks] = useState<string[]>([""])
    const [benifitsPerksErrors, setBenifitsPerksErrors] = useState<boolean[]>([false])
    const navigate = useRouter()
    const { register, handleSubmit, formState: { errors }, control } = useForm<FormValues>()

    // --- Requirements Logic Starts ---

    const addNewRequirementFun = () => {
        const lastIndex = requirements.length - 1
        if (requirements[lastIndex].trim() === "") {
            // show error for last field
            const updatedErrors = [...requirementErrors]
            updatedErrors[lastIndex] = true
            setRequirementErrors(updatedErrors)
            return
        }
        setRequirements([...requirements, ""])
        setRequirementErrors([...requirementErrors, false])
    }

    // Update specific feature value
    const handleRequirementChange = (index: number, value: string) => {
        const updated = [...requirements]
        updated[index] = value
        setRequirements(updated)

        // clear error when typing
        const updatedErrors = [...requirementErrors]
        updatedErrors[index] = value.trim() === ""
        setRequirementErrors(updatedErrors)
    }

    // Delete feature
    const deleteRequirement = (index: number) => {
        if (requirements?.length === 1) {
            return;
        }

        const updated = requirements.filter((_, i) => i !== index)
        setRequirements(updated)
    }
    // --- Requirements Logic Ends ---

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


    // --- Requirements Logic Ends ---

    // --- Responsibilities Logic Starts ---


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

    // --- Responsibilities Logic End ---

    const mutation = useMutation({
        mutationFn: (FormValues: CareerType) => careerApi.addCareer(FormValues),
        onSuccess: (data) => {
            console.log("✅ career added:", data);
            toast.success("career has added successfully")
            navigate.push("/dashboard/careers")
            // reset form or show toast
        },
        onError: (error) => {
            console.error("❌ Error adding career:", error);
        },
    });
    const addCareerFun = (data: FormValues) => {
        const invalidRequirements = requirements.some(
            (f) => f.trim() === ""
        );
        const invalidResponsiability = responsibilities.some(
            (f) => f.trim() === ""
        );
        const invalidBenefits = benifitsPerks.some(
            (f) => f.trim() === ""
        );



        if (invalidRequirements) {
            toast.error("Please add all requirements before submitting");
            return;
        }
        if (invalidResponsiability) {
            toast.error("Please add all responsiability before submitting");
            return;
        }
        if (invalidBenefits) {
            toast.error("Please add all benefits and perks before submitting");
            return;
        }
        const allData = { ...data, requirements, responsibilities, benefits: benifitsPerks }
        mutation.mutate(allData);

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
                    />
                </div>
                {/* <div className='w-[100%]'>
                    <UploadFile
                        label="Banner Image"
                        name="bannerImage"
                        required
                        accept=".png,.jpg"
                        placeholder="Upload  Image."
                        register={register}
                        error={errors.bannerImage}
                    />
                </div> */}
                <div className='flex items-center justify-between w-full'>

                    <div className='w-[100%] md:w-[49%]'>

                        <DropdownField
                            label="Job Type"
                            name="jobType"
                            options={["full time", "part time", "contract"]}
                            control={control}
                            error={errors.jobType}
                            required


                        />
                    </div>
                    <div className='w-[100%] md:w-[49%]'>

                        <DropdownField
                            label="department"
                            name="department"
                            options={["HR", "Developer", "UI/UX", "Sales"]}
                            control={control}
                            error={errors.department}
                            required


                        />
                    </div>
                </div>
                <div className='w-[100%]'>

                    <div className='flex items-center justify-between w-full'>

                        <div className='w-[100%] md:w-[49%]'>

                            <InputField
                                label='Min Sallary'
                                required
                                name="minSalary"
                                placeholder="Enter min sallary"
                                register={register}
                                error={errors.minSalary}

                            />
                        </div>
                        <div className='w-[100%] md:w-[49%]'>

                            <InputField
                                label='Max Sallary'

                                required
                                name="maxSalary"
                                placeholder="Enter max sallary"
                                register={register}
                                error={errors.maxSalary}

                            />
                        </div>
                    </div>

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
                    <label
                        className="w-full capitalize text-[#131313] text-sm font-medium leading-[150%] mb-2"
                        style={{
                            fontFamily: "Onest, -apple-system, Roboto, Helvetica, sans-serif",
                        }}
                    >
                        Requirements *
                    </label>
                    {requirements.map((req, index) => (
                        <div className="w-[100%] mb-2 flex items-center justify-between" key={`req-${index}`}>
                            <input
                                value={req}
                                onChange={(e) => handleRequirementChange(index, e.target.value)}
                                className={`w-[97%] border-gray-400 border px-4 py-3 rounded ${requirementErrors[index] ? "border-red-500" : ""}`}
                                placeholder={`Enter requirement ${index + 1}`}
                            />
                            <div className="w-[2%] cursor-pointer" onClick={() => deleteRequirement(index)}>
                                <DeleteIcon width="18.5" height="19.5" />
                            </div>
                        </div>
                    ))}

                    <div className='border-[2px]  mt-4 cursor-pointer agBodyMediumGrey900  border-dashed text-center border-gray-400 px-4 py-3 rounded'
                        onClick={addNewRequirementFun}>
                        Add more Requirement *
                    </div>
                </div>
                <div className='w-[100%]'>
                    <label

                        className="w-full capitalize text-[#131313] text-sm font-medium leading-[150%] mb-2"
                        style={{
                            fontFamily: "Onest, -apple-system, Roboto, Helvetica, sans-serif",
                        }}
                    >
                        Responsibilities *
                    </label>
                    {responsibilities.map((resp, index) => (
                        <div className="w-[100%] mb-2 flex items-center justify-between" key={`resp-${index}`}>
                            <input
                                value={resp}
                                onChange={(e) => handleResponsibilitiesChange(index, e.target.value)}
                                className={`w-[97%] border-gray-400 border px-4 py-3 rounded ${responsibilitiesErrors[index] ? "border-red-500" : ""}`}
                                placeholder={`Enter responsibilities ${index + 1}`}
                            />
                            <div className="w-[2%] cursor-pointer" onClick={() => deleteResponsibilities(index)}>
                                <DeleteIcon width="18.5" height="19.5" />
                            </div>
                        </div>
                    ))}

                    <div className='border-[2px]  mt-4 cursor-pointer agBodyMediumGrey900  border-dashed text-center border-gray-400 px-4 py-3 rounded'
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
                                className={`w-[97%] border-gray-400 border px-4 py-3 rounded ${benifitsPerksErrors[index] ? "border-red-500" : ""}`}
                                placeholder={`Enter Benifits and Perks ${index + 1}`}
                            />
                            <div className="w-[2%] cursor-pointer" onClick={() => deleteBenifitsPerks(index)}>
                                <DeleteIcon width="18.5" height="19.5" />
                            </div>
                        </div>
                    ))}

                    <div className='border-[2px]  mt-4 cursor-pointer agBodyMediumGrey900  border-dashed text-center border-gray-400 px-4 py-3 rounded'
                        onClick={addBenifitsPerksFun}>
                        Add more Benifits and Perks
                    </div>
                </div>


                <div className='w-[100%] flex items-center justify-end gap-x-3'>
                    <PrimaryButton text='No, Cancel' bgColor='bg-white' textColor='text-greyscale500' py="py-2" borderColor="border-[#CCCCCC]" onClick={() => navigate.push("/dashboard/careers")} />
                    <PrimaryButton text='List Job' bgColor='bg-primaryColor' textColor='text-white' py="py-2" onClick={handleSubmit(addCareerFun)} />
                </div>
            </form>
        </>)
}

export default Page