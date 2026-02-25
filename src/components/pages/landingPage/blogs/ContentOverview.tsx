'use client'

import CrossIcon from '@/components/icons/crossIcon/CrossIcon'
import SubtractIcon from '@/components/icons/subtractIcon/SubtractIcon'
import UserIcon from '@/components/icons/userIcon/UserIcon'
import { FaPlus } from "react-icons/fa6";

import React, { useEffect, useState } from 'react'

interface ContentOverviewProps {
    contentOverview: { heading: string, image?: string, data?: string }[],
    onSelect: (data: string) => void;
    authorName?: string;
    date?: string;
}

const ContentOverview: React.FC<ContentOverviewProps> = ({ contentOverview, onSelect, authorName = "Management", date = "July 14, 2025" }) => {
    const [isContentClose, setIsContentClose] = useState(false);

    // 👇 Effect to update state on screen resize
    useEffect(() => {
        let lastWidth = window.innerWidth;
        const handleResize = () => {
            const currentWidth = window.innerWidth;
            const wasMobile = lastWidth < 1022;
            const isNowMobile = currentWidth < 1022;

            if (wasMobile !== isNowMobile) {
                if (isNowMobile) {
                    setIsContentClose(true) // Switch to closed on mobile
                } else {
                    setIsContentClose(false) // Switch to open on desktop
                }
            }
            lastWidth = currentWidth;
        }

        handleResize() // run on mount
        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [])
    return (
        <>  <div className='flex items-center gap-x-2 px-4 lg:px-0 '>
            <UserIcon />
            <div className='flex flex-col justify-between items-start gap-y-2'>
                <p className='text-[14px] font-semibold text-[#131313]'>{authorName}</p>
                <p className='text-[12px] font-medium text-[#A39F9F]'>Publish Date: <span>{date}</span></p>
            </div>
        </div>
            <div className='flex items-center justify-between mt-6 mb-6'>
                <p className='text-black'>Content Overview</p>

                {isContentClose ?
                    <div className='h-[40px] cursor-pointer w-[40px] rounded-full bg-[#F1F1F1] text-black flex items-center justify-center'
                        onClick={() => setIsContentClose(false)}>


                        <FaPlus size={16} />


                    </div> :
                    <div className='h-[40px] cursor-pointer w-[40px] rounded-full bg-[#F1F1F1] text-black flex items-center justify-center'
                        onClick={() => setIsContentClose(true)}>



                        <SubtractIcon />
                    </div>
                }



            </div>
            <div className={`flex flex-col gap-y-3 items-start transition-all duration-500 overflow-y-auto ${isContentClose ? "max-h-0 opacity-0" : 'max-h-[500px] opacity-100 mt-4'}`}>
                {contentOverview?.map((data, index) =>

                    <p
                        key={index}
                        onClick={() => {
                            onSelect(data.heading || "")
                            if (window.innerWidth < 1022) {
                                setIsContentClose(true)   // 👈 collapse jab screen chhoti ho
                            }
                        }} className='w-full hover:bg-[#ebeaea] transition-all duration-300 cursor-pointer bg-[#f5f5f5] px-4 text-[14px] text-[#131313] font-medium py-3 rounded-[12px]'>{data?.heading}</p>
                )}

            </div>
        </>
    )
}

export default ContentOverview