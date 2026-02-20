'use client'
import { cloudinaryBaseUrl, imageBaseUrl } from '@/app/apiServices/baseUrl/BaseUrl'
import ForwardIcon from '@/components/icons/forwardIcon/ForwardIcon'
import Loader from '@/components/loader/Loader'
import { slugify } from '@/utils/slugify'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

interface ServiceCardProps {
    image?: string;
    cardHeading?: string;
    explanation?: string;
    _id: string;
    slug?: string;
}



const ServiceCard: React.FC<ServiceCardProps> = (props) => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    console.log("BANNER IMAGE", props.image);

    return (
        <>
            {loading && <Loader />}
            <div
                className="hover:shadow-[2px_2px_23px_0px_#2CC295] group relative flex-1  lg:flex-none h-72 rounded-2xl overflow-hidden bg-[#E9E9E9]  transition-transform
       before:content-[''] before:absolute before:inset-0 before:rounded-2xl before:bg-[#00624F]/90 
       before:opacity-0 before:transition before:duration-500
       cursor-pointer
       group-hover:before:opacity-100"
                onClick={() => router.push(`/services/${props.slug || props?._id}`)}
            >
                {/* Background Image */}
                <img
                    src={`${cloudinaryBaseUrl}/${props.image}`}
                    alt={props.cardHeading}
                    className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Overlay for text visibility */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>

                {/* Content Wrapper */}
                <div className="relative z-10 flex items-end h-full">
                    {/* Content Section with Gradient */}
                    <div className="absolute left-0 right-0 bottom-0 transition-all duration-500 
                         bg-gradient-to-t from-[#00634F] via-[#00634F]/80 to-transparent p-6 pt-16">

                        {/* Heading - Always Visible */}
                        <h3
                            className="text-2xl md:text-3xl lg:text-[32px] font-bold text-white leading-[120%] capitalize mb-2"
                            style={{ fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif' }}
                        >
                            {props.cardHeading}
                        </h3>

                        {/* Paragraph + View More - Visible on Hover */}
                        <div className="max-h-0 opacity-0 transition-all duration-500 group-hover:max-h-[200px] group-hover:opacity-100 overflow-hidden tracking-wider">
                            <p className="text-sm text-white w-[95%] mb-4 line-clamp-2 mt-2">
                                {props.explanation}
                            </p>
                            <Link
                                href={`/services/${props.slug || props._id}`}
                                onClick={() => setLoading(true)}
                                className="flex items-center gap-x-2 cursor-pointer font-medium text-white mb-2"
                            >
                                <p>View More</p>
                                <span><ForwardIcon /></span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ServiceCard
