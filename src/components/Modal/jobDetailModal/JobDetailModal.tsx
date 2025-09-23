'use client'

import React, { useEffect, useState } from 'react'
import ModalLayout from '../ModalLayout'
import PrimaryButton from '@/components/button/PrimaryButton'
import LocationIcon from '@/components/icons/locationIcon/LocationIcon'
import ClockIcon from '@/components/icons/clockIcon/ClockIcon'
import Tags from '@/components/tags/Tags'
import HealthIcon from '@/components/icons/healthIcon/HealthIcon'
import GreyLine from '@/components/greyLine/GreyLine'
import CheckIcon from '@/components/icons/checkIcon/CheckIcon'
import StarIcon from '@/components/icons/starIcon/StarIcon'
import Link from 'next/link'
import { slugify } from '@/utils/slugify'
import careerApi from '@/app/apiServices/careerApi/CareerApi'
import { CareerType } from '@/types/CareerType'
import { timeAgo } from '@/utils/timeCalcFunction'
interface jobDescriptionProps {
    id: string
}
const JobDetailModal: React.FC<jobDescriptionProps> = (id) => {
    const [jobDetailData, setJobDetailData] = useState<CareerType>()
    useEffect(() => {
        if (!id.id) return;

        const fetchService = async () => {
            try {
                const res = await careerApi.getCareerId(id.id);
                const data = res.data;
                setJobDetailData(data)
            } catch (err) {
                console.error("❌ Error fetching career:", err);
            }
        };

        fetchService();
    }, [
        id
    ])
    return (
        <ModalLayout>
            <div className='w-full capitalize p-5 border-[1px] border-solid border-[#E5E7EB] rounded-lg'>
                <div className='flex flex-col gap-y-2 sm:gap-y-0 sm:flex-row items-center justify-between text-[#131313] text-[20px] md:text-[24px] md:leading-[28px]'>
                    <p className='w-full sm:w-[70%] md:w-[80%] font-semibold'>{jobDetailData?.jobTitle}</p>


                    <Link
                        href={jobDetailData?.status === "Open" ? `/careers/${jobDetailData._id}` : ""}
                        className={`flex w-[100%] md:w-[48%] px-4 py-3 justify-center items-center gap-2  rounded ${jobDetailData?.status === "Open" ? "bg-[#00624F] cursor-pointer" : "bg-[#00624F]/30 cursor-not-allowed"}  text-white text-sm font-medium hover:bg-[#004d3d] transition-colors duration-200`}
                        style={{
                            fontFamily: "Onest, -apple-system, Roboto, Helvetica, sans-serif",
                        }}
                    >
                        Apply Now
                    </Link>
                </div>
                <div className='text-[#686868] flex items-center gap-x-3 mt-4 md:mt-0'>
                    <div className='flex items-center gap-x-2'>
                        <LocationIcon color="#686868" />
                        <p className='text-[14px] '>{jobDetailData?.location}</p>
                    </div>
                    <div className='flex items-center gap-x-2'>
                        <ClockIcon color="#686868" />
                        <p className='text-[14px] '>{jobDetailData?.jobType}</p>
                    </div>
                </div>
                <div className='text-[#686868] mb-4 mt-4 flex items-center gap-x-3'>
                    <Tags text='Healthcare' icon={<HealthIcon color="#166534" />} color="text-[#166534]"
                        bgColor="bg-[#DCFCE7]" />
                    <p className='text-[14px] '>{timeAgo(jobDetailData?.createdAt ?? "")}</p>
                </div>
                <GreyLine />

                <div className='mt-4   flex flex-col gap-y-3 md:gap-y-0 md:flex-row items-center justify-between'>
                    <div className='flex flex-col gap-y-1 w-[100%] md:w-[33%] '>
                        <p className='text-[#131313] font-semibold'>Sallary Range</p>
                        <p className='text-[14px] text-[#686868]'>{jobDetailData?.minSalary} - {jobDetailData?.maxSalary}</p>
                    </div>
                    <div className='flex flex-col gap-y-1 w-[100%] md:w-[33%]'>
                        <p className='text-[#131313] font-semibold'>Employement Type</p>
                        <p className='text-[14px] text-[#686868]'>{jobDetailData?.jobType}</p>
                    </div>
                    <div className='flex flex-col gap-y-1 w-[100%] md:w-[33%]'>
                        <p className='text-[#131313] font-semibold'>Department</p>
                        <p className='text-[14px] text-[#686868]'>{jobDetailData?.department}</p>
                    </div>
                </div>

                <div className='flex flex-col gap-y-2 mt-4'>
                    <p className='text-[#131313] font-semibold text-[20px]'>Job Description</p>
                    <p className='text-[14px] text-[#686868]'>{jobDetailData?.jobDescription}</p>
                </div>
                <div className='flex flex-col gap-y-2s mt-4'>
                    <p className='text-[#131313] font-semibold text-[20px]'>Key Responsibilities</p>
                    <div className='flex flex-col gap-y-2 mt-3 '>
                        {jobDetailData?.responsibilities?.map(data =>
                            <p className='text-[14px] text-[#686868] flex items-center gap-x-3'>

                                <div className='w-[20px]'>

                                    <CheckIcon color="#00624F" />
                                </div>
                                <p className='w-[100%]'>{data}</p>
                            </p>


                        )}


                    </div>
                </div>
                <div className='flex flex-col gap-y-2s mt-4'>
                    <p className='text-[#131313] font-semibold text-[20px]'>Requirements</p>
                    <div className='flex flex-col gap-y-2 mt-3 '>
                        {jobDetailData?.requirements?.map(data =>
                            <p className='text-[14px] text-[#686868] flex items-center gap-x-3'>

                                <div className='w-[20px]'>

                                    <CheckIcon color="#00624F" />
                                </div>
                                <p className='w-[100%]'>{data}</p>
                            </p>


                        )}
                    </div>
                </div>
                <div className='flex flex-col gap-y-2s mt-4 mb-4'>
                    <p className='text-[#131313] font-semibold text-[20px]'>Benefits & Perks</p>
                    <div className='flex flex-col gap-y-2 mt-3 '>
                        {jobDetailData?.benefits?.map(data =>
                            <p className='text-[14px] text-[#686868] flex items-center gap-x-3'>

                                <div className='w-[20px]'>

                                    <StarIcon color="#00624F" />
                                </div>
                                <p className='w-[100%]'>{data}</p>
                            </p>


                        )}
                    </div>
                </div>
                <GreyLine />
                <div className='mt-4 mb-4 flex items-center justify-center'>
                    <div className=''>

                        <p className='text-[#131313] font-medium leading-6'>Interested in this position?</p>
                        <p className='text-[#686868] leading-6'>
                            Apply now and join our amazing team!
                        </p>
                    </div>

                </div>


                <Link
                    href={jobDetailData?.status === "Open" ? `/careers/${jobDetailData._id}` : ""}
                    className={`flex w-[100%]  px-4 py-3 justify-center items-center gap-2  rounded ${jobDetailData?.status === "Open" ? "bg-[#00624F] cursor-pointer" : "bg-[#00624F]/30 cursor-not-allowed"}  text-white text-sm font-medium hover:bg-[#004d3d] transition-colors duration-200`}
                    style={{
                        fontFamily: "Onest, -apple-system, Roboto, Helvetica, sans-serif",
                    }}
                >
                    Apply Now
                </Link>
            </div>
        </ModalLayout >
    )
}

export default JobDetailModal