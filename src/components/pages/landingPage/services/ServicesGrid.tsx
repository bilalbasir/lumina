"use client"
import Link from 'next/link';
import ServiceCard from './ServiceCard';
import { useGetAllServices, useGetAllServicesWoPagination } from '@/hooks/use-service-hook';
import { useState } from 'react';


const ServicesGrid = () => {
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);

  const { data: servicesRes, isLoading, isError } = useGetAllServicesWoPagination();
  const services = servicesRes?.data?.data || [];
  console.log("SERVICES", services)
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
          {services?.map((service: any) => {
            return <div className='w-full sm:w-[40%%] md:w-[47%] lg:w-[48%]' key={services?.cardHeading}> <ServiceCard
              _id={service?._id}
              cardHeading={service?.name}
              explanation={
                service?.serviceOverview ||
                "Stay tuned for our latest initiatives and featured film, soon to be released in cinemas."
              }
              image={
                service?.image ||
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
