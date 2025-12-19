'use client'
import careerApi from '@/app/apiServices/careerApi/CareerApi'
import PrimaryButton from '@/components/button/PrimaryButton'
import GreyLine from '@/components/greyLine/GreyLine'
import CheckIcon from '@/components/icons/checkIcon/CheckIcon'
import ClockIcon from '@/components/icons/clockIcon/ClockIcon'
import EyeIcon from '@/components/icons/eyeIcon/EyeIcon'
import HealthIcon from '@/components/icons/healthIcon/HealthIcon'
import LocationIcon from '@/components/icons/locationIcon/LocationIcon'
import StarIcon from '@/components/icons/starIcon/StarIcon'
import Loader from '@/components/loader/Loader'
import Tags from '@/components/tags/Tags'
import { CareerType } from '@/types/CareerType'
import { timeAgo } from '@/utils/timeCalcFunction'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Page = () => {
    const navigate = useRouter()
    const params = useParams();
    const id = params?.id as string;
    console.log("ID", id);
    const [careerData, setCareerData] = useState<CareerType>(null);
    const [loading, setLoading] = useState(true);

    // Fetch service detail
    useEffect(() => {
        if (!id) return;

        const fetchService = async () => {
            try {
                const res = await careerApi.getCareerId(id); // 👈 API hit
                console.log("RES", res);

                setCareerData(res.data); // API response
            } catch (err) {
                console.error("❌ Error fetching service:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchService();
    }, [id]);
    console.log("CAREER>>>>>>>>>>", careerData);

    if (!careerData) return <p>No data found</p>;
    return (
        <div>
            {loading && <Loader />}
            <div className='w-full p-5 border-[1px] border-solid border-[#E5E7EB] rounded-lg'>
                <div className='flex flex-col gap-y-2 sm:gap-y-0 sm:flex-row items-center justify-between text-[#131313] text-[20px] md:text-[24px] md:leading-[28px]'>
                    <p className='w-full sm:w-[70%] md:w-[80%] font-semibold'>{careerData?.jobTitle}</p>
                    <PrimaryButton text='Edit' bgColor='bg-[#00624F]' textColor='text-white' py="py-1" onClick={() => navigate.push(`/dashboard/careers/123`)} />
                </div>
                <div className='text-[#686868] flex items-center gap-x-3 mt-4 md:mt-0'>
                    <div className='flex items-center gap-x-2'>
                        <LocationIcon color="#686868" />
                        <p className='text-[14px] '>{careerData?.location}</p>
                    </div>
                    <div className='flex items-center gap-x-2'>
                        <ClockIcon color="#686868" />
                        <p className='text-[14px] '>{careerData?.jobType}</p>
                    </div>
                </div>
                <div className='text-[#686868] mb-4 mt-4 flex items-center gap-x-3'>
                    <Tags text={careerData?.department} icon={<HealthIcon color="#166534" />} color="text-[#166534]"
                        bgColor="bg-[#DCFCE7]" />
                    <p className='text-[14px] '>Posted {timeAgo(careerData?.createdAt)}</p>
                </div>
                <GreyLine />

                <div className='mt-4   flex flex-col gap-y-3 md:gap-y-2 md:flex-row items-center flex-wrap w-[100%] justify-between'>
                    <div className='flex flex-col gap-y-1 w-[100%] md:w-[33%] '>
                        <p className='text-[#131313] font-semibold'>Sallary Range</p>
                        <p className='text-[14px] text-[#686868]'>${careerData?.minSalary} - ${careerData?.maxSalary}</p>
                    </div>
                    <div className='flex flex-col gap-y-1 w-[100%] md:w-[33%]'>
                        <p className='text-[#131313] font-semibold'>Employement Type</p>
                        <p className='text-[14px] text-[#686868]'>{careerData?.jobType}</p>
                    </div>
                    <div className='flex flex-col gap-y-1 w-[100%] md:w-[33%]'>
                        <p className='text-[#131313] font-semibold'>Department</p>
                        <p className='text-[14px] text-[#686868]'>{careerData?.department}</p>
                    </div>
                    <Link href={`/dashboard/careers/view/${careerData?._id}/view-application`} className='flex flex-col gap-y-1 w-[100%] md:w-[33%]' onClick={() => setLoading(true)}>
                        <p className='text-[#131313] font-semibold'>Application</p>
                        <p className='text-[14px] text-[#686868] flex items-center gap-x-2 '>
                            <span className='text-[#166534] font-semibold '> {careerData?.totalApplications}</span>
                            <span className='p-2 bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center gap-x-2 w-[150px]'>
                                <EyeIcon color="#16A34A" />
                                <p>
                                    View Application
                                </p>
                            </span>
                        </p>
                    </Link>
                </div>

                <div className='flex flex-col gap-y-2 mt-4'>
                    <p className='text-[#131313] font-semibold text-[20px]'>Job Overview</p>
                    <div className='tiptap-content text-[14px] text-[#686868]' dangerouslySetInnerHTML={{ __html: careerData?.shortDescription }}></div>
                </div>
                <div className='flex flex-col gap-y-2 mt-4'>
                    <p className='text-[#131313] font-semibold text-[20px]'>Job Description</p>
                    <div
                        className="tiptap-content text-[14px] text-[#686868]"
                        dangerouslySetInnerHTML={{ __html: careerData?.jobDescription }}
                    />
                </div>
                <div className='flex flex-col gap-y-2s mt-4'>
                    <p className='text-[#131313] font-semibold text-[20px]'>Key Responsibilities</p>
                    <div className='flex flex-col gap-y-2 mt-3 '>
                        {careerData?.responsibilities?.map((data: string) => <p key={data} className='text-[14px] text-[#686868] flex items-center gap-x-3'>

                            <div className='w-[20px]'>

                                <CheckIcon color="#00624F" />
                            </div>
                            <p className='w-[100%]'>{data}</p>
                        </p>)}


                    </div>
                </div>
                <div className='flex flex-col gap-y-2s mt-4'>
                    <p className='text-[#131313] font-semibold text-[20px]'>Requirements</p>
                    <div className='flex flex-col gap-y-2 mt-3 '>
                        {careerData?.requirements?.map((data: string) => <p key={data} className='text-[14px] text-[#686868] flex items-center gap-x-3' >

                            <div className='w-[20px]'>

                                <CheckIcon color="#00624F" />
                            </div>
                            <p className='w-[100%]'>{data}</p>
                        </p>)}
                    </div>
                </div>
                <div className='flex flex-col gap-y-2s mt-4 mb-4'>
                    <p className='text-[#131313] font-semibold text-[20px]'>Benefits & Perks</p>
                    <div className='flex flex-col gap-y-2 mt-3 '>
                        {careerData?.benefits?.map((data: string) => <p key={data} className='text-[14px] text-[#686868] flex items-center gap-x-3'>

                            <div className='w-[20px]'>

                                <StarIcon color="#00624F" />
                            </div>
                            <p className='w-[100%]'>{data}</p>
                        </p>)}
                    </div>
                </div>


            </div>
        </div >
    )
}

export default Page