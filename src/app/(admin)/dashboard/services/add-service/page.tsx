
'use client'
import DropdownField from '@/components/dropdown/DropDown'
import { HorizontalLine } from '@/components/horizontalLine/HorizontalLine'
import InputField from '@/components/inputField/InputField'
import LayoutHeader from '@/components/pages/adminSide/LayoutHeader'
import UploadFile from '@/components/uploadFile/UploadFile'
import DeleteIcon from "../../../../../components/icons/deleteIcon/DeleteIcon";

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import TextArea from '@/components/inputField/TextArea'
import PrimaryButton from '@/components/button/PrimaryButton'
import TipTapEditor from '@/components/inputField/TipTapEditor'
import { useMutation } from '@tanstack/react-query'
import serviceApi from '@/app/apiServices/servicesApi/ServiceApi'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Loader from '@/components/loader/Loader'
type FormValues = {
    name: string,
    category: string,
    bannerImage: FileList;
    status: string;
    serviceSuccessRate: string
    description: string
    serviceOverView: string
    subTitle: string
}
const categories = ["Executive Training", "Design Services", "Analytics", "IT Services", "Marketing"]
const serviceRate = Array.from({ length: 100 }, (_, i) => (i + 1).toString())
const Page = () => {
    const [tags, setTags] = useState<string[]>([])
    const [features, setFeatures] = useState<{ title: string; description: string }[]>([
        { title: "", description: "" }
    ]);
    const [featureErrors, setFeatureErrors] = useState<{ title: boolean; description: boolean }[]>([
        { title: false, description: false }
    ]);
    const [tagInput, setTagInput] = useState<string>("")
    const navigate = useRouter()
    const { register, handleSubmit, formState: { errors }, control } = useForm<FormValues>()
    const [loading, setLoading] = useState(false)
    const addNewFeatureFun = () => {
        const lastIndex = features.length - 1;
        const lastFeature = features[lastIndex];

        if (lastFeature.title.trim() === "" || lastFeature.description.trim() === "") {
            const updatedErrors = [...featureErrors];
            updatedErrors[lastIndex] = {
                title: lastFeature.title.trim() === "",
                description: lastFeature.description.trim() === ""
            };
            setFeatureErrors(updatedErrors);
            return;
        }

        setFeatures([...features, { title: "", description: "" }]);
        setFeatureErrors([...featureErrors, { title: false, description: false }]);
    };

    // Update specific feature value
    const handleFeatureChange = (index: number, field: "title" | "description", value: string) => {
        const updated = [...features];
        updated[index][field] = value;
        setFeatures(updated);

        const updatedErrors = [...featureErrors];
        updatedErrors[index][field] = value.trim() === "";
        setFeatureErrors(updatedErrors);
    };

    // Delete feature
    const deleteFeature = (index: number) => {
        if (features.length === 1) return; // at least 1 feature must remain
        const updated = features.filter((_, i) => i !== index);
        const updatedErrors = featureErrors.filter((_, i) => i !== index);
        setFeatures(updated);
        setFeatureErrors(updatedErrors);
    };

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
        const invalidFeature = features.some(
            (f) => f.title.trim() === "" || f.description.trim() === ""
        );

        if (invalidFeature) {
            toast.error("Please add all features before submitting");
            return;
        }
        if (tags?.length === 0) {
            toast.error("Please add atleast one tag");
            return;
        }
        const formData = new FormData();

        formData.append("name", data.name);
        formData.append("serviceOverView", data.serviceOverView);
        formData.append("subTitle", data.subTitle);
        formData.append("category", data.category);
        formData.append("status", data.status);
        formData.append("serviceSuccessRate", data.serviceSuccessRate);
        formData.append("description", data.description);

        // banner image
        if (data.bannerImage && data.bannerImage.length > 0) {
            formData.append("bannerImage", data.bannerImage[0]);
        }


        tags.forEach(tag => formData.append("tags[]", tag));
        features.forEach(feature => {
            formData.append("features[]", JSON.stringify(feature));
        });

        mutation.mutate(formData);
    };

    return (
        <>
            {loading && <Loader />}
            <LayoutHeader heading='Add Service' />
            <HorizontalLine />
            <form action="" className='mt-6 flex flex-col items-start gap-y-8' >
                <div className='flex items-center justify-between w-full'>

                    <div className='w-[100%] md:w-[49%]'>

                        <InputField
                            label="Service Name"

                            name="name"
                            placeholder="Enter your service name"
                            register={register}
                            error={errors.name}
                            required
                        />
                    </div>
                    <div className='w-[100%] md:w-[49%]'>

                        <DropdownField
                            label="Category"
                            name="category"
                            options={categories}
                            control={control}
                            error={errors.category}
                            required


                        />
                    </div>
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
                            label="Service Over view"

                            name="serviceOverView"
                            placeholder="Enter service overview"
                            register={register}
                            error={errors.serviceOverView}
                            required
                        />
                    </div>
                </div>
                <div className='w-[100%]'>
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

                        <DropdownField
                            label="service Success Rate"
                            name="serviceSuccessRate"
                            options={serviceRate}
                            control={control}
                            error={errors.serviceSuccessRate}
                            required


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
                    <label className="block text-sm font-medium mb-1">Features *</label>

                    {features.map((feature, index) => (
                        <div key={index} className='w-[100%] flex flex-col md:flex-row items-center justify-between gap-2 mb-3'>
                            <input
                                value={feature.title}
                                onChange={(e) => handleFeatureChange(index, "title", e.target.value)}
                                className={`w-full md:w-[48%] border px-4 py-3 rounded ${featureErrors[index].title ? "border-red-500" : "border-[#E6E6E6]"}`}
                                placeholder={`Feature Title ${index + 1}`}
                            />
                            <input
                                value={feature.description}
                                onChange={(e) => handleFeatureChange(index, "description", e.target.value)}
                                className={`w-full md:w-[48%] border px-4 py-3 rounded ${featureErrors[index].description ? "border-red-500" : "border-[#E6E6E6]"}`}
                                placeholder={`Feature Description ${index + 1}`}
                            />
                            <div className='cursor-pointer ml-2' onClick={() => deleteFeature(index)}>
                                <DeleteIcon width="18.5" height="19.5" />
                            </div>
                        </div>
                    ))}

                    <div
                        className='border-[2px] mt-2 cursor-pointer border-dashed text-center border-[#E6E6E6] px-4 py-3 rounded'
                        onClick={addNewFeatureFun}
                    >
                        Add more feature
                    </div>
                </div>

                <div className="w-full mt-4">
                    <label className="block text-sm font-medium mb-1">Tags *</label>
                    <div className="flex flex-wrap gap-2 border border-[#E6E6E6] rounded px-2 py-2">

                        <input
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyDown={handleTagKeyDown}
                            className="flex-1 min-w-[120px] border-none focus:ring-0 outline-none text-sm"
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