"use client";

import DropdownField from "@/components/dropdown/DropDown";
import { HorizontalLine } from "@/components/horizontalLine/HorizontalLine";
import InputField from "@/components/inputField/InputField";
import LayoutHeader from "@/components/pages/adminSide/LayoutHeader";
import UploadFile from "@/components/uploadFile/UploadFile";
import DeleteIcon from "../../../../../components/icons/deleteIcon/DeleteIcon";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import TextArea from "@/components/inputField/TextArea";
import PrimaryButton from "@/components/button/PrimaryButton";
import { useRouter, useParams } from "next/navigation";
import serviceApi from "@/app/apiServices/servicesApi/ServiceApi";

type FormValues = {
    name: string;
    category: string;
    bannerImage: FileList;
    status: string;
    serviceSuccessRate: string;
    description: string;
    serviceOverView: string
    subTitle: string
};

const categories = [
    "Executive Training",
    "Design Services",
    "Analytics",
    "IT Services",
    "Marketing",
];

const Page = () => {
    const [tags, setTags] = useState<string[]>([]);
    const [features, setFeatures] = useState<{ title: string; description: string }[]>([
        { title: "", description: "" },
    ]);
    const [featureErrors, setFeatureErrors] = useState<{ title: boolean; description: boolean }[]>([
        { title: false, description: false },
    ]);

    const [tagInput, setTagInput] = useState<string>("");
    const [loading, setLoading] = useState(true);

    const router = useRouter();
    const params = useParams();
    const id = params?._id as string;
    console.log("ID", id);

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        reset,
    } = useForm<FormValues>();

    // ✅ Fetch service by ID
    useEffect(() => {
        if (!id) return;

        const fetchService = async () => {
            try {
                const res = await serviceApi.getServiceId(id);
                const data = res.data;

                reset({
                    name: data.name,
                    category: data.category,
                    status: data.status,
                    serviceSuccessRate: data.serviceSuccessRate,
                    description: data.description,
                    serviceOverView: data.serviceOverView,
                    subTitle: data.subTitle,
                });

                setTags(data.tags || []);
                setFeatures(data.features && data.features.length > 0 ? data.features : [""]);
                setFeatureErrors(
                    new Array(data.features?.length || 1).fill(false)
                );
            } catch (err) {
                console.error("❌ Error fetching service:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchService();
    }, [id, reset]);

    // ✅ Update Service
    const onSubmit = async (data: FormValues) => {
        try {
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("category", data.category);
            formData.append("status", data.status);
            formData.append("serviceSuccessRate", data.serviceSuccessRate);
            formData.append("description", data.description);
            formData.append("serviceOverView", data.serviceOverView);
            formData.append("subTitle", data.subTitle);

            if (data.bannerImage?.[0]) {
                formData.append("bannerImage", data.bannerImage[0]);
            }

            features.forEach((f) => {
                formData.append("features[]", JSON.stringify(f));
            });
            tags.forEach((t, idx) => {
                formData.append(`tags[${idx}]`, t);
            });

            const res = await serviceApi.updateService(id, formData);

            console.log("✅ Updated:", res.data);
            router.push("/dashboard/services");
        } catch (err) {
            console.error("❌ Error updating service:", err);
        }
    };

    // --- Feature Logic ---

    const addNewFeatureFun = () => {
        const last = features[features.length - 1];
        if (!last.title.trim() || !last.description.trim()) {
            const updatedErrors = [...featureErrors];
            updatedErrors[features.length - 1] = {
                title: !last.title.trim(),
                description: !last.description.trim(),
            };
            setFeatureErrors(updatedErrors);
            return;
        }
        setFeatures([...features, { title: "", description: "" }]);
        setFeatureErrors([...featureErrors, { title: false, description: false }]);
    };

    const deleteFeature = (index: number) => {
        if (features.length === 1) return;
        setFeatures(features.filter((_, i) => i !== index));
        setFeatureErrors(featureErrors.filter((_, i) => i !== index));
    };

    const handleFeatureChange = (index: number, key: "title" | "description", value: string) => {
        const updated = [...features];
        updated[index][key] = value;
        setFeatures(updated);

        const updatedErrors = [...featureErrors];
        updatedErrors[index][key] = value.trim() === "";
        setFeatureErrors(updatedErrors);
    };



    // --- Tags Logic ---
    const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            if (tagInput.trim() === "") return;
            if (!tags.includes(tagInput.trim())) {
                setTags([...tags, tagInput.trim()]);
            }
            setTagInput("");
        }
    };

    const removeTag = (tag: string) => {
        setTags(tags.filter((t) => t !== tag));
    };

    if (loading) return <p className="p-4">⏳ Loading...</p>;

    return (
        <>
            <LayoutHeader heading="Edit Service" />
            <HorizontalLine />
            <form
                className="mt-6 flex flex-col items-start gap-y-8"
                onSubmit={handleSubmit(onSubmit)}
            >
                {/* Form Fields */}
                <div className="flex items-center justify-between w-full">
                    <div className="w-[100%] md:w-[49%]">
                        <InputField
                            label="Service Name"
                            name="name"
                            placeholder="Enter your service name"
                            register={register}
                            error={errors.name}
                            required
                        />
                    </div>
                    <div className="w-[100%] md:w-[49%]">
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
                <div className="w-[100%]">
                    <UploadFile
                        label="Banner Image"
                        name="bannerImage"
                        required={false}
                        accept=".png,.jpg"
                        placeholder="Upload Service Banner Image."
                        register={register}
                        error={errors.bannerImage}
                    />
                </div>

                <div className="w-[100%]">
                    <TextArea
                        label="Description"
                        name="description"
                        required
                        placeholder="Write description"
                        register={register}
                        error={errors.description}
                    />
                </div>

                <div className="flex items-center justify-between w-full">
                    <div className="w-[100%] md:w-[49%]">
                        <DropdownField
                            label="Service Success Rate"
                            name="serviceSuccessRate"
                            options={categories}
                            control={control}
                            error={errors.serviceSuccessRate}
                            required
                        />
                    </div>
                    <div className="w-[100%] md:w-[49%]">
                        <DropdownField
                            label="Status"
                            name="status"
                            options={["Active", "Inactive"]}
                            control={control}
                            error={errors.status}
                            required
                        />
                    </div>
                </div>

                {/* Features Section */}
                <div className="w-[100%]">
                    {features.map((feature, index) => (
                        <div key={index} className="flex gap-2 mb-2">
                            <input
                                value={feature.title}
                                onChange={(e) => handleFeatureChange(index, "title", e.target.value)}
                                placeholder="Feature Title"
                                className={`w-1/2 border px-4 py-2 rounded ${featureErrors[index]?.title ? "border-red-500" : "border-[#E6E6E6]"}`}
                            />
                            <input
                                value={feature.description}
                                onChange={(e) => handleFeatureChange(index, "description", e.target.value)}
                                placeholder="Feature Description"
                                className={`w-1/2 border px-4 py-2 rounded ${featureErrors[index]?.description ? "border-red-500" : "border-[#E6E6E6]"}`}
                            />
                            <div className="cursor-pointer" onClick={() => deleteFeature(index)}>
                                <DeleteIcon width="18.5" height="19.5" />
                            </div>
                        </div>
                    ))}
                    <div
                        className="border-[2px] mt-4 cursor-pointer border-dashed text-center border-[#E6E6E6] px-4 py-2 rounded"
                        onClick={addNewFeatureFun}
                    >
                        Add more feature
                    </div>
                </div>


                {/* Tags Section */}
                <div className="w-full mt-4">
                    <label className="block text-sm font-medium mb-1">Tags</label>
                    <div className="flex flex-wrap gap-2 border border-[#E6E6E6] rounded px-2 py-2">
                        <input
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyDown={handleTagKeyDown}
                            className="flex-1 min-w-[120px] border-none focus:ring-0 outline-none text-sm"
                            placeholder="Type and press Enter"
                        />
                    </div>
                    <div className="flex items-center gap-x-3 mt-4 flex-wrap">
                        {tags.map((tag, idx) => (
                            <span
                                key={idx}
                                className="bg-[#00634F] text-white text-sm px-3 py-1 rounded-full flex items-center gap-2"
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

                {/* Actions */}
                <div className="w-[100%] flex items-center justify-end gap-x-3">
                    <PrimaryButton
                        text="No, Cancel"
                        bgColor="bg-white"
                        textColor="text-greyscale500"
                        py="py-2"
                        borderColor="border-[#CCCCCC]"
                        onClick={() => router.push("/dashboard/services")}
                    />
                    <PrimaryButton
                        text="Save Service"
                        bgColor="bg-primaryColor"
                        textColor="text-white"
                        py="py-2"
                    // type="submit"
                    />
                </div>
            </form>
        </>
    );
};

export default Page;
