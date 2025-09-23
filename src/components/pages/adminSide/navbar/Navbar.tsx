import { montserrat } from '@/app/lib/font'
import SearchBar from '@/components/searchBar/SearchBar'
import Image from 'next/image'
import React from 'react'
const Navbar = () => {
    return (
        <div className='px-5 pt-5 pb-0 flex items-center justify-between w-[100%]'>
            <div>
                <p className={`${montserrat.className} text-[20px] sm:text-[24px] font-medium`}>Hi, Nain’s</p>
                <p className={`${montserrat.className} text-[#676767]  hidden sm:block sm:text-[16px]`}>
                    Welcome back to Lumina Talent</p>
            </div>
            <div className='flex items-center gap-x-4'>
                {/* <div className='w-[400px]'>
                    <SearchBar placeholder="Seacrh here ..." isBorder={false} bgColor='bg-[#F3F3F3]' />
                </div> */}
                <div className='w-[54px] h-[54px] relative'>

                    <Image src="/assets/dp.jpg"
                        alt="user"
                        fill
                        className='absolute top-0 left-0 rounded-full bg-cover border-1 border-solid border-greyscale300'
                    />
                </div>
            </div>

        </div>
    )
}

export default Navbar