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
import TipTapEditor from "@/components/inputField/TipTapEditor";
import { useRouter, useParams } from "next/navigation";
import serviceApi from "@/app/apiServices/servicesApi/ServiceApi";
import categoryApi from "@/app/apiServices/categoryApi/CategoryApi";
import Loader from "@/components/loader/Loader";
import toast from "react-hot-toast";
import { cloudinaryBaseUrl } from "@/app/apiServices/baseUrl/BaseUrl";

type FormValues = {
    name: string;
    category: string;
    bannerImage: FileList;
    status: string;
    serviceSuccessRate: string;
    description: string;
    serviceOverView: string;
    subTitle: string;
    secondaryImage: FileList;
};

const defaultCategories = [
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
    const [existingBanner, setExistingBanner] = useState<string | null>(null);
    const [existingSecondary, setExistingSecondary] = useState<string | null>(null);

    // Category Logic
    const [categoriesList, setCategoriesList] = useState<string[]>(defaultCategories);
    const [isAddingCategory, setIsAddingCategory] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState("");

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

    // ✅ Fetch Categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await categoryApi.getAllCategories();
                const fetchedCategories = res.data.map((c: any) => c.name);
                setCategoriesList(Array.from(new Set([...defaultCategories, ...fetchedCategories])));
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, []);

    const handleAddCategory = async () => {
        if (!newCategoryName.trim()) return;
        try {
            const res = await categoryApi.createCategory(newCategoryName.trim());
            setCategoriesList((prev) => [...prev, res.data.name]);
            setNewCategoryName("");
            setIsAddingCategory(false);
            toast.success("Category added successfully");
        } catch (error: any) {
            toast.error(error || "Failed to add category");
        }
    };

    // ✅ Fetch service by ID
    useEffect(() => {
        if (!id) return;

        const fetchService = async () => {
            try {
                const res = await serviceApi.getServiceId(id);
                console.log("✅ Fetched Service Data:", res.data);
                const serviceData = res.data;

                if (!serviceData) {
                    console.error("❌ No service data found in response");
                    return;
                }

                reset({
                    name: serviceData.name,
                    category: serviceData.category,
                    status: serviceData.status,
                    serviceSuccessRate: serviceData.serviceSuccessRate,
                    description: serviceData.description,
                    serviceOverView: serviceData.serviceOverView,
                    subTitle: serviceData.subTitle,
                    secondaryImage: undefined as any, // Not used for initial value
                    bannerImage: undefined as any,    // Not used for initial value
                });

                setTags(serviceData.tags || []);
                setFeatures(serviceData.features && serviceData.features.length > 0 ? serviceData.features : [{ title: "", description: "" }]);
                setFeatureErrors(
                    new Array(serviceData.features?.length || 1).fill({ title: false, description: false })
                );

                if (serviceData.bannerImage) {
                    setExistingBanner(`${cloudinaryBaseUrl}/${serviceData.bannerImage}`);
                }
                if (serviceData.secondaryImage) {
                    setExistingSecondary(`${cloudinaryBaseUrl}/${serviceData.secondaryImage}`);
                }
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
        setLoading(true)
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
            if (data.secondaryImage?.[0]) {
                formData.append("secondaryImage", data.secondaryImage[0]);
            }

            features.forEach((f) => {
                formData.append("features[]", JSON.stringify(f));
            });
            tags.forEach((t) => {
                formData.append("tags[]", t);
            });

            const res = await serviceApi.updateService(id, formData);

            console.log("✅ Updated:", res.data);
            router.push("/dashboard/services");
        } catch (err) {
            console.error("❌ Error updating service:", err);
        } finally {
            setLoading(false)
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


    return (
        <>
            {loading && <Loader />}
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
                        {!isAddingCategory ? (
                            <div className="flex items-center justify-center  gap-2">
                                <DropdownField
                                    label="Category"
                                    name="category"
                                    options={categoriesList}
                                    control={control}
                                    error={errors.category}
                                    required
                                />
                                <div className='flex  items-center justify-center border border-[#E6E6E6] rounded-md w-11 h-11  mt-[30px]  hover:bg-primaryColor/10 cursor-pointer'>

                                    <button
                                        type="button"
                                        onClick={() => setIsAddingCategory(true)}
                                        className="text-primaryColor text-2xl font-bold cursor-pointer"
                                        title="Add New Category"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-2 w-full">
                                <label className="text-sm font-medium text-[#131313]">New Category</label>
                                <div className="flex items-center gap-2">
                                    <input
                                        className="flex-1 h-11 px-4 py-3 rounded border-[1.5px] border-[#E6E6E6] outline-none focus:border-[#00634F] text-sm text-[#131313]"
                                        placeholder="Enter category name"
                                        value={newCategoryName}
                                        onChange={(e) => setNewCategoryName(e.target.value)}
                                        style={{
                                            fontFamily: "Onest, -apple-system, Roboto, Helvetica, sans-serif",
                                        }}
                                    />
                                    <button
                                        type="button"
                                        onClick={handleAddCategory}
                                        className="bg-primaryColor text-white px-4 py-2 rounded text-sm h-11"
                                    >
                                        Save
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setIsAddingCategory(false)}
                                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded text-sm h-11"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}
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
                            label="Service Card Discription"

                            name="serviceOverView"
                            placeholder="Enter service overview"
                            register={register}
                            error={errors.serviceOverView}
                            required
                        />
                    </div>
                </div>
                <div className="flex items-center justify-between w-full">
                    <div className="w-[100%] md:w-[49%]">
                        <UploadFile
                            label="Banner Image"
                            name="bannerImage"
                            required={false}
                            accept=".png,.jpg"
                            placeholder="Upload Service Banner Image."
                            register={register}
                            error={errors.bannerImage}
                            defaultValue={existingBanner || ""}
                        />
                    </div>
                    <div className="w-[100%] md:w-[49%]">
                        <UploadFile
                            label="Content Image"
                            name="secondaryImage"
                            required={false}
                            accept=".png,.jpg"
                            placeholder="Upload Service Content Image."
                            register={register}
                            error={errors.secondaryImage}
                            defaultValue={existingSecondary || ""}
                        />
                    </div>
                </div>

                <div className="w-[100%]">
                    <TipTapEditor
                        label="Description"
                        name="description"
                        required
                        placeholder="Write description"

                        control={control}
                        error={errors.description}
                    />
                </div>

                <div className="flex items-center justify-between w-full">
                    <div className="w-[100%] md:w-[49%]">
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
                <div className="w-[100%] mt-4">
                    <label
                        className="w-full capitalize text-[#131313] text-sm font-medium leading-[150%] mb-2"
                        style={{
                            fontFamily: "Onest, -apple-system, Roboto, Helvetica, sans-serif",
                        }}
                    >
                        Features *
                    </label>

                    {features.map((feature, index) => (
                        <div key={index} className="flex gap-2 mb-2">
                            <input
                                value={feature.title}
                                onChange={(e) => handleFeatureChange(index, "title", e.target.value)}
                                placeholder="Feature Title"
                                className={`w-1/2 border px-4 py-2 rounded text-[#131313] ${featureErrors[index]?.title ? "border-red-500" : "border-gray-400"}`}
                            />
                            <input
                                value={feature.description}
                                onChange={(e) => handleFeatureChange(index, "description", e.target.value)}
                                placeholder="Feature Description"
                                className={`w-1/2 border px-4 py-2 rounded text-[#131313] ${featureErrors[index]?.description ? "border-red-500" : "border-gray-400"}`}
                            />
                            <div className="cursor-pointer" onClick={() => deleteFeature(index)}>
                                <DeleteIcon width="18.5" height="19.5" />
                            </div>
                        </div>
                    ))}
                    <div
                        className="border-[2px] mt-4 cursor-pointer border-dashed text-center border-gray-400 text-[#131313] px-4 py-2 rounded"
                        onClick={addNewFeatureFun}
                    >
                        Add more feature
                    </div>
                </div>


                {/* Tags Section */}
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
                        type="submit"
                    />
                </div>
            </form>
        </>
    );
};

export default Page;
