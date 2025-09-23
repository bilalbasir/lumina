'use client'

import SubtractIcon from '@/components/icons/subtractIcon/SubtractIcon';
import UserIcon from '@/components/icons/userIcon/UserIcon';
import BlogDetail from '@/components/pages/landingPage/blogs/BlogDetail';
import ContentOverview from '@/components/pages/landingPage/blogs/ContentOverview';
import HeroImgSvg from '@/components/svgDesign/heroImgSvg'
import { useParams } from 'next/navigation';
import React, { useState } from 'react'
const blogDetailData = {
    overView: "Mississauga is emerging as a prime destination in the Greater Toronto Area, boasting a population exceeding 825,000. Renowned for its rich cultural tapestry, robust job market, and excellent transit options, the city seamlessly blends urban and suburban lifestyles. Neighborhoods such as Port Credit, City Centre, and Churchill Meadows each offer their own unique charm. The real estate landscape is vibrant, with average home prices around $996,000, particularly driven by demand for condos and townhomes. Notable projects like M City Condos, Brightwater, and Lakeview Village are enhancing Mississauga's appeal. Whether you're a first-time buyer or an investor, Mississauga presents exceptional opportunities for all.",
    data: [
        {
            heading: "Future Work Trends in Guelph: Insights and Predictions for 2025",
            data: "The last quarter of 2024 signaled a pivotal change in the Guelph housing market. December witnessed an 80% surge in sales compared to December 2023, reflecting a robust revival in buyer interest. This uptick can be attributed to several factors, including lower interest rates, enhanced affordability, and renewed confidence in the market. Throughout 2024, various property types exhibited diverse trends, with detached homes holding steady, townhouses seeing modest growth, and condos facing challenges."
            , img: "",
        },
        {
            heading: "The Future of Work: Adapting to Hybrid Models",
            data: "Companies are increasingly adopting hybrid work models, blending remote and on-site work, which has led to a re-evaluation of office space design. This shift is facilitating the need for collaborative spaces that foster creativity and teamwork, while also providing quiet zones for focused work. As a result, businesses are investing in technology to enhance virtual collaboration experiences, ensuring productivity remains high regardless of physical location."
            , img: "",

        },
        {
            heading: "Sustainability in Business Operations",
            data: "Organizations are prioritizing sustainability initiatives, with 70% of companies implementing green practices, such as renewable energy usage and waste reduction strategies. This transition not only helps to mitigate environmental impact but also attracts eco-conscious consumers and investors. Businesses are increasingly aligning their operations with sustainability goals, recognizing that a commitment to the planet can drive profitability and long-term success."
            , img: "",

        },
        {
            heading: "Technological Innovations Reshaping Industries",
            data: "Emerging technologies, such as artificial intelligence and blockchain, are revolutionizing various sectors. AI is optimizing supply chain management and enhancing customer service through advanced data analytics. Meanwhile, blockchain technology is improving transparency and security in transactions, reshaping industries like finance and healthcare. As these innovations continue to evolve, companies must adapt to remain competitive in a rapidly changing landscape."
            , img: "/assets/blog/blogDetailImg2.png",

        }
    ]

}

const page = () => {
    const params = useParams()
    console.log("PARAMS", params);
    const slug = params?.slug

    const [selectedContent, setSelectedContent] = useState<string>()
    return (
        <div>
            {/* Hero Section */}
            <section className="relative w-full h-[600px] overflow-hidden">
                {/* Background Image */}
                <img
                    src="/assets/blog/blogImg1.png"
                    alt="Hero Background"
                    className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Gradient Overlay */}
                <HeroImgSvg />


                {/* Hero Content */}
                <div className="relative z-10 flex items-center justify-center h-full px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center md:gap-10 max-w-4xl text-center">
                        <div className="flex flex-col items-center gap-0.5">
                            <h1
                                className="text-2xl md:text-5xl lg:text-[64px] font-bold leading-[53.2px] md:leading-[83.2px] lg:leading-[103.2px]"
                                style={{
                                    fontFamily: "Onest, -apple-system, Roboto, Helvetica, sans-serif",
                                }}
                            >
                                <span className="text-[#D5EED7]">{slug}</span>
                            </h1>

                        </div>
                    </div>
                </div>
            </section>
            <div className='flex items-start  justify-between mx-auto flex-col-reverse lg:flex-row  px-4 sm:px-6 lg:px-20 py-5 md:pt-10 lg:py-16 gap-8'>

                {/* blog details section */}
                <section className='w-[100%] lg:w-[72%] pr-4 '>
                    <BlogDetail data={blogDetailData} selectedContent={selectedContent || ""} />
                </section>

                {/* allcontent section */}
                <section className='w-[100%] lg:w-[24%] sticky top-[68px] lg:top-20 self-start bg-white'>
                    <ContentOverview
                        contentOverview={blogDetailData?.data}
                        onSelect={(heading) => setSelectedContent(heading)}
                    />
                </section>

            </div>


        </div>
    )
}

export default page