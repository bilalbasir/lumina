'use client'
import React from 'react'
import Image from 'next/image'
import PrimaryButton from '../../../button/PrimaryButton'
import { useRouter } from 'next/navigation'

const NextStepCareer = () => {
    const router = useRouter()
    return (
        <div className=" bg-white w-full  py-16">
            <div className='relative h-[450px]'>
                {/* Background image */}
                <Image
                    src="/assets/careers/NextStepImage.png" // replace with actual image name
                    alt="Background"
                    fill
                    className="object-cover rounded-md"
                    priority
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-[#00634F]/80 " />

                {/* Content */}
                <div className='flex items-center justify-center min-h-full py-12 px-4'>
                    <div className="relative text-center text-white z-10 w-full max-w-3xl">
                        <h2 className="text-2xl md:text-3xl lg:text-[36px] font-bold text-center leading-tight">
                            Take the Next Step in Your Career
                        </h2>
                        <p className="mt-4 text-center max-w-xl mx-auto text-sm md:text-base opacity-90">
                            Ready to join a team that values innovation, growth, and making a real impact? Discover your next opportunity with Lumina Talent Advisory.
                        </p>
                        <div className='flex flex-col sm:flex-row items-center justify-center gap-4 mt-8'>
                            <PrimaryButton onClick={() => router.push('/contactus')} text='Apply Today' />
                            <PrimaryButton onClick={() => router.push('/aboutus')} text='Learn More About Us' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NextStepCareer
