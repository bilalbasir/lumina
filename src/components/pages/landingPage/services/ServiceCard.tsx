'use client'
import ForwardIcon from '@/components/icons/forwardIcon/ForwardIcon'
import { slugify } from '@/utils/slugify'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

interface ServiceCardProps {
    image?: string
    cardHeading?: string
    explanation?: string
    _id: string
}



const ServiceCard: React.FC<ServiceCardProps> = (props) => {
    const router = useRouter()
    return (
        <div
            className="hover:shadow-[2px_2px_23px_0px_#2CC295] group relative flex-1  lg:flex-none h-72 rounded-2xl overflow-hidden bg-[#E9E9E9]  transition-transform
       before:content-[''] before:absolute before:inset-0 before:rounded-2xl before:bg-[#00624F] 
       before:opacity-0 before:blur-xl before:transition before:duration-500
       group-hover:before:opacity-100"
            onClick={() => router.push(`/services/${props?._id}`)}
        >
            {/* Background Image */}
            <img
                src={props.image}
                alt={props.cardHeading}
                className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#00634F]/10 from-10% to-transparent transition-all duration-300"></div>

            <div className="relative z-10 p-6">
                {/* Heading */}
                <h3
                    className="absolute bottom-[-220px] left-6 right-6  capitalize
         transition-all duration-500 group-hover:bottom-[-145px] 
         text-2xl md:text-3xl lg:text-[36px] font-bold text-white leading-[140%]"
                    style={{ fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif' }}
                >
                    {props.cardHeading}
                </h3>

                {/* Paragraph + View More */}
                <div
                    className="absolute left-6 bottom-[-220px] 
         opacity-0 translate-y-6 tracking-widest
         transition-all duration-500 delay-[0ms] 
         group-hover:opacity-100 group-hover:translate-y-0 group-hover:delay-500"
                >
                    <p className="text-sm text-white w-[90%] mb-2">
                        {props.explanation}
                    </p>
                    <Link
                        href={`/services/${props?._id}`}
                        className="flex items-center gap-x-2 cursor-pointer font-medium text-white"
                    >
                        <p>View More</p>
                        <span><ForwardIcon /></span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ServiceCard
