'use client'
import DropdownField from '@/components/dropdown/DropDown'
import { HorizontalLine } from '@/components/horizontalLine/HorizontalLine'
import InputField from '@/components/inputField/InputField'
import LayoutHeader from '@/components/pages/adminSide/LayoutHeader'
import UploadFile from '@/components/uploadFile/UploadFile'
import DeleteIcon from "../../../../../components/icons/deleteIcon/DeleteIcon";

import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import TextArea from '@/components/inputField/TextArea'
import PrimaryButton from '@/components/button/PrimaryButton'
import TipTapEditor from '@/components/inputField/TipTapEditor'
import { useMutation } from '@tanstack/react-query'
import serviceApi from '@/app/apiServices/servicesApi/ServiceApi'
import categoryApi from '@/app/apiServices/categoryApi/CategoryApi'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Loader from '@/components/loader/Loader'

type FormValues = {
    name: string;
    bannerImage: FileList;
    secondaryImage: FileList;
    status: string;
    serviceSuccessRate: string;
    description: string;
    serviceOverView: string;
    subTitle: string;
    seoTitle: string;
    seoDescription: string;
}



const Page = () => {
    const [tags, setTags] = useState<string[]>([])
    const [tagInput, setTagInput] = useState<string>("")
    const navigate = useRouter()
    const { register, handleSubmit, formState: { errors }, control } = useForm<FormValues>()
    const [loading, setLoading] = useState(false)

    const [features, setFeatures] = useState<{ title: string, description: string }[]>([{ title: "", description: "" }])
    const [featuresErrors, setFeaturesErrors] = useState<{ title: boolean, description: boolean }[]>([{ title: false, description: false }])

    // --- Features logic ---
    const addFeature = () => {
        const lastIndex = features.length - 1
        if (features[lastIndex].title.trim() === "" || features[lastIndex].description.trim() === "") {
            const updatedErrors = [...featuresErrors]
            updatedErrors[lastIndex] = {
                title: features[lastIndex].title.trim() === "",
                description: features[lastIndex].description.trim() === ""
            }
            setFeaturesErrors(updatedErrors)
            return
        }
        setFeatures([...features, { title: "", description: "" }])
        setFeaturesErrors([...featuresErrors, { title: false, description: false }])
    }

    const removeFeature = (index: number) => {
        setFeatures(features.filter((_, i) => i !== index))
        setFeaturesErrors(featuresErrors.filter((_, i) => i !== index))
    }

    const handleFeatureChange = (index: number, field: 'title' | 'description', value: string) => {
        const updatedFeatures = [...features]
        updatedFeatures[index][field] = value
        setFeatures(updatedFeatures)

        const updatedErrors = [...featuresErrors]
        updatedErrors[index][field] = value.trim() === ""
        setFeaturesErrors(updatedErrors)
    }

    // --- Tags Logic ---
    const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault()
            if (tagInput?.trim() === "") return
            if (!tags?.includes(tagInput.trim())) {
                setTags([...tags, tagInput.trim()])
            }
            setTagInput("")
        }
    }

    const removeTag = (tag: string) => {
        setTags(tags.filter(t => t !== tag))
    }

    const mutation = useMutation({
        mutationFn: (formData: FormData) => serviceApi.addService(formData),
        onMutate: () => { setLoading(true) },
        onSuccess: (data) => {
            console.log("✅ Service added:", data);
            toast.success("Service has added successfully")
            navigate.push("/dashboard/services")
            // reset form or show toast
        },
        onError: (error) => {
            console.error("❌ Error adding service:", error);
        },
        onSettled: () => { setLoading(false) },

    });

    const addServiceFun = (data: FormValues) => {
        if (tags?.length === 0) {
            toast.error("Please add atleast one tag");
            return;
        }
        const formData = new FormData();

        formData.append("name", data.name);
        formData.append("serviceOverView", data.serviceOverView);
        formData.append("subTitle", data.subTitle);
        formData.append("status", data.status);
        formData.append("serviceSuccessRate", data.serviceSuccessRate);
        formData.append("description", data.description);
        formData.append("seoTitle", data.seoTitle || "");
        formData.append("seoDescription", data.seoDescription || "");

        // Features mapping
        features.forEach((feature) => {
            formData.append("features", JSON.stringify(feature));
        });

        // banner image
        if (data.bannerImage && data.bannerImage.length > 0) {
            formData.append("bannerImage", data.bannerImage[0]);
        }

        // secondary image (content image)
        if (data.secondaryImage && data.secondaryImage.length > 0) {
            formData.append("secondaryImage", data.secondaryImage[0]);
        }


        tags.forEach(tag => formData.append("tags", tag));

        mutation.mutate(formData);
    };

    return (
        <>
            {loading && <Loader />}
            <LayoutHeader heading='Add Service' />
            <HorizontalLine />
            <form action="" className='mt-6 flex flex-col items-start gap-y-8' >
                <div className='w-[100%]'>

                    <InputField
                        label="Service Name"

                        name="name"
                        placeholder="Enter your service name"
                        register={register}
                        error={errors.name}
                        required
                    />
                </div>
                <div className='flex items-center justify-between w-full'>

                    <div className='w-[100%] md:w-[49%]'>

                        <InputField
                            label="Service Sub Title"
                            name="subTitle"
                            placeholder="Enter service sub title"
                            register={register}
                            error={errors.subTitle}
                            required
                        />
                    </div>
                    <div className='w-[100%] md:w-[49%]'>

                        <InputField
                            label="Content Title"
                            name="serviceOverView"
                            placeholder="Enter service overview"
                            register={register}
                            error={errors.serviceOverView}
                            required
                        />
                    </div>
                </div>
                <div className='flex items-center justify-between w-full'>
                    <div className='w-[100%] md:w-[49%]'>
                        <UploadFile
                            label="Banner Image"
                            name="bannerImage"
                            required
                            accept=".png,.jpg"
                            placeholder="Upload Service Banner Image."
                            register={register}
                            error={errors.bannerImage}
                        />
                    </div>
                    <div className='w-[100%] md:w-[49%]'>
                        <UploadFile
                            label="Content Image"
                            name="secondaryImage"
                            required
                            accept=".png,.jpg"
                            placeholder="Upload Service Content Image."
                            register={register}
                            error={errors.secondaryImage}
                        />
                    </div>
                </div>

                <div className='w-[100%]'>
                    <TipTapEditor
                        label="description"
                        name="description"
                        required
                        placeholder="Write description"
                        control={control}
                        error={errors.description}
                    />
                </div>
                <div className='flex items-center justify-between w-full'>

                    <div className='w-[100%] md:w-[49%]'>

                        <InputField
                            label="Service Success Rate"
                            name="serviceSuccessRate"
                            type="number"
                            placeholder="0 - 100"
                            register={register}
                            error={errors.serviceSuccessRate}
                            required
                            min={0}
                            max={100}
                        />
                    </div>
                    <div className='w-[100%] md:w-[49%]'>

                        <DropdownField
                            label="status"
                            name="status"
                            options={["Active", "Inactive"]}
                            control={control}
                            error={errors.status}
                            required


                        />
                    </div>
                </div>
                <div className='w-[100%] mt-4'>
                    <label className="w-full capitalize text-[#131313] text-sm font-medium leading-[150%] mb-2">
                        Features *
                    </label>
                    {features.map((feature, index) => (
                        <div key={index} className="flex flex-col gap-2 mb-4 p-4 border border-gray-200 rounded">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-semibold text-black">Feature {index + 1}</span>
                                {features.length > 1 && (
                                    <button type="button" onClick={() => removeFeature(index)}>
                                        <DeleteIcon width="18" height="18" />
                                    </button>
                                )}
                            </div>
                            <input
                                className={`w-full border px-4 py-2 rounded text-sm text-black ${featuresErrors[index].title ? 'border-red-500' : 'border-[#E6E6E6]'}`}
                                placeholder="Feature Title"
                                value={feature.title}
                                onChange={(e) => handleFeatureChange(index, 'title', e.target.value)}
                            />
                            <textarea
                                className={`w-full border px-4 py-2 rounded text-sm text-black h-20 ${featuresErrors[index].description ? 'border-red-500' : 'border-[#E6E6E6]'}`}
                                placeholder="Feature Description"
                                value={feature.description}
                                onChange={(e) => handleFeatureChange(index, 'description', e.target.value)}
                            />
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addFeature}
                        className="w-full border-2 border-dashed border-[#E6E6E6] py-3 rounded text-sm text-gray-500 hover:bg-gray-50"
                    >
                        + Add More Feature
                    </button>
                </div>

                {/* SEO Settings */}
                <div className="flex flex-col w-full gap-y-8 mt-4">
                    <LayoutHeader heading='SEO Settings' />
                    <InputField
                        label="Meta Title"
                        name="seoTitle"
                        placeholder="SEO optimized title"
                        register={register}
                        error={errors.seoTitle}
                    />
                    <TipTapEditor
                        label="Meta Description"
                        name="seoDescription"
                        placeholder="Brief description for search engines"
                        control={control}
                        error={errors.seoDescription}
                        maxLength={155}
                    />
                </div>

                <div className="w-full mt-4">
                    <label
                        className="w-full capitalize text-[#131313] text-sm font-medium leading-[150%] mb-2"
                        style={{
                            fontFamily: "Onest, -apple-system, Roboto, Helvetica, sans-serif",
                        }}
                    >
                        Tags *
                    </label>
                    <div className="flex flex-wrap gap-2 border border-gray-400 rounded px-2 py-2">

                        <input
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyDown={handleTagKeyDown}
                            className="flex-1 min-w-[120px] border-none focus:ring-0 outline-none text-sm text-[#131313]"
                            placeholder="Type and press Enter"
                        />
                    </div>
                    <div className='flex items-center gap-x-3 mt-4'>
                        {tags.map((tag, idx) => (
                            <span
                                key={idx}
                                className="bg-[#00634F] w-auto text-white text-sm px-3 py-1 rounded-full flex items-center gap-2"
                            >
                                {tag}
                                <button
                                    type="button"
                                    onClick={() => removeTag(tag)}
                                    className="text-white hover:text-red-300 cursor-pointer"
                                >
                                    ✕
                                </button>
                            </span>
                        ))}
                    </div>
                </div>
                <div className='w-[100%] flex items-center justify-end gap-x-3'>
                    <PrimaryButton text='No, Cancel' bgColor='bg-white' textColor='text-greyscale500' py="py-2" type='button' borderColor="border-[#CCCCCC]" onClick={() => navigate.push("/dashboard/services")} />
                    <PrimaryButton text='Add Service' bgColor='bg-primaryColor' textColor='text-white' py="py-2" onClick={handleSubmit(addServiceFun)} />
                </div>
            </form>
        </>)
}

export default Page