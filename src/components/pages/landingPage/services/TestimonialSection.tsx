const TestimonialSection = () => {
  return (
    <section className="relative w-full py-6 sm:h-[647px] bg-white overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0">


        {/* Background Pattern 2 */}
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/4760197400a9e226ab0b57e220ae527b861d8dc8?width=3840"
          alt=""
          className="w-full h-[800px] object-cover"
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-6 lg:px-28">
        <div className="flex flex-col items-center  max-w-5xl">
          {/* Quotation Icon */}
          <div className="mb-6">
            <svg width="64" height="60" viewBox="0 0 64 60" fill="none">
              <path d="M13.6502 44.1501C12.3169 42.7168 11.3335 41.2001 10.7002 39.6001C10.0335 37.8334 9.7002 35.7501 9.7002 33.3501C9.7002 30.4834 10.3502 27.7168 11.6502 25.0501C12.8835 22.4501 14.6335 20.1001 16.9002 18.0001C19.1669 15.9001 21.8002 14.2001 24.8002 12.9001L27.0002 16.3501C24.4335 17.7501 22.3335 19.3668 20.7002 21.2001C19.3669 22.6668 18.3335 24.3001 17.6002 26.1001C17.1002 27.3668 16.7002 28.8001 16.4002 30.4001C17.0669 30.0668 17.8169 29.8334 18.6502 29.7001C19.4835 29.5668 20.3335 29.5334 21.2002 29.6001C22.7002 29.7668 24.0669 30.2501 25.3002 31.0501C26.5335 31.8501 27.5085 32.8918 28.2252 34.1751C28.9419 35.4584 29.3002 36.8501 29.3002 38.3501C29.3002 39.9168 28.9085 41.3751 28.1252 42.7251C27.3419 44.0751 26.2752 45.1418 24.9252 45.9251C23.5752 46.7084 22.1169 47.1001 20.5502 47.1001C19.2502 47.1001 17.9835 46.8334 16.7502 46.3001C15.5169 45.7668 14.4835 45.0501 13.6502 44.1501ZM38.6502 44.1501C37.3169 42.7168 36.3335 41.2001 35.7002 39.6001C35.0335 37.8334 34.7002 35.7501 34.7002 33.3501C34.7002 30.4834 35.3502 27.7168 36.6502 25.0501C37.8835 22.4501 39.6335 20.1001 41.9002 18.0001C44.1669 15.9001 46.8002 14.2001 49.8002 12.9001L52.0002 16.3501C49.4335 17.7501 47.3335 19.3668 45.7002 21.2001C44.3669 22.6668 43.3335 24.3001 42.6002 26.1001C42.1002 27.3668 41.7002 28.8001 41.4002 30.4001C42.0669 30.0668 42.8169 29.8334 43.6502 29.7001C44.4835 29.5668 45.3335 29.5334 46.2002 29.6001C47.7002 29.7668 49.0669 30.2501 50.3002 31.0501C51.5335 31.8501 52.5085 32.8918 53.2252 34.1751C53.9419 35.4584 54.3002 36.8501 54.3002 38.3501C54.3002 39.9168 53.9085 41.3751 53.1252 42.7251C52.3419 44.0751 51.2752 45.1418 49.9252 45.9251C48.5752 46.7084 47.1169 47.1001 45.5502 47.1001C44.2502 47.1001 42.9835 46.8334 41.7502 46.3001C40.5169 45.7668 39.4835 45.0501 38.6502 44.1501Z" fill="white" />
            </svg>
          </div>

          {/* Testimonial Content */}
          <div className="flex flex-col items-center gap-8 max-w-[773px] text-center">
            {/* Testimonial Text */}
            <p
              className="text-xl md:text-2xl lg:text-[28px] text-white leading-[150%]"
              style={{ fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif' }}
            >
              "Lumina transformed our hiring process completely. Their strategic approach to talent acquisition helped us build a world-class engineering team that has been instrumental in our 300% growth over the past year."
            </p>

            {/* Client Info */}
            <div className="flex items-center justify-center gap-4">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/e8a7137b15673a6b5c2fc755a3c1d9b42e52b356?width=128"
                alt="Sarah Chen"
                className="w-16 h-16 rounded-full border-4 border-white/20"
              />
              <div className="flex flex-col items-start">
                <h4
                  className="text-lg font-bold text-white leading-[155%]"
                  style={{ fontFamily: 'Roboto, -apple-system, Roboto, Helvetica, sans-serif' }}
                >
                  Sarah Chen
                </h4>
                <p
                  className="text-base text-[#DBEAFE] leading-[150%]"
                  style={{ fontFamily: 'Roboto, -apple-system, Roboto, Helvetica, sans-serif' }}
                >
                  CEO, TechVision Inc.
                </p>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="flex flex-col md:flex-row justify-between items-center w-full  lg:max-w-6xl gap-8 md:gap-4 mt-12">
            {/* Stat 1 - Successful Placements */}
            <div className="flex flex-col items-center text-center w-full lg:w-[384px]">
              <h3
                className="text-3xl md:text-[36px] font-bold text-white leading-[140%] mb-2"
                style={{ fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif' }}
              >
                500+
              </h3>
              <p
                className="text-base text-[#E5E5E5] leading-[150%]"
                style={{ fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif' }}
              >
                Successful Placements
              </p>
            </div>

            {/* Stat 2 - Average Time to Hire */}
            <div className="flex flex-col items-center text-center w-full lg:w-[384px]">
              <h3
                className="text-3xl md:text-[36px] font-bold text-white leading-[140%] mb-2"
                style={{ fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif' }}
              >
                45
              </h3>
              <p
                className="text-base text-[#E5E5E5] leading-[150%]"
                style={{ fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif' }}
              >
                Days Average Time to Hire
              </p>
            </div>

            {/* Stat 3 - Client Satisfaction Rate */}
            <div className="flex flex-col items-center text-center w-full lg:w-[384px]">
              <h3
                className="text-3xl md:text-[36px] font-bold text-white leading-[140%] mb-2"
                style={{ fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif' }}
              >
                98%
              </h3>
              <p
                className="text-base text-[#E5E5E5] leading-[150%]"
                style={{ fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif' }}
              >
                Client Satisfaction Rate
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
