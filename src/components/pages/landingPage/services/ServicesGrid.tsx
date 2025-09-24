"use client"
import Link from 'next/link';
import ServiceCard from './ServiceCard';
import { useGetAllServices, useGetAllServicesWoPagination } from '@/hooks/use-service-hook';
import { useState } from 'react';


const ServicesGrid = () => {
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);

  const { data: servicesRes, isLoading, isError } = useGetAllServicesWoPagination();
  const allServices = servicesRes?.data?.data || [];
  const activeServices = allServices.filter(
    (service: any) => service.status === "Active"
  );

  return (
    <section className="w-full py-16 bg-white">
      <div className=" mx-auto px-4 sm:px-6 lg:px-20">
        {/* Section Header */}
        <div className="flex flex-col justify-center items-center gap-2 mb-8">
          <h2
            className="text-3xl md:text-4xl lg:text-[48px] font-bold text-[#1D1D1D] leading-[120%] text-center"
            style={{ fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif' }}
          >
            Services
          </h2>
        </div>
        {/* Bento Grid Layout */}

        <div className="flex  flex-wrap gap-8">
          {activeServices?.length === 0 ? <div className='w-[100%] text-center'><p className='text-[#131313]  text-[16px] md:text-[24px] font-semibold leading-[57.6px]'>Comming Soon</p></div> : activeServices?.map((service: any) => {
            return <div className='w-full sm:w-[40%%] md:w-[47%] lg:w-[48%]' key={service?.name}> <ServiceCard
              _id={service?._id}
              cardHeading={service?.name}
              explanation={
                service?.serviceOverView ||
                "Stay tuned for our latest initiatives and featured film, soon to be released in cinemas."
              }
              image={
                service?.bannerImage ||
                "https://api.builder.io/api/v1/image/assets/TEMP/93a9bf9562c30d3d358bf088c67c4392d1754043?width=2028"
              }
            />
            </div>

          })}

        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
