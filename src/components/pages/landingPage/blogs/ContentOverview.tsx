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

    const [isContentClose, setIsContentClose] = useState(true)
    // 👇 Effect to update state on screen resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1022) {
                setIsContentClose(false)
            } else {
                setIsContentClose(true)
            }
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
                <p>Content Overview</p>

                {isContentClose ?
                    <div className='h-[40px] cursor-pointer w-[40px] rounded-full bg-[#F1F1F1] flex items-center justify-center'
                        onClick={() => setIsContentClose(false)}>


                        <FaPlus size={16} />


                    </div> :
                    <div className='h-[40px] cursor-pointer w-[40px] rounded-full bg-[#F1F1F1] flex items-center justify-center'
                        onClick={() => setIsContentClose(true)}>



                        <SubtractIcon />
                    </div>
                }



            </div>
            <div className={`flex flex-col gap-y-3 items-start transition-all duration-500 ${isContentClose ? "h-[500px]" : 'h-0'}  overflow-y-scroll`}>
                {contentOverview?.map(data =>

                    <p onClick={() => {
                        onSelect(data.heading || "")
                        if (window.innerWidth < 1022) {
                            setIsContentClose(false)   // 👈 collapse jab screen chhoti ho
                        }
                    }} className='hover:bg-[#ebeaea] transition-all duration-500 cursor-pointer bg-[#f5f5f5] px-3 text-[14px] text-[#131313] font-medium py-3 rounded-[12px]'>{data?.heading}</p>
                )}

            </div>
        </>
    )
}

export default ContentOverview