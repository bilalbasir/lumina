import PrimaryButton from '@/components/button/PrimaryButton'
import CommingSoon from '@/components/svgDesign/commingSoon'
import React from 'react'

const page = () => {
    return (
        <div>
            <div className='relative  overflow-hidden h-screen'>

                <div className='absolute top-[0%] left-[-10%]   z-[30]'>

                    <CommingSoon />
                </div>

                <div className="w-[500px] h-[500px] rounded-full blur-[220px] bg-[#BFFFBF]/50 absolute top-0 left-[-20%] z-40"></div>
                <div className="w-[800px] h-[800px] rounded-full blur-[220px] bg-[#00F6CA]/100 absolute left-[15%] top-[5%] z-40"></div>
                <div className="w-[1100px] h-[1100px] rounded-full blur-[220px] bg-[#D6EFD8]/100 absolute left-[0%] bottom-[-90%] z-40"></div>
                <div className="w-[700px] h-[700px] rounded-full blur-[220px] bg-[#EFBFFF]/100 absolute right-[-5%] top-0 z-40"></div>

            </div>
            <div className="absolute inset-0 z-50 flex items-center justify-center">
                <div className="w-[800px] flex flex-col  items-center justify-center text-center">
                    <div className="relative">
                        <p className="font-extrabold text-8xl text-[#131313]">Stay Tuned..!</p>
                        <p className="font-extrabold text-8xl text-[#131313]/10 absolute top-[6px] left-[-6px]">
                            Stay Tuned..!
                        </p>
                    </div>
                    <p className="text-[#686868] text-[24px] mt-12">
                        Exciting things are coming soon! Stay tuned for a fresh, innovative experience!
                    </p>

                    <div className='w-[100%] flex items-center justify-center gap-x-4 mt-6 mb-3'>
                        <input placeholder='Email Address' className='w-[60%] px-2.5 py-2 rounded-[10px] border-solid border-[2px] border-[#E6E6E6] bg-white' />
                        <div>

                            <PrimaryButton text='Notify Me' textColor='text-white' bgColor='bg-[#00624F]' py='py-2' />
                        </div>
                    </div>
                    <p className='text-[#1A73E8]'>khizar@luminatalents.com</p>
                </div>
            </div>


        </div>
    )
}

export default page



