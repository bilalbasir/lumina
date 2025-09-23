import { Metadata } from 'next';
import ServicesGrid from '@/components/pages/landingPage/services/ServicesGrid';
import HeroImgSvg from '@/components/svgDesign/heroImgSvg';

export const metadata: Metadata = {
  title: 'Our Services | Lumina Talent Advisory',
  description: 'Explore our comprehensive talent advisory services designed to help your business find and retain top talent.',
};

export default function Services() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative w-full h-[600px] overflow-hidden">
        {/* Background Image */}
        <img
          src="/assets/services/serviceHeroImg.png"
          alt="Hero Background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Gradient Overlay */}
        <HeroImgSvg />

        {/* Hero Content */}
        <div className="relative z-10 flex items-center justify-center h-full px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-10 max-w-4xl text-center">
            <div className="flex flex-col items-center gap-0.5">
              <h1
                className="text-4xl md:text-5xl lg:text-[64px] font-bold leading-[103.2px]"
                style={{
                  fontFamily: "Onest, -apple-system, Roboto, Helvetica, sans-serif",
                }}
              >
                <span className="text-[#2CC294]">Our </span>
                <span className="text-[#D5EED7]">Services</span>
              </h1>
              <p
                className="text-lg md:text-xl lg:text-[28px] text-white leading-[150%] max-w-[824px]"
                style={{
                  fontFamily: "Onest, -apple-system, Roboto, Helvetica, sans-serif",
                }}
              >
                Comprehensive talent advisory solutions for every industry.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* Services Grid */}
      <ServicesGrid />
    </div>
  );
}
