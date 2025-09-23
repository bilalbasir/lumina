import HeroImgSvg from "../../../svgDesign/heroImgSvg";

const CareersHeroSection = () => {
  return (
    <section className="relative w-full h-[600px] overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Main Background Image */}
        <img
          src="/assets/careers/hero/careerHeroSectionImg.png"
          alt="Careers background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <HeroImgSvg />




      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex items-center justify-center h-full px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-10 w-full max-w-[824px] text-center">
          {/* Main Title */}
          <div className="flex flex-col items-center gap-0.5">
            <h1
              className="text-4xl md:text-5xl lg:text-[64px] font-bold leading-tight lg:leading-[103.2px] text-[#D5EED7]"
              style={{ fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif' }}
            >
              Careers
            </h1>

            {/* Subtitle */}
            <p
              className="text-lg md:text-xl lg:text-[28px] text-white leading-[150%] w-full max-w-[824px] mt-0.5"
              style={{ fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif' }}
            >
              Explore opportunities to grow your career at Lumina Talent Advisory
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareersHeroSection;
