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
import { SequentialTyping } from '@/components/typingAnimation/TypingAnimaiton';

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
      <section className="relative w-full min-h-screen overflow-hidden bg-black bg-no-repeat bg-cover bg-center">
        {/* Background Video */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/assets/homeVideo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="absolute inset-0 bg-gradient-to-t from-[#053328] via-transparent to-transparent opacity-75"></div>

        {/* Optional semi-black overlay */}
        <div className="absolute inset-0 bg-black opacity-25"></div>

        {/* Hero Content */}
        <div className="relative z-10 flex items-center justify-center h-screen">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex flex-col items-center gap-10">
              {/* Main Title */}
              <div className="flex flex-col items-center gap-1 mt-4 justify-center">
                <h1 className="text-5xl md:text-8xl lg:text-[92px] font-bold leading-tight"
                  style={{ fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif' }}>
                  <SequentialTyping
                    lines={["SHAPING", "TOMORROW’S", "LEADER’S TODAY"]}
                    speed={50} // smaller = smoother/faster typing
                  />
                </h1>
                <p
                  className="text-lg md:text-2xl lg:text-[28px] text-white max-w-4xl leading-relaxed"
                  style={{ fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif', lineHeight: '150%' }}
                >
                  Strategic recruitment and leadership advisory, bridging Dubai and London to deliver world-class talent solutions
                </p>
              </div>
              {/* CTA Button */}
              <Link
                href="/contactus"
                className="flex px-6 py-3 sm:px-8 sm:py-4 justify-center items-center gap-2 rounded border border-[#CCC] bg-[#D5EED7] text-[#282828] text-base font-bold transition-colors duration-200 hover:bg-[#C5DEC7]"
                style={{ fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif' }}
              >
                How Can We Help You?
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-[#053328] pointer-events-none"></div>

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
