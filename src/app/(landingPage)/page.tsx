"use client";
import Link from 'next/link';
import MaximizeSection from '@/components/pages/landingPage/home/MaximizeSection';
import CTASection from '@/components/pages/landingPage/home/CTASection';
import IndustriesSection from '@/components/pages/landingPage/home/IndustriesSection';
import StatsSection from '@/components/pages/landingPage/home/StatsSection';
import NewsCarousel from '@/components/pages/landingPage/home/NewsCarousel';
import HiringSection from '@/components/pages/landingPage/home/HiringSection';
import ContactFormSection from '@/components/pages/landingPage/home/ContactFormSection';

import ServicesSection from '@/components/pages/landingPage/home/ServicesSection';
import ForwardIcon from '@/components/icons/forwardIcon/ForwardIcon';
import { useState } from 'react';
import { useGetAllServices, useGetAllServicesWoPagination } from '@/hooks/use-service-hook';

export default function Home() {


  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);

  const { data: servicesRes, isLoading, isError } = useGetAllServicesWoPagination();
  const services = servicesRes?.data?.data || [];
  const randomServices = services
    .sort(() => 0.5 - Math.random()) // shuffle
    .slice(0, 3)
  console.log("SERVICES", services)
  return (
    <div className="min-h-screen">
      {/* Hero Section - Figma Design */}
      <section
        className="relative w-full min-h-screen overflow-hidden bg-black bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/home/hero/heroImg.png')" }}
      >
        {/* Background Elements */}
        <div className="absolute inset-0">


          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#053329] via-transparent to-transparent opacity-75"></div>

          {/* Blur Effects */}
          <div className="absolute left-[393px] top-[206px] w-[681px] h-[85px] rounded-full bg-[#086A65]/76 blur-[64px]"></div>
          <div className="absolute left-[379px] top-[235px] w-[681px] h-[142px] rounded-full bg-[#064B36] blur-[64px]"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex items-center justify-center h-screen">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex flex-col items-center gap-10">
              {/* Main Title */}
              <div className="flex flex-col items-center gap-1">
                <h1 className="text-5xl md:text-8xl lg:text-[92px] font-bold leading-tight" style={{ fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif' }}>
                  <span className="text-[#D5EED7]">More Than </span>
                  <span className="text-[#2CC294]">Growth</span>
                </h1>
                <p className="text-lg md:text-2xl lg:text-[28px] text-white max-w-4xl leading-relaxed" style={{ fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif', lineHeight: '150%' }}>
                  Every transformation begins with individuals and extends throughout entire organizations."
                </p>
              </div>

              {/* CTA Button */}
              <Link
                href="/contactus"
                className="flex  px-6 py-3 sm:px-8 sm:py-4 justify-center items-center gap-2 rounded border border-[#CCC] bg-[#D5EED7] text-[#282828] text-base font-bold transition-colors duration-200 hover:bg-[#C5DEC7]"
                style={{ fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif' }}
              >
                How Can We Help You?
              </Link>
            </div>
          </div>
        </div>
        <div className="px-16 bg-gradient-to-t from-[#053328] to-transparent">
          <div
            className="
      hidden lg:grid lg:grid-cols-3 gap-6
    "
          >
            {/* Card 1 - Upcoming Projects */}
            <div
              className="relative h-56 rounded-[22px] overflow-hidden group"
            >

              {/* Glassmorphism Overlay */}
              <div
                className="absolute inset-0 bg-white/10 backdrop-blur-md border border-white/20 shadow-lg"
                style={{
                  backgroundImage: "url('/assets/home/hero/1.png')",
                  backgroundSize: "cover",
                  opacity: "70%",
                  backgroundPosition: "center",
                }}
              />

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center justify-center h-full p-8 text-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="flex flex-col items-center gap-2">
                    <p className="text-sm text-[#D6EFD8] font-medium">
                      Upcoming Projects
                    </p>
                    <h3 className="text-base text-[#D6EFD8] font-medium">
                      LUMINA TALENT INTRODUCES
                    </h3>
                  </div>
                  <p className="text-base text-[#F3F3F3] leading-6">
                    Stay tuned for our latest initiatives and featured film, soon to be released in cinemas.                  </p>
                </div>
              </div>

              {/* Bottom "Read More" Bar */}
              <Link href="#"
                cursor-pointer className="absolute bottom-[-50px] left-0 right-0 h-10 
    bg-white/10 backdrop-blur-md border-t border-white/20 shadow-md
    flex items-center justify-center 
    transition-all duration-500 ease-out 
    group-hover:bottom-0 cursor-pointer"
              >
                <span className="text-white text-base ">
                  Read more
                </span>
              </Link>
            </div>

            {/* Card 2 - Industries We Serve */}
            <div className="relative h-56 rounded-[22px] bg-[rgba(255,224,170,0.20)] overflow-hidden group">
              <div
                className="absolute inset-0 bg-white/10 backdrop-blur-md border border-white/20 shadow-lg"
                style={{
                  backgroundImage: "url('/assets/home/hero/2.png')",
                  backgroundSize: "cover",
                  opacity: "70%",
                  backgroundPosition: "center",
                }}
              />

              <div className="relative z-10 flex flex-col items-center justify-center h-full p-8 text-center">
                <div className="flex flex-col items-center gap-6">
                  <div className="flex flex-col items-center gap-2">
                    <p className="text-sm text-[#D6EFD8] font-medium" style={{ fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif' }}>
                      Industries We Serve
                    </p>
                    <h3 className="text-base text-[#D6EFD8] font-medium" style={{ fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif' }}>
                      LUMINA TALENT INTRODUCES                    </h3>
                  </div>
                  <p className="text-base text-[#F3F3F3] leading-6" style={{ fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif' }}>
                    From healthcare and fashion to tech and real estate, explore the diverse industries we cater to with tailored strategies.                  </p>
                </div>
              </div>

              <Link href="#" className="cursor-pointer absolute bottom-[-50px] left-0 right-0 h-10 
             bg-white/10 backdrop-blur-md 
             border-t border-white/20 shadow-md
             flex items-center justify-center 
             transition-all duration-500 ease-out 
             group-hover:bottom-0 cursor-pointer"
              >
                <span
                  className="text-white text-base"
                  style={{ fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif' }}
                >
                  Read more
                </span>
              </Link>
            </div>

            {/* Card 3 - Our Services */}
            <div className="relative h-56 rounded-[22px]  overflow-hidden group">
              {/* Background Pattern */}

              <div
                className="absolute inset-0 bg-white/10 backdrop-blur-md border border-white/20 shadow-lg"
                style={{
                  backgroundImage: "url('/assets/home/hero/3.png')",
                  opacity: "70%",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />


              <div className="relative z-10 flex flex-col items-center justify-center h-full p-8 text-center">
                <div className="flex flex-col items-center gap-6">
                  <div className="flex flex-col items-center gap-2">
                    <p className="text-sm text-[#D6EFD8] font-medium" style={{ fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif' }}>
                      Industries We Serve
                    </p>
                    <h3 className="text-base text-[#D6EFD8] font-medium" style={{ fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif' }}>
                      LUMINA TALENT INTRODUCES
                    </h3>
                  </div>
                  <p className="text-base text-[#F3F3F3] leading-6" style={{ fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif' }}>
                    " From healthcare and fashion to tech and real estate, explore the diverse industries we cater to with tailored strategies.
                  </p>
                </div>
              </div>

              <Link href="#"
                cursor-pointer className="absolute bottom-[-50px] left-0 right-0 h-10 
             bg-white/10 backdrop-blur-md 
             border-t border-white/20 shadow-md
             flex items-center justify-center 
             transition-all duration-500 ease-out 
             group-hover:bottom-0 cursor-pointer"
              >
                <span
                  className="text-white text-base"
                  style={{ fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif' }}
                >
                  Read more
                </span>
              </Link>
            </div>
          </div>
          {/* Carousel for < lg */}
          <div
            className="
      flex gap-6 lg:hidden overflow-x-auto snap-x snap-mandatory px-2
      scrollbar-hide
    "
          >
            <div className="snap-start shrink-0 w-[100%] sm:w-[48%]">
              {/* Card 1 - Upcoming Projects */}
              <div
                className="relative h-60 rounded-[22px] overflow-hidden group bg-cover bg-center"

              >
                <div
                  className="absolute inset-0 bg-white/10 backdrop-blur-md border border-white/20 shadow-lg"
                  style={{
                    backgroundImage: "url('/assets/home/hero/1.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />

                <div className="relative z-10 flex flex-col items-center justify-center h-full p-4 sm:p-8 text-center">
                  <div className="flex flex-col items-center gap-4">
                    <div className="flex flex-col items-center gap-2">
                      <p className="text-sm text-[#D6EFD8] font-medium" style={{ fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif' }}>
                        Upcoming Projects
                      </p>
                      <h3 className="text-base text-[#D6EFD8] font-medium" style={{ fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif' }}>
                        LUMINA TALENT INTRODUCES
                      </h3>
                    </div>
                    <p className="text-sm sm:text-base text-[#F3F3F3] leading-6" style={{ fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif' }}>
                      Stay tuned for our latest initiatives and featured film, soon to be released in cinemas.
                    </p>
                  </div>
                </div>
                <Link href="#" className='cursor-pointer absolute bottom-0 h-10  bg-white/10 backdrop-blur-md 
             border-t border-white/20 shadow-md w-full'>
                  <div className='w-full flex items-center justify-center h-full'>

                    <ForwardIcon />
                  </div>
                </Link>
              </div>
            </div>
            <div className="snap-start shrink-0 w-[100%] sm:w-[48%]">
              {/* Card 2 - Industries We Serve */}
              <div className="relative h-60 rounded-[22px] bg-[rgba(255,224,170,0.20)] overflow-hidden group">
                {/* Background Pattern */}
                <div
                  className="absolute inset-0 bg-white/10 backdrop-blur-md border border-white/20 shadow-lg"
                  style={{
                    backgroundImage: "url('/assets/home/hero/2.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />

                <div className="relative z-10 flex flex-col items-center justify-center h-full p-4 sm:p-8 text-center">
                  <div className="flex flex-col items-center gap-6">
                    <div className="flex flex-col items-center gap-2">
                      <p className="text-sm text-[#D6EFD8] font-medium" style={{ fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif' }}>
                        Our Services
                      </p>
                      <h3 className="text-base text-[#D6EFD8] font-medium" style={{ fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif' }}>
                        LUMINA TALENT INTRODUCES
                      </h3>
                    </div>
                    <p className="text-sm md:text-base text-[#F3F3F3] leading-6" style={{ fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif' }}>
                      Explore the wide range of solutions we provide to help your business grow and thrive.
                    </p>
                  </div>
                </div>

                <Link href="#" className='cursor-pointer absolute bottom-0 h-10  bg-white/10 backdrop-blur-md 
             border-t border-white/20 shadow-md w-full'>
                  <div className='w-full flex items-center justify-center h-full'>

                    <ForwardIcon />
                  </div>
                </Link>
              </div>
            </div>
            <div className="snap-start shrink-0 w-[100%] sm:w-[48%]">
              {/* Card 3 - Our Services */}
              <div className="relative h-60 rounded-[22px]  overflow-hidden group">
                {/* Background Pattern */}

                <div
                  className="absolute inset-0 bg-white/10 backdrop-blur-md border border-white/20 shadow-lg"
                  style={{
                    backgroundImage: "url('/assets/home/hero/3.png')",

                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />


                <div className="relative z-10 flex flex-col items-center justify-center h-full p-4 sm:p-8 text-center">
                  <div className="flex flex-col items-center gap-6">
                    <div className="flex flex-col items-center gap-2">
                      <p className="text-sm text-[#D6EFD8] font-medium" style={{ fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif' }}>
                        Industries We Serve
                      </p>
                      <h3 className="text-base text-[#D6EFD8] font-medium" style={{ fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif' }}>
                        LUMINA TALENT INTRODUCES
                      </h3>
                    </div>
                    <p className="text-sm md:text-base text-[#F3F3F3] leading-6" style={{ fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif' }}>
                      From healthcare and fashion to tech and real estate, explore the diverse industries we cater to with tailored strategies.
                    </p>
                  </div>
                </div>

                <Link href="#" className='cursor-pointer absolute bottom-0 h-10  bg-white/10 backdrop-blur-md 
             border-t border-white/20 shadow-md w-full'>
                  <div className='w-full flex items-center justify-center h-full'>

                    <ForwardIcon />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Who We Are Section */}
      <ServicesSection />

      {/* Featured Insights Section */}
      {/* <FuturedInsights /> */}

      {/* Maximize Section */}
      <MaximizeSection />

      {/* CTA Section */}
      <CTASection />

      {/* Industries We Serve Section */}
      <IndustriesSection />

      {/* Stats Section */}
      <StatsSection />

      {/* News Carousel Section */}
      <NewsCarousel />

      {/* We're Hiring Section */}
      <HiringSection />

      {/* Contact Form Section */}
      <ContactFormSection />

    </div>
  );
}
