import Link from 'next/link';

const CTADiscoverSection = () => {
  return (
    <section className="w-full py-16 bg-white">
      <div className="w-full md:max-w-7xl mx-auto  md:px-6 lg:px-72">
        <div className="flex flex-col justify-center items-center gap-6 p-8 sm:p-12 lg:px-24 lg:py-8 md:rounded-[20px] bg-[#D5EED7]">
          {/* Section Content */}
          <div className="flex flex-col items-center gap-4 text-center">
            {/* Main Title */}
            <h2
              className="text-2xl md:text-[28px] font-bold text-[#333] leading-[150%]"
              style={{ fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif' }}
            >
              Discover how Lumina can help your business thrive
            </h2>

            {/* Description */}
            <p
              className="text-base text-[#666] leading-[150%] max-w-4xl"
              style={{ fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif' }}
            >
              Ready to transform your talent acquisition strategy? Let's discuss how our proven methodology can help you build the exceptional team your business deserves.
            </p>
          </div>

          {/* CTA Button */}
          <Link
            href="/contactus"
            className="flex w-full md:w-auto  h-[52px] px-4 py-4 justify-center items-center gap-2 rounded bg-[#00624F] text-white text-base font-medium transition-colors duration-200 hover:bg-[#053328] focus:outline-none focus:ring-2 focus:ring-[#00624F] focus:ring-offset-2 focus:ring-offset-[#D5EED7]"
            style={{ fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif' }}
          >
            Contact Us Today
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTADiscoverSection;
