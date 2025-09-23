
'use client'
import HeroImgSvg from "@/components/svgDesign/heroImgSvg";

interface ApplyFormHeroSectionProps {
  jobTitle?: string;
}

const ApplyFormHeroSection = ({ jobTitle }: ApplyFormHeroSectionProps) => {
  return (
    <section className="relative w-full h-[428px] overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[#053328]">
        {/* Main Background Image */}
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/4d80ba1f0265f62601993fa1395ac90fa457db45?width=2960"
          alt="Apply form background"
          className="absolute left-[-20px] top-[-22px] w-[1480px] h-[987px] object-cover"
        />



        {/* Gradient Overlay */}
        <HeroImgSvg />

        {/* Blur Effect */}
        <div className="absolute left-[1181px] top-[475px]">
          <svg
            width="310"
            height="310"
            viewBox="0 0 525 219"
            fill="none"
            className="w-[310px] h-[310px] rounded-full"
            style={{ filter: 'blur(132.65px)' }}
          >
            <g filter="url(#filter0_f_905_4277)">
              <circle cx="421" cy="421" r="155" fill="#04382D" />
            </g>
            <defs>
              <filter id="filter0_f_905_4277" x="0.700012" y="0.700012" width="840.6" height="840.6" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur stdDeviation="132.65" result="effect1_foregroundBlur_905_4277" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex items-center justify-center h-full px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-10 w-full max-w-[354px] text-center">
          {/* Main Title */}
          <div className="flex flex-col items-center gap-0.5">
            <h1
              className="text-4xl md:text-5xl lg:text-[64px] font-bold leading-tight lg:leading-[103.2px] text-[#D5EED7]"
              style={{ fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif' }}
            >
              Apply Form
            </h1>

            {/* Optional Job Title Subtitle */}
            {jobTitle && (
              <p
                className="text-lg md:text-xl text-white/80 leading-[150%] mt-2"
                style={{ fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif' }}
              >
                {jobTitle}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApplyFormHeroSection;
