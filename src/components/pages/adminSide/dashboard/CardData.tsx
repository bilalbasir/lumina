'use client'
import { montserrat } from '@/app/lib/font'
import Card from '@/components/card/Card'
import BlogIcon from '@/components/icons/blog/BlogIcon'
import CareerIcon from '@/components/icons/career/CareerIcon'
import ContactLeadIcon from '@/components/icons/contactLead/ContactLeadIcon'
import ForwardIcon from '@/components/icons/forwardIcon/ForwardIcon'
import ServiceIcon from '@/components/icons/services/ServicesIcon'
import Loader from '@/components/loader/Loader'
import { useGetAllCareers, useGetAllCareersWoPagination } from '@/hooks/use-career-hook'
import { useGetAllLeads, useGetAllLeadsWoPagination } from '@/hooks/use-lead-hook'
import { useGetAllServices, useGetAllServicesWoPagination } from '@/hooks/use-service-hook'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const CardData = () => {
    const { data: servicesRes, isLoading: serviceLoad } = useGetAllServicesWoPagination()
    const { data: careersRes, isLoading: careerLoad } = useGetAllCareersWoPagination()
    const { data: leadsRes, isLoading: leadLoad } = useGetAllLeadsWoPagination()

    // derive directly instead of using state
    const totalCareers = careersRes?.data?.careers?.length || 0
    const totalServices = servicesRes?.data?.data?.length || 0
    const totalContactLeads = leadsRes?.data?.data?.length || 0



    return (
        <div>
            {(serviceLoad ||
                careerLoad ||
                leadLoad) && <Loader />}
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                <Card heading='Total Services' hover="hover:bg-[#E5F8FF]">
                    <div className='flex flex-col items-center justify-center w-full gap-y-3 group '>

                        <div className='h-[48px] w-[48px] rounded-full border-[7px] border-solid border-[#E5F8FF] bg-[#B2EBFF] flex items-center justify-center'>
                            <ServiceIcon color='#087589' />
                        </div>
                        <p className={`font-bold text-[36px] ${montserrat.className}`}>{totalServices}</p>
                        <p className={`agBold ${montserrat.className}`}>Total Services</p>
                        <p className={`agBodyMediumGrey ${montserrat.className}`}>5 new services this month</p>
                        <Link href="/dashboard/services" className='text-[#00624F] flex items-center gap-x-4 opacity-0 group-hover:opacity-100 duration-500 transition-all cursor-pointer'>
                            <p>Manage Services</p>
                            <ForwardIcon color='#00624F' />
                        </Link>
                    </div>

                </Card>

                <Card heading='Careers' hover="hover:bg-[#E0FFD8]">
                    <div className='flex flex-col items-center justify-center w-full gap-y-3 group'>

                        <div className='h-[48px] w-[48px] rounded-full border-[7px] border-solid border-[#E0FFD8] bg-[#B9FFA8] flex items-center justify-center'>
                            <CareerIcon color='#015524' />
                        </div>
                        <p className={`font-bold text-[36px] ${montserrat.className}`}>{totalCareers}</p>
                        <p className={`agBold ${montserrat.className}`}>Active Jobs</p>
                        <p className={`agBodyMediumGrey ${montserrat.className}`}>8 positions currently open</p>
                        <Link href="/dashboard/careers" className='text-[#00624F] flex items-center gap-x-4 opacity-0 group-hover:opacity-100 duration-500 transition-all cursor-pointer'>
                            <p>Manage Careers</p>
                            <ForwardIcon color='#00624F' />
                        </Link>
                    </div>
                </Card>
                <Card heading='Blogs' hover="hover:bg-[#E5F8FF]">
                    <div className='flex flex-col items-center justify-center w-full gap-y-3 group'>

                        <div className='h-[48px] w-[48px] rounded-full border-[7px] border-solid border-[#FAEDFF] bg-[#ECB2FF] flex items-center justify-center'>
                            <BlogIcon color='#9512C1' />
                        </div>
                        <p className={`font-bold text-[36px] ${montserrat.className}`}>30</p>
                        <p className={`agBold ${montserrat.className}`}>Blogs</p>
                        <p className={`agBodyMediumGrey ${montserrat.className}`}>5 new blogs this month</p>
                        <Link href="/dashboard/blogs" className='text-[#00624F] flex items-center gap-x-4 opacity-0 group-hover:opacity-100 duration-500 transition-all cursor-pointer'>
                            <p>Manage Blogs</p>
                            <ForwardIcon color='#00624F' />
                        </Link>
                    </div>
                </Card>
                <Card heading='Contact Leads' hover="hover:bg-[#FFF2D5]">
                    <div className='flex flex-col items-center justify-center w-full gap-y-3 group'>

                        <div className='h-[48px] w-[48px] rounded-full border-[7px] border-solid border-[#FFF2D5] bg-[#FFD165] flex items-center justify-center'>
                            <ContactLeadIcon color='#7D5903' />
                        </div>
                        <p className={`font-bold text-[36px] ${montserrat.className}`}>{totalContactLeads}</p>
                        <p className={`agBold ${montserrat.className}`}>Recent Leads</p>
                        <p className={`agBodyMediumGrey ${montserrat.className}`}>23 leads this week</p>
                        <Link href="/dashboard/contact-leads" className='text-[#00624F] flex items-center gap-x-4 opacity-0 group-hover:opacity-100 duration-500 transition-all cursor-pointer'>
                            <p>Manage Contact Leads</p>
                            <ForwardIcon color='#00624F' />
                        </Link>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default CardData