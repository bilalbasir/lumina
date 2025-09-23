import React from 'react'
import Image from 'next/image'
import PrimaryButton from '../../../button/PrimaryButton'

const NextStepCareer = () => {
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
                <div className='flex items-center justify-center h-full'>

                    <div className="relative text-center text-white z-10 w-[42%]  ">
                        <h2 className="text-[36px] font-bold text-center">Take the Next Step in Your Career</h2>
                        <p className="mt-4 text-center w-[85%] mx-auto">
                            Ready to join a team that values innovation, growth, and making a real impact? Discover your next opportunity with Lumina Talent Advisory.
                        </p>
                        <div className='flex items-center justify-center gap-x-5 mt-7'>
                            <PrimaryButton text='Apply Today' />
                            <PrimaryButton text='Learn More About Us' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NextStepCareer
