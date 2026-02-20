'use client'
import CrossIcon from '@/components/icons/crossIcon/CrossIcon'
import React, { useEffect, useRef, useState } from 'react'

interface BlogDetailProps {
    data: {
        overView: string
        data: { heading: string; data: string; additionalImages?: string[] }[]
        featuredImage?: string
    }
    selectedContent: string
}
const BlogDetail: React.FC<BlogDetailProps> = ({ data, selectedContent }) => {
    const [isOverviewClose, setIsOverviewClose] = useState(true)
    // Store refs for each heading
    const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

    const contentRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (selectedContent && contentRef.current) {
            // First, try to find an exact match within the headings of the rendered content
            const headings = contentRef.current.querySelectorAll('h1, h2, h3, h4, h5, h6');
            let foundElement: Element | null = null;

            for (let i = 0; i < headings.length; i++) {
                if (headings[i].textContent?.trim() === selectedContent.trim()) {
                    foundElement = headings[i];
                    break;
                }
            }

            // If found in the main content block
            if (foundElement) {
                foundElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else if (sectionRefs.current[selectedContent]) {
                // Fallback to the old logic (section containers) if applicable
                sectionRefs.current[selectedContent]?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                })
            }
        }
    }, [selectedContent])


    console.log("selectedContent", selectedContent);

    return (
        <>
            {data?.featuredImage && (
                <img
                    src={data?.featuredImage}
                    alt="Featured Image"
                    className=" w-full h-full object-cover rounded-[12px]"
                />
            )}
            <div className='p-4 rounded-lg bg-[#F3F3F3] relative mt-6'>
                <div className='flex items-center justify-between'>
                    <p className='text-[14px] font-semibold text-black'>Overview</p>
                    <div className={`${isOverviewClose ? "rotate-0" : "rotate-45"} transition-all duration-500`}>

                        <CrossIcon onClick={() => setIsOverviewClose(!isOverviewClose)} />
                    </div>
                </div>
                <div dangerouslySetInnerHTML={{ __html: data.overView }} className={`${isOverviewClose ? "block" : "hidden"} mt-2 leading-[24px] text-[14px] text-[#1D1D1D] transition-all duration-500`} />




            </div>
            {data?.data?.map(data =>
                <div className='mt-6 scroll-mt-24' ref={(el) => {
                    sectionRefs.current[data.heading] = el; // assign kar do
                    // return nothing
                }}>
                    <p className='text-[22px] leading-[33px] font-semibold text-[#131313]'>{data?.heading}</p>
                    <div
                        ref={(el) => { if (data?.data && el) contentRef.current = el }}
                        className={`
                            mt-3 leading-[24px] text-[14px] text-[#1D1D1D]
                            [&>h1]:text-3xl [&>h1]:font-bold [&>h1]:mt-8 [&>h1]:mb-4 [&>h1]:scroll-mt-24
                            [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mt-6 [&>h2]:mb-3 [&>h2]:scroll-mt-24
                            [&>h3]:text-xl [&>h3]:font-bold [&>h3]:mt-5 [&>h3]:mb-2 [&>h3]:scroll-mt-24
                            [&>p]:mb-4
                            [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:mb-4
                            [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:mb-4
                        `}
                        dangerouslySetInnerHTML={{ __html: data?.data || '' }}
                    />

                    {data?.additionalImages && data.additionalImages.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                            {data.additionalImages.map((imgUrl, idx) => (
                                <img
                                    key={idx}
                                    src={imgUrl}
                                    alt={`Additional Image ${idx + 1}`}
                                    className="w-full h-full object-cover rounded-[12px]"
                                />
                            ))}
                        </div>
                    )}

                </div>
            )}

        </>
    )
}

export default BlogDetail