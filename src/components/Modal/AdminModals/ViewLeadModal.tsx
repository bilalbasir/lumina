'use client'
import React, { useEffect } from "react";
import ModalLayout from "../ModalLayout";
import PrimaryButton from "@/components/button/PrimaryButton";
import LocationIcon from "@/components/icons/locationIcon/LocationIcon";
import GreyLine from "@/components/greyLine/GreyLine";
import MessageIcon from "@/components/icons/messageIcon/MessageIcon";
import CallIcon from "@/components/icons/callIcon/CallIcon";
import Tags from "@/components/tags/Tags";
import CareerIcon from "@/components/icons/career/CareerIcon";
import HealthIcon from "@/components/icons/healthIcon/HealthIcon";
import { useGetLeadById } from "@/hooks/use-get-lead-by-id";
import axiosInstance from "@/app/apiServices/axoisInstance/AxiosInstance";
import { useMutation } from "@tanstack/react-query";
import leadsApi from "@/app/apiServices/contactLeads/ContactLeadsApi";
import Link from "next/link";

type Props = {
    id: string | null;
};
const updateLead = async (id: string) => {
    const { data } = await leadsApi.updateLead(id);
    return data;
};
const ViewLeadModal: React.FC<Props> = ({ id }) => {
    const { data, isLoading, isError } = useGetLeadById(id);
    const mutation = useMutation({
        mutationFn: updateLead,
        onSuccess: (data) => {
            console.log("Lead updated:", data);
        },
        onError: (error) => {
            console.error("Error updating lead:", error);
        },
    });

    // modal khulte hi trigger
    useEffect(() => {
        if (id) {
            mutation.mutate(id);
        }
    }, [id]);
    if (!id) return null;
    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error loading lead</p>;

    const lead = data; // backend se jo response structure hai us hisaab se adjust karna
    console.log("LEAD", lead);
    const callLeadFun = (number: string) => {
        if (!number) return;

        const isMobile = /Mobi|Android/i.test(navigator.userAgent);

        if (isMobile) {
            // Mobile devices → direct dialer open
            window.location.href = `tel:${number}`;
        } else {
            // Desktop → try tel link, if not handled, show alert
            const telLink = document.createElement("a");
            telLink.href = `tel:${number}`;
            telLink.style.display = "none";
            document.body.appendChild(telLink);
            telLink.click();
            document.body.removeChild(telLink);

            // Safety net if desktop doesn’t have app
            setTimeout(() => {
                alert("⚠️ Please install a calling app or use your mobile to make the call.");
            }, 500);
        }
    };

    const emailSendLeadFun = (email: string) => {
        if (!email) return;

        // Check agar user Gmail use karna chahta hai
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`;

        // Agar user Gmail me logged in hai, yeh Gmail compose open karega
        // Nahi to Gmail login page open hoga
        window.open(gmailUrl, "_blank");

        // ✅ fallback (agar Gmail nahi chalti) → default mail client open
        setTimeout(() => {
            window.location.href = `mailto:${email}`;
        }, 2000);
    };


    return (
        <ModalLayout>
            <div className="w-full">
                <div className="mb-4">
                    <p className="w-full sm:w-[70%] md:w-[80%] font-semibold">Lead Details</p>
                </div>

                <GreyLine />
                <div className="flex items-center gap-x-2 mt-6">
                    <p className="font-semibold">{lead.firstName} {lead.lastName}</p>
                    <Tags text={lead.status} bgColor="bg-[#DBEAFE]" color="text-[#1E40AF]" />
                </div>

                {/* Contact Information */}
                <div className="mt-6 flex flex-col gap-y-3 md:gap-y-0 md:flex-row items-center justify-between">
                    <div className="w-[49%] h-[250px] bg-[#F9FAFB] flex flex-col gap-y-3.5 rounded-tl-[8px] rounded-bl-[8px] p-3">
                        <h1 className="textHeadlineSemi">Contact Information</h1>
                        <div className="flex items-center gap-x-4">
                            <MessageIcon />
                            <p className="agBodyRegularGrey">{lead.email}</p>
                        </div>
                        <div className="flex items-center gap-x-4">
                            <CallIcon color="#16A34A" />
                            <p className="agBodyRegularGrey">{lead.phoneNumber}</p>
                        </div>
                        <div className="flex items-center gap-x-4">
                            <HealthIcon width="18" height="16" color="#DC2626" />
                            <p className="agBodyRegularGrey">{lead.companyName}</p>
                        </div>
                        <div className="flex items-center gap-x-4">
                            <CareerIcon width="18" height="16" color="#00624F" />
                            <p className="agBodyRegularGrey">{lead.jobTitle}</p>
                        </div>
                        <div className="flex items-center gap-x-4">
                            <LocationIcon width="18" height="16" color="#DC2626" />
                            <p className="agBodyRegularGrey">{lead.country}</p>
                        </div>
                    </div>

                    {/* Application Details */}
                    <div className="w-[49%] bg-[#F9FAFB] flex flex-col gap-y-2 rounded-tr-[8px] rounded-br-[8px] p-3">
                        <h1 className="textHeadlineSemi">Application Details</h1>
                        <div className="flex flex-col items-start gap-y-1">
                            <p className="text-[#848484]">Applied Date</p>
                            <p className="text-[#131313] font-[600]">
                                {new Date(lead.createdAt).toLocaleDateString("en-GB")}
                            </p>
                        </div>
                        <div className="flex flex-col items-start gap-y-1">
                            <p className="text-[#848484]">Source</p>
                            <p className="text-[#131313] font-[600]">
                                Website Contact Form
                            </p>
                        </div>
                        <div className="flex flex-col items-start gap-y-1">
                            <p className="text-[#848484]">IP Address</p>
                            <p className="text-[#131313] font-[600]">
                                {lead?.ipAddress}
                            </p>
                        </div>
                        <div className="flex flex-col items-start gap-y-1">
                            <p className="text-[#848484]">User Agent</p>
                            <p className="text-[#131313] font-[600]">
                                {lead?.userAgent}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Message */}
                <div className="mt-6 mb-6">
                    <p className="textHeadlineSemi mb-4">Message</p>
                    <p className="w-[100%] agBodyRegularGrey bg-[#F9FAFB] rounded-[8px] p-3">
                        {lead.message}
                    </p>
                </div>

                <div className="w-[100%] mt-5 flex items-center justify-between">
                    <PrimaryButton
                        bgColor="bg-[#16A34A]"
                        borderColor="border-[#16A34A]"
                        text="Call Lead"
                        py="py-2"
                        textColor="text-white"
                        width="w-[49%]"
                        onClick={() => callLeadFun(lead?.phoneNumber)}
                    />
                    <PrimaryButton
                        bgColor="bg-[#00624F]"
                        text="Send Email"
                        py="py-2"
                        textColor="text-white"
                        width="w-[49%]"
                        onClick={() => emailSendLeadFun(lead?.email)}
                    />
                    {/* <a href={`mailto:${lead?.email}`}>Click</a> */}
                </div>
            </div>
        </ModalLayout>
    );
};

export default ViewLeadModal;
