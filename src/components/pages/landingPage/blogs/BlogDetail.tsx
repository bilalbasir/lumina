'use client'
import CrossIcon from '@/components/icons/crossIcon/CrossIcon'
import React, { useEffect, useRef, useState } from 'react'

interface BlogDetailProps {
    data: {
        overView: string
        data: { heading: string; data: string; img?: string }[]
    }
    selectedContent: string
}
const BlogDetail: React.FC<BlogDetailProps> = ({ data, selectedContent }) => {
    const [isOverviewClose, setIsOverviewClose] = useState(true)
    // Store refs for each heading
    const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

    useEffect(() => {
        if (selectedContent && sectionRefs.current[selectedContent]) {
            sectionRefs.current[selectedContent]?.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            })
        }
    }, [selectedContent])


    console.log("selectedContent", selectedContent);

    return (
        <>
            <img
                src="/assets/blog/blogDetailImg1.png"
                alt="Hero Background"
                className=" w-full h-full object-cover rounded-[12px]"
            />
            <div className='p-4 rounded-lg bg-[#F3F3F3] relative mt-6'>
                <div className='flex items-center justify-between'>
                    <p className='text-[14px] font-semibold'>Overview</p>
                    <div className={`${isOverviewClose ? "rotate-0" : "rotate-45"} transition-all duration-500`}>

                        <CrossIcon onlCick={() => setIsOverviewClose(!isOverviewClose)} />
                    </div>
                </div>
                <p className={`${isOverviewClose ? "block" : "hidden"} mt-2 leading-[24px] text-[14px] transition-all duration-500`}>

                    {data.overView}
                </p>

            </div>
            {data?.data?.map(data =>

                <div className='mt-6' ref={(el) => {
                    sectionRefs.current[data.heading] = el; // assign kar do
                    // return nothing
                }}>
                    <p className='text-[22px] leading-[33px] font-semibold text-[#131313]'>{data?.heading}</p>
                    <p className={` mt-3 leading-[24px] text-[14px] `}>

                        {data?.data}                </p>

                    {data?.img !== "" &&
                        <img
                            src={data?.img}
                            alt="Hero Background"
                            className=" w-full h-full mt-3 object-cover rounded-[12px]"
                        />
                    }

                </div>
            )}

        </>
    )
}

export default BlogDetail