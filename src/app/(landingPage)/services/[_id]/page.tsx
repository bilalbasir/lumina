'use client'
import TestimonialSection from '@/components/pages/landingPage/services/TestimonialSection';
import CTADiscoverSection from '@/components/pages/landingPage/services/CTADiscoverSection';
import HeroImgSvg from '@/components/svgDesign/heroImgSvg';
import CirclePlusIcon from '@/components/icons/circlePlusIcon/CirclePlusIcon';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import serviceApi from '@/app/apiServices/servicesApi/ServiceApi';
import defaultServiceBanner from '../../../../../public/assets/services/slugServiceHeroImg.png'
import { cloudinaryBaseUrl } from '@/app/apiServices/baseUrl/BaseUrl';
import Image from 'next/image';







export default function ServiceDetailPage() {
  const params = useParams()
  const id = params?._id as string;
  const [serviceData, setServiceData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  // Fetch service detail
  useEffect(() => {
    if (!id) return;

    const fetchService = async () => {
      try {
        setLoading(true);
        // Try fetching by slug first
        try {
          const res = await serviceApi.getServiceBySlug(id);
          if (res?.data) {
            setServiceData(res.data);
            return;
          }
        } catch (err) {
          console.log("No slug found, trying ID...");
        }

        // Fallback to fetching by ID
        const resId = await serviceApi.getServiceId(id);
        setServiceData(resId.data);
      } catch (err) {
        console.error("❌ Error fetching service:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);
  if (loading) {
    return <div className="text-center py-20">Loading service...</div>;
  }

  if (!serviceData) {
    return <div className="text-center py-20 text-red-500">Service not found.</div>;
  }


  console.log("id>>>>>>>>>>>>", serviceData);

  return (
    <div>
      {/* Service Detail Hero Section */}
      <section className="relative w-full h-[600px] overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">

          {
            serviceData.bannerImage && (
              // <img
              //   src={`${imageBaseUrl}/${serviceData.bannerImage2}`}
              //   alt="Hero Background"
              //   width={1920}
              //   height={1080}
              //   className="absolute inset-0 w-full h-full object-cover"
              // />

              <Image
                src={serviceData.bannerImage ? `${cloudinaryBaseUrl}/${serviceData.bannerImage}` : defaultServiceBanner}
                width={1920}
                height={1080}
                alt="Hero Background"
                className="absolute inset-0 w-full h-full object-cover"
              />
            )
          }
          {/* Gradient Overlay */}
          <HeroImgSvg />


          {/* Blur Effect */}
          <div className="absolute right-[1181px] top-[475px]">
            <svg
              width="525"
              height="391"
              viewBox="0 0 525 391"
              fill="none"
              className="w-[310px] h-[310px] rounded-full filter blur-[132.65px]"
            >
              <g filter="url(#filter0_f_946_931)">
                <circle cx="421" cy="421" r="155" fill="#04382D" />
              </g>
              <defs>
                <filter id="filter0_f_946_931" x="0.700012" y="0.700012" width="840.6" height="840.6" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                  <feGaussianBlur stdDeviation="132.65" result="effect1_foregroundBlur_946_931" />
                </filter>
              </defs>
            </svg>
          </div>
        </div>

        {/* Service Content */}
        <div className="relative z-10 flex items-center justify-center h-full px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-10 max-w-4xl text-center ">
            {/* Service Title */}
            <div className="flex flex-col items-center gap-0.5">
              <h1
                className="text-4xl md:text-5xl lg:text-[64px] font-bold leading-[43.3px] md:leading-[63.2px] lg:leading-[83.2px] xl:leading-[103.2px]"
                style={{ fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif' }}
              >
                {/* <span className="text-[#2CC294]">{service.title.split(' ')[0]} </span>
                <span className="text-[#D5EED7]">{service.title.split(' ').slice(1).join(' ')}</span> */}
                <span className="text-[#2CC294]">{serviceData?.name} </span>
                <span className="text-[#D5EED7]">service</span>
              </h1>

              {/* Service Subtitle */}
              <p
                className="text-lg md:text-xl lg:text-[28px] text-white leading-[150%] max-w-[824px] mt-6 md:mt-0"
                style={{ fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif' }}
              >
                {/* {service.subtitle} */}
                {serviceData.subTitle || "Subtile Here"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Talent Solutions Section */}
      <section className="w-full py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4  sm:px-6 lg:px-20">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-16 h-[414px]">
            {/* Left Content */}
            <div className="flex-1 flex flex-col gap-8 h-[414px]">
              {/* Main Content */}
              <div className="flex flex-col gap-6 h-[414px]">
                {/* Title */}
                <h2
                  className="text-3xl  md:text-4xl lg:text-[48px] font-bold text-[#1D1D1D] leading-[43.3px] md:leading-[63.2px] lg:leading-[83.2px] xl:leading-[120%]"
                  style={{ fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif' }}
                >
                  {serviceData.subTitle || "Strategic Talent Solutions"}
                </h2>

                {/* Description */}
                <div
                  className="text-base text-[#686868] leading-[43.3px] md:leading-[63.2px] lg:leading-[83.2px] xl:leading-[150%] space-y-4 rich-text-content tiptap-content"
                  style={{ fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif' }}
                  dangerouslySetInnerHTML={{ __html: serviceData.description || "" }}
                />
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-4">
                {serviceData?.tags.map((tag: string, index: number) => {
                  const styles = [
                    { text: "text-[#1E40AF]", bg: "bg-[#DBEAFE]" }, // Blue
                    { text: "text-[#166534]", bg: "bg-[#DCFCE7]" }, // Green
                    { text: "text-[#6B21A8]", bg: "bg-[#F3E8FF]" }, // Purple
                  ];

                  const { text, bg } = styles[index % 3]; // cycle through styles

                  return (
                    <div
                      key={index}
                      className={`flex items-center px-4 py-2 rounded-full ${bg}`}
                    >
                      <span
                        className={`text-sm font-medium leading-[150%] ${text}`}
                        style={{ fontFamily: "Onest, -apple-system, Roboto, Helvetica, sans-serif" }}
                      >
                        {tag}
                      </span>
                    </div>
                  );
                })}


              </div>
            </div>

            {/* Right Image Container */}
            <div className="flex-1 relative md:max-w-[557px] h-[414px]  w-full">
              <div className="relative w-full h-[394px]">
                {/* Main Image */}
                <Image
                  src={serviceData.secondaryImage ? `${cloudinaryBaseUrl}/${serviceData.secondaryImage}` : "https://api.builder.io/api/v1/image/assets/TEMP/6e2d8f9761c4337dc69cc2923a5cfadc24136532?width=1046"}
                  alt="Team meeting discussing strategic talent solutions"
                  width={523}
                  height={358}
                  className="md:absolute md:left-[34px] md:top-0 w-full xl:w-[523px] h-[358px] object-cover rounded-[15.298px] shadow-lg"
                />

                {/* Success Rate Card */}
                <div className="absolute left-0 bottom-[10px]  md:left-0 md:bottom-0 w-full sm:w-[150px] md:w-[132px] md:h-[104px] bg-[#00634F] rounded-xl shadow-2xl
                 p-3 md:p-6 flex gap-x-4 md:gap-x-0 md:flex-col justify-center">
                  <div className="flex items-center mb-1">
                    <span
                      className="text-[28px] font-bold text-white leading-[150%]"
                      style={{ fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif' }}
                    >
                      {serviceData.serviceSuccessRate || "95%"}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span
                      className="text-sm  leading-[150%]"
                      style={{ fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif' }}
                    >
                      Success Rate
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Service Offerings Section */}
      <section className="w-full py-6 sm:py-16 bg-white">
        <div className="w-full sm:max-w-7xl mx-auto px-4 sm:px-6 lg:px-20">
          {/* Section Header */}
          <div className="flex flex-col items-center gap-2 text-center mb-10">
            <h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-[48px] font-bold text-[#1D1D1D] leading-[43.3px] md:leading-[63.2px] lg:leading-[83.2px] xl:leading-[120%]"
              style={{ fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif' }}
            >
              Key Service Offerings
            </h2>
            <p
              className="text-base sm:text-lg md:text-xl text-[#686868] max-w-[884px] leading-normal"
              style={{ fontFamily: 'Rubik, -apple-system, Roboto, Helvetica, sans-serif' }}
            >
              Comprehensive talent solutions designed to meet your unique recruitment challenges and business objectives
            </p>
          </div>
          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {serviceData?.features?.map((feature: any, index: number) => {
              const featureStyle = [
                {
                  cardBorder: "border-[rgba(255,210,210,0.63)]",
                  cardBg: "bg-[rgba(255,243,243,0.40)]",
                  iconBorder: "border-[#FAEDFF]",
                  iconBg: "bg-[#FAEDFF]",
                }, // Red-ish
                {
                  cardBorder: "border-[#D6FFCC]",
                  cardBg: "bg-[rgba(224,255,216,0.30)]",
                  iconBorder: "border-[#E0FFD8]",
                  iconBg: "bg-[#E0FFD8]",
                }, // Green
                {
                  cardBorder: "border-[#D2F3FF]",
                  cardBg: "bg-[rgba(229,248,255,0.40)]",
                  iconBorder: "border-[#E5F8FF]",
                  iconBg: "bg-[#E5F8FF]",
                }, // Blue
              ];

              const { cardBorder, cardBg, iconBorder, iconBg } = featureStyle[index % 3]; // cycle through

              return (
                <div
                  key={index}
                  className={`flex-1 p-6 rounded-[20px] border ${cardBorder} ${cardBg}`}
                >
                  <div className="flex flex-col gap-4">
                    {/* Icon */}
                    <div
                      className={`w-12 h-12 rounded-full border-8 ${iconBorder} ${iconBg} flex items-center justify-center`}
                    >
                      <CirclePlusIcon color="#6B21A8" />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col gap-2">
                      <h3
                        className="text-lg md:text-[22px] font-bold text-[#181818] leading-[150%]"
                        style={{
                          fontFamily:
                            "Onest, -apple-system, Roboto, Helvetica, sans-serif",
                        }}
                      >
                        {feature.title || "Candidate Sourcing"}
                      </h3>
                      <div
                        className="text-sm text-[#4E4E4E] leading-[150%] rich-text-content tiptap-content"
                        style={{
                          fontFamily:
                            "Onest, -apple-system, Roboto, Helvetica, sans-serif",
                        }}
                        dangerouslySetInnerHTML={{ __html: feature.description || "Comprehensive talent pipeline development using advanced sourcing techniques and industry networks to identify qualified candidates." }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}



          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <TestimonialSection />

      {/* CTA Discover Section */}
      <CTADiscoverSection />
    </div>
  );
}

