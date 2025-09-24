"use client";

import { HorizontalLine } from "@/components/horizontalLine/HorizontalLine";
import LayoutHeader from "@/components/pages/adminSide/LayoutHeader";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation"; // 👈 params lene k liye
import serviceApi from "@/app/apiServices/servicesApi/ServiceApi"; // 👈 aapka API service
import CheckIcon from "@/components/icons/checkIcon/CheckIcon";
import { cloudinaryBaseUrl, imageBaseUrl } from "@/app/apiServices/baseUrl/BaseUrl";

const Page = () => {
    const params = useParams(); // { id: "68caa14b59b6ab089420761b" }
    const id = params?._id as string;
    console.log("ID", params?._id, id);

    const [serviceData, setServiceData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    // Fetch service detail
    useEffect(() => {
        if (!id) return;

        const fetchService = async () => {
            try {
                const res = await serviceApi.getServiceId(id); // 👈 API hit
                console.log("RES", res);

                setServiceData(res.data); // API response
            } catch (err) {
                console.error("❌ Error fetching service:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchService();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (!serviceData) return <p>No data found</p>;

    return (
        <>
            <LayoutHeader heading="Service Detail" />
            <HorizontalLine />

            <div className="mt-6 flex flex-col items-start gap-y-8">
                <div className="flex items-center justify-between w-full">
                    <div className="w-[100%] md:w-[49%]">
                        <label className="w-full text-sm font-medium leading-[150%]">
                            Service Name
                        </label>
                        <p className="text-base text-gray-700">{serviceData.name}</p>
                    </div>

                    <div className="w-[100%] md:w-[49%]">
                        <label className="w-full text-sm font-medium leading-[150%]">
                            Category
                        </label>
                        <p className="text-base text-gray-700">{serviceData.category}</p>
                    </div>
                </div>

                <div className="w-[100%]">
                    <label className="w-full text-sm font-medium leading-[150%]">
                        Banner Image
                    </label>
                    <img
                        src={`${cloudinaryBaseUrl}/${serviceData.bannerImage}`}
                        alt="Banner"
                        className="w-full h-auto object-cover rounded-md mt-2"
                    />
                </div>

                <div className="w-[100%]">
                    <label className="w-full text-sm font-medium leading-[150%]">
                        Description
                    </label>
                    <p className="text-base text-gray-700 mt-1">
                        {serviceData.description}
                    </p>
                </div>

                <div className="flex items-center justify-between w-full">
                    <div className="w-[100%] md:w-[49%]">
                        <label className="w-full text-sm font-medium leading-[150%]">
                            Service Success Rate
                        </label>
                        <p className="text-base text-gray-700">
                            {serviceData.serviceSuccessRate}
                        </p>
                    </div>

                    <div className="w-[100%] md:w-[49%]">
                        <label className="w-full text-sm font-medium leading-[150%]">
                            Status
                        </label>
                        <p className="text-base text-gray-700">{serviceData.status}</p>
                    </div>
                </div>

                {/* Features Section */}
                <div className="w-[100%]">
                    <label className="w-full text-sm font-medium leading-[150%]">
                        Features
                    </label>
                    <ul className="list-disc pl-6 text-gray-700">
                        {serviceData.features?.map((feature: any, idx: number) => (
                            <li key={idx} className="flex items-start gap-x-2">
                                <p className="mt-2">

                                    <CheckIcon color="#00624F" />
                                </p>
                                <div className="flwx items-center gap-x-2">
                                    <p className="font-semibold">
                                        {feature?.title}
                                    </p>
                                    <p>
                                        {feature?.description}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Tags Section */}
                <div className="w-[100%]">
                    <label className="w-full text-sm font-medium leading-[150%]">
                        Tags
                    </label>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {serviceData.tags?.map((tag: string, idx: number) => (
                            <span
                                key={idx}
                                className="bg-[#00634F] text-white text-sm px-3 py-1 rounded-full"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Page;
