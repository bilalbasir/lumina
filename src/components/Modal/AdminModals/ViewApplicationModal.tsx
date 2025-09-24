import React, { useEffect, useState } from 'react'
import ModalLayout from '../ModalLayout'
import PrimaryButton from '@/components/button/PrimaryButton'
import LocationIcon from '@/components/icons/locationIcon/LocationIcon'

import GreyLine from '@/components/greyLine/GreyLine'

import MessageIcon from '@/components/icons/messageIcon/MessageIcon'
import CallIcon from '@/components/icons/callIcon/CallIcon'
import careerApi from '@/app/apiServices/careerApi/CareerApi'
import { dateConvert } from '@/utils/dateConvert'
import { imageBaseUrl } from '@/app/apiServices/baseUrl/BaseUrl'

interface ViewApplicationModalProps {
    id: string
}

const ViewApplicationModal: React.FC<ViewApplicationModalProps> = (id) => {

    const [applicantData, setApplicantData] = useState(null);
    console.log("<<<<<<<<<<<<id", applicantData);

    // Fetch service detail
    useEffect(() => {
        if (!id?.id) return;

        const fetchService = async () => {
            try {
                const res = await careerApi.getApplicantId(id?.id); // 👈 API hit
                console.log("RES", res);

                setApplicantData(res); // API response
            } catch (err) {
                console.error("❌ Error fetching service:", err);
            }
        };

        fetchService();
    }, [id]);

    const handleDownload = () => {
        if (!applicantData?.resume) return;

        // `fl_attachment` ko `fl_inline` me convert karo
        const previewUrl = `${imageBaseUrl}/${applicantData.resume}`;

        window.open(previewUrl, "_blank"); // 👈 ab browser me open hoga
    };

    console.log("applicantData>>>>>>>>>>", applicantData);
    return (
        <ModalLayout>
            <div className='w-full'>
                <div className='mb-4'>
                    <p className='w-full sm:w-[70%] md:w-[80%] font-semibold'>{applicantData?.firstName} {applicantData?.lastName}</p>
                    <p className="text-[#4B5563] text-base leading-[24px]">
                        Application for Senior Software Engineer
                    </p>

                </div>


                <GreyLine />

                <div className='mt-6   flex flex-col gap-y-3 md:gap-y-0 md:flex-row items-center justify-between'>
                    <div className='w-[49%] bg-[#F9FAFB] flex flex-col gap-y-3.5 rounded-tl-[8px] rounded-bl-[8px] p-3'>
                        <h1 className='textHeadlineSemi'>
                            Contact Information
                        </h1>
                        <div className='flex items-center gap-x-4'>
                            <MessageIcon />
                            <p className='agBodyRegularGrey'>{applicantData?.email}</p>
                        </div>
                        <div className='flex items-center gap-x-4'>
                            <CallIcon color='#16A34A' />
                            <p className='agBodyRegularGrey'>{applicantData?.phone}</p>
                        </div>
                        <div className='flex items-center gap-x-4'>
                            <LocationIcon width='18' height='16' color='#DC2626' />
                            <p className='agBodyRegularGrey'>San Francisco, CA</p>
                        </div>
                    </div>
                    <div className='w-[49%] bg-[#F9FAFB] flex flex-col gap-y-2 rounded-tr-[8px] rounded-br-[8px] p-3'>
                        <h1 className='textHeadlineSemi'>
                            Application Details
                        </h1>
                        <div className='flex flex-col items-start gap-y-1'>
                            <p className='text-[#848484]'>Applied Date</p>
                            <p className='text-[#131313] font-[600]'>{dateConvert(applicantData?.createdAt)}</p>
                        </div>
                        <div className='flex flex-col items-start '>
                            <p className='text-[#848484]'>Experience</p>

                            <p className='text-[#131313] font-[600]'>{applicantData?.experience} years</p>
                        </div>

                    </div>
                </div>

                <div className='mt-6 mb-6'>
                    <p className='textHeadlineSemi mb-4'>Cover Letter</p>
                    <p className='w-[100%] agBodyRegularGrey bg-[#F9FAFB] rounded-[8px] p-3'>
                        {applicantData?.coverLetter}                    </p>

                </div>

                <div
                    className='w-[100%] mt-5 flex items-center justify-start' onClick={handleDownload}>
                    <PrimaryButton bgColor='bg-[#00624F]' text='Download Resume' py="py-2" textColor='text-white' width="w-[25%]" />
                </div>
            </div>
        </ModalLayout >
    )
}

export default ViewApplicationModal