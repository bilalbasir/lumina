import Link from 'next/link';

const CTASection = () => {
  return (
    <section className="bg-[#053328] py-10 px-4 sm:px-6 lg:px-20">
      <div className=" mx-auto">
        <div className="relative md:h-[308px] py-4 bg-[#F0FDFA]/50 rounded-3xl flex flex-col justify-center items-center px-6 sm:px-12 overflow-hidden">
          {/* Background Image */}
          <div
            className="absolute inset-0 flex items-center justify-end"
            style={{
              backgroundImage: "url('/assets/home/unlockOrgImg.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundColor: "rgba(255,255,255,0.6)", // white overlay
              backgroundBlendMode: "overlay", // blend with image
            }}
          />

          {/* <img
              src="/assets/home/unlockOrgImg.png"
              alt=""
              className="w-full h-full object-cover"
            />
          </div> */}

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center gap-6  text-center">
            {/* Heading and Subtitle */}
            <div className="flex flex-col items-center gap-4">
              <h2
                className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#111827] leading-[140%]"
                style={{ fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif' }}
              >
                Ready to unlock your organization's potential?
              </h2>
              <p
                className=" text-base sm:text-lg md:text-xl text-[#686868] leading-[150%] max-w-[692px]"
                style={{ fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif' }}
              >
                Whatever your business strategy, we can help you achieve extraordinary through the power of your people and organizational excellence.
              </p>
            </div>

            {/* CTA Button */}
            <Link
              href="/contactus"
              className="flex h-[52px] px-8 py-4 justify-center items-center gap-2 rounded border border-[#CCC] bg-[#00624F] text-white text-base font-medium transition-colors duration-200 hover:bg-[#053328]"
              style={{ fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif' }}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
