'use client'
import PrimaryButton from '@/components/button/PrimaryButton';
import { useRouter } from 'next/navigation';

const ServicesSection = () => {
  const router = useRouter()
  return (
    <section className="bg-[#053328] py-10 lg:py-16">
      <div className="px-4 md:px-20 mx-auto ">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          {/* Image Side */}
          <div className="w-full lg:w-auto lg:flex-shrink-0">
            <div className="relative">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/45399ba079a2801ed965e51e4688171800240086?width=1046"
                alt="Business professionals in a meeting discussing talent advisory services"
                className="w-full lg:w-[523px] h-[250px] lg:h-[358px] object-cover rounded-[15px]"
              />
            </div>
          </div>

          {/* Content Side */}
          <div className="flex-1 text-white">
            <div className="space-y-6 lg:space-y-8">
              {/* Title with decorative line */}
              <div className="flex items-center gap-4">
                <h2
                  className="text-3xl lg:text-5xl font-bold text-[#F3F3F3] whitespace-nowrap"
                  style={{
                    fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif',
                    fontSize: 'clamp(2rem, 4vw, 3rem)'
                  }}
                >
                  Who We Are
                </h2>
                <div className="h-0.5 flex-1 bg-[#2CC294]"></div>
              </div>

              {/* Description Text */}
              <div className="space-y-4">
                <p
                  className="text-sm md:text-base lg:text-lg leading-relaxed text-[#E5E5E5]"
                  style={{ fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif' }}
                >
                  At Lumina Talent Advisory, we believe that exceptional organizations are built on
                  exceptional talent. With over two decades of experience, we partner with forward-thinking
                  companies to unlock human potential and drive sustainable growth.
                </p>

                <p
                  className="text-sm md:text-base lg:text-lg leading-relaxed text-[#E5E5E5]"
                  style={{ fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif' }}
                >
                  Our comprehensive approach combines strategic insights, innovative methodologies, and
                  deep industry expertise to help organizations attract, develop, and retain top talent in an
                  ever-evolving business landscape.
                </p>
              </div>

              {/* CTA Button */}
              <div className='w-full'>

                <PrimaryButton text='Read more about us' onClick={() => router.push("/aboutus")} width='w-full lg:w-auto' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
