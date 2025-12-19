import ContactUs from '@/components/pages/landingPage/aboutUs/ContactUs';
import OurTeamMembers from '@/components/pages/landingPage/aboutUs/OurTeamMembers';
import OurValues from '@/components/pages/landingPage/aboutUs/OurValues';
import HeroImgSvg from '@/components/svgDesign/heroImgSvg';
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'About Us | Lumina Talent Advisory',
  description: 'Learn about Lumina Talent Advisory\'s mission, values, and commitment to connecting exceptional talent with leading organizations.',
};

export default function AboutUs() {
  return (
    <div className='bg-white'>
      {/* Hero Section */}
      <section className="relative w-full h-screen overflow-hidden">
        {/* Hero Background Image */}
        <div className="absolute inset-0">
          {/* Main Background Image */}
          <img
            src="/assets/aboutUs/hero/heroImg.png"
            alt="Careers background"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Gradient Overlay */}
          <HeroImgSvg />




        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex items-center justify-center h-full px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center  text-center">
            <h1
              className="text-4xl md:text-5xl  lg:text-[48px] font-bold leading-tight lg:leading-[65.2px] text-[#D5EED7]"
              style={{ fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif' }}
            >
              About Lumina Talent Advisory
            </h1>

            {/* Subtitle */}
            <p
              className="text-lg md:text-xl lg:text-[28px] text-white leading-[42px] w-full max-w-[824px] "
              style={{ fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif' }}
            >
              Empowering talent, driving growth, shaping the future of industries.            </p>
          </div>
        </div>
      </section>

      {/* About Content */}
      <div className="max-w-7xl mx-auto  py-12  ">
        {/* WHO WE ARE SECTION STARTS */}
        <div className="grid lg:grid-cols-2 gap-10 items-center  mb-8 sm:mb-12 md:mb-16">
          <div className="relative h-[358px] sm:rounded-2xl overflow-hidden">
            <Image
              src="/assets/aboutUs/whoWeAre.png"
              alt="Who we are?"
              fill
              className="object-cover"
            />
          </div>
          <div className="w-[100%] flex flex-col gap-y-3 px-4 sm:px-0">
            <h1 className='text-[24px]  md:text-[32px] lg:text-[48px] md:leading-[57px] text-[#131313] font-semibold'>
              Who We Are
            </h1>
            <p className='text-[16px] text-[#383838] leading-6'>We are a team of passionate professionals committed to bridging the gap between talent and opportunity. With expertise, dedication, and a forward-thinking approach, we empower businesses and individuals to achieve success in today’s evolving global economy.</p>
          </div>
        </div>
        {/* WHO WE ARE SECTION ENDs */}
        {/* Our Mission SECTION STARTS */}
        <div className="grid lg:grid-cols-2 gap-10 items-center mb-8 sm:mb-12 md:mb-16">

          <div className="w-[100%] flex flex-col gap-y-3  px-4 sm:px-0">
            <h1 className='text-[24px]  md:text-[32px] lg:text-[48px] md:leading-[57px] text-[#131313] font-semibold'>
              Our Mission
            </h1>
            <p className='text-[16px] text-[#383838] leading-6'>At Lumina Talent Advisory, we believe that exceptional talent is the cornerstone of organizational success. We partner with forward-thinking companies to identify, attract, and develop the leaders who will drive innovation and growth in tomorrow&apos;s economy.</p>
            <p className='text-[16px] text-[#383838] leading-6 mt-4'>Our mission is to illuminate the path between ambitious organizations and transformational talent, creating connections that generate lasting value for businesses, individuals, and communities worldwide.</p>
          </div>
          <div className='relative h-[358px] rounded-2xl'>
            <Image
              src={"/assets/aboutUs/ourMission.png"}
              alt='Our Mission?'
              fill
              className='rounded-2xl'
            />
          </div>
        </div>
        {/* Our Vision SECTION ENDs */}
        {/* Our Vision SECTION STARTS */}
        <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 md:gap-10 items-center  mb-8 sm:mb-12 md:mb-16">
          <h1 className='text-[24px] md:hidden px-4 md:text-[32px] lg:text-[48px] md:leading-[57px] text-[#131313] font-semibold'>            Our Vision
          </h1>
          <div className='relative h-[358px]  md:rounded-2xl'>
            <Image
              src={"/assets/aboutUs/ourVision.png"}
              alt='Our Vision?'
              fill
              className='rounded-2xl'
            />
          </div>
          <div className="w-[100%] flex flex-col gap-y-3 px-4">
            <h1 className='hidden md:block text-[48px]  leading-[57px] text-[#131313] font-semibold'>
              Our Vision
            </h1>
            <p className='text-[16px] text-[#383838] md:leading-6'>Our vision is to shape a future where organizations and individuals thrive through the power of exceptional talent. We strive to create a global community of leaders who inspire innovation, embrace change, and drive meaningful impact across industries and societies.</p>
            <p className='text-[16px] text-[#383838] md:leading-6 mt-4'>
              Our mission is to illuminate the path between ambitious organizations and transformational talent, creating connections that generate lasting value for businesses, individuals, and communities worldwide.</p>
          </div>
        </div>
        {/* Our Vision SECTION ENDs */}



        {/* Our values */}
        <OurValues />

      </div>
      {/* Our Team Members */}
      <OurTeamMembers />

      <ContactUs />
    </div>
  );
}
