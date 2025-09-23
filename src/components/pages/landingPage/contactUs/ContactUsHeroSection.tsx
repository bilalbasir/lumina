import HeroImgSvg from "@/components/svgDesign/heroImgSvg";

const ContactUsHeroSection = () => {
  return (
    <section className="relative w-full h-[600px] overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">

        {/* Background Image */}
        <img
          src="/assets/contactUs/heroImg.png"
          alt="Hero Background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Gradient Overlay */}
        <HeroImgSvg />

        {/* Blur Effect */}
        <div className="absolute left-[1181px] top-[475px]">
          <svg
            width="310"
            height="310"
            viewBox="0 0 525 391"
            fill="none"
            className="w-[310px] h-[310px] rounded-full"
            style={{ filter: 'blur(132.65px)' }}
          >
            <g filter="url(#filter0_f_928_786)">
              <circle cx="421" cy="421" r="155" fill="#04382D" />
            </g>
            <defs>
              <filter id="filter0_f_928_786" x="0.700012" y="0.700012" width="840.6" height="840.6" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur stdDeviation="132.65" result="effect1_foregroundBlur_928_786" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex items-center justify-center h-full px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-10 w-full max-w-[824px] text-center">
          {/* Main Title */}
          <div className="flex flex-col items-center gap-0.5">
            <h1
              className="text-3xl sm:text-4xl lg:text-[48px] font-bold leading-tight lg:leading-[57.6px]"
              style={{ fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif' }}
            >
              <span style={{ color: '#D5EED7' }}>Contact </span>
              <span style={{ color: '#2CC294' }}>us</span>
            </h1>

            {/* Subtitle */}
            <p
              className="text-lg md:text-xl lg:text-[28px] text-white leading-[150%] w-full max-w-[824px] mt-0.5"
              style={{ fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif' }}
            >
              Get in touch with us for tailored recruitment solutions, expert insights, or any inquiries. We're here to help your business grow.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUsHeroSection;
