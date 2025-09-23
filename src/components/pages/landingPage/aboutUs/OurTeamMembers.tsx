import Image from 'next/image'
import React from 'react'

const OurTeamMembers = () => {
    return (
        <div className='bg-[#F8F8F8]
        py-16
        px-4 
        
        md:px-[20px]
        lg:px-[60px]
        xl:px-[120px]
        
        '>
            <div>
                <div className='flex flex-col items-center justify-center text-center w-[100%]'>
                    <div className=' w-[100%] md:w-[55%]'>
                        <p className='font-bold text-[#131313] text-[24px] md:text-[32px] lg:text-[40px]'>Meet Our Leadership Team</p>
                        <p className='text-[#686868] text-sm md:text-[16px] lg:text-[20px] '>Visionary leaders combining decades of experience with innovative approaches to talent advisory</p>
                    </div>
                </div>
            </div>
            <div className='flex flex-wrap flex-row items-center justify-between mt-10'>
                <div className=' w-[100%] sm:w-[49%] lg:w-[16%] mt-6'>
                    <div className='relative h-[300px] w-[100%]'>

                        <Image
                            src={"/assets/aboutUs/teamImages/teamMem1.png"}
                            alt='Team member'
                            className='rounded-2xl bg-fill object-contain'
                            fill
                        />
                    </div>
                    <div className='text-center mt-4 flex flex-col items-center gap-y-1'>
                        <p className='text-[#131313] font-bold text-[18px]'>Sarah Chen</p>
                        <p className='text-[#00624F]  text-[14px]'>Chief Executive Officer</p>
                        <p className='text-[#4E4E4E]  text-[14px] w-[70%] text-center'>Former McKinsey Partner with 15+ years leading global talent transformation initiatives.</p>

                    </div>

                </div>
                <div className=' w-[100%] sm:w-[49%] lg:w-[16%] mt-6'>
                    <div className='relative h-[300px] w-[100%]'>

                        <Image
                            src={"/assets/aboutUs/teamImages/teamMem4.png"}
                            alt='Team member'
                            className='rounded-2xl bg-fill object-contain'
                            fill
                        />
                    </div>
                    <div className='text-center mt-4 flex flex-col items-center gap-y-1'>
                        <p className='text-[#131313] font-bold text-[18px]'>Sarah Chen</p>
                        <p className='text-[#00624F]  text-[14px]'>Chief Executive Officer</p>
                        <p className='text-[#4E4E4E]  text-[14px] w-[60%] text-center'>Former McKinsey Partner with 15+ years leading global talent transformation initiatives.</p>

                    </div>

                </div>
                <div className='w-[100%] sm:w-[49%] lg:w-[16%] mt-6'>
                    <div className='relative h-[300px] w-[100%]'>

                        <Image
                            src={"/assets/aboutUs/teamImages/teamMem2.png"}
                            alt='Team member'
                            className='rounded-2xl bg-fill object-contain'
                            fill
                        />
                    </div>
                    <div className='text-center mt-4 flex flex-col items-center gap-y-1'>
                        <p className='text-[#131313] font-bold text-[18px]'>Sarah Chen</p>
                        <p className='text-[#00624F]  text-[14px]'>Chief Executive Officer</p>
                        <p className='text-[#4E4E4E]  text-[14px] w-[60%] text-center'>Former McKinsey Partner with 15+ years leading global talent transformation initiatives.</p>

                    </div>

                </div>
                <div className='w-[100%] sm:w-[49%] lg:w-[16%] mt-6'>
                    <div className='relative h-[300px] w-[100%]'>

                        <Image
                            src={"/assets/aboutUs/teamImages/teamMem3.png"}
                            alt='Team member'
                            className='rounded-2xl bg-fill object-contain'
                            fill
                        />
                    </div>
                    <div className='text-center mt-4 flex flex-col items-center gap-y-1'>
                        <p className='text-[#131313] font-bold text-[18px]'>Sarah Chen</p>
                        <p className='text-[#00624F]  text-[14px]'>Chief Executive Officer</p>
                        <p className='text-[#4E4E4E]  text-[14px] w-[60%] text-center'>Former McKinsey Partner with 15+ years leading global talent transformation initiatives.</p>

                    </div>
                </div>
                <div className='w-[100%] sm:w-[49%] lg:w-[16%] mt-6'>
                    <div className='relative h-[300px] w-[100%] rounded-2xl'>

                        <Image
                            src={"/assets/aboutUs/teamImages/teamMem1.png"}
                            alt='Team member'
                            className='rounded-2xl bg-fill object-contain'
                            fill
                        />
                    </div>
                    <div className='text-center mt-4 flex flex-col items-center gap-y-1'>
                        <p className='text-[#131313] font-bold text-[18px]'>Sarah Chen</p>
                        <p className='text-[#00624F]  text-[14px]'>Chief Executive Officer</p>
                        <p className='text-[#4E4E4E]  text-[14px] w-[60%] text-center'>Former McKinsey Partner with 15+ years leading global talent transformation initiatives.</p>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default OurTeamMembers