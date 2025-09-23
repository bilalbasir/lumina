import Card from '@/components/card/Card'
import React from 'react'
import CardData from './CardData'
import AddIcon from '@/components/icons/addIcon/AddIcon'
import { roboto } from '@/app/lib/font'
import CareerIcon from '@/components/icons/career/CareerIcon'
import BlogIcon from '@/components/icons/blog/BlogIcon'
import Link from 'next/link'

const QuickActions = () => {
    return (
        <div>
            <Card heading='Quick Actions'>
                <div className='grid gap-3  md:grid-cols-2'>
                    <div className=' '>

                        <Card>
                            <Link href="/dashboard/services/add-service" className='flex flex-col items-center justify-center gap-y-4'>

                                <div className='bg-[#3B82F6] rounded-[8px] h-[40px] w-[40px] flex items-center justify-center'>
                                    <div className='w-[16px] h-[16px] border-2 flex items-center justify-center border-white rounded-full border-solid'>
                                        <AddIcon color='white' />
                                    </div>
                                </div>
                                <p className={`${roboto.className} text-[#374151] text-[14px] leading-[20px] font-[500]`}>
                                    Add New Service
                                </p>
                            </Link>

                        </Card>
                    </div>
                    <div className=''>
                        <Card>
                            <Link href="/dashboard/careers/add-career" className='flex flex-col items-center justify-center gap-y-4'>

                                <div className='bg-[#22C55E] rounded-[8px] h-[40px] w-[40px] flex items-center justify-center'>
                                    <CareerIcon color='white' />
                                </div>
                                <p className={`${roboto.className} text-[#374151] text-[14px] leading-[20px] font-[500]`}>
                                    Post New Job
                                </p>
                            </Link>

                        </Card>
                    </div>

                </div>
                <div className='mt-3'>
                    <Card>
                        <Link href='/dashboard/blogs/add-blog' className='flex flex-col items-center justify-center gap-y-4'>

                            <div className='bg-[#A855F7] rounded-[8px] h-[40px] w-[40px] flex items-center justify-center'>
                                <BlogIcon color='white' />
                            </div>
                            <p className={`${roboto.className} text-[#374151] text-[14px] leading-[20px] font-[500]`}>
                                Write Blog Post
                            </p>
                        </Link>

                    </Card>
                </div>
            </Card>

        </div>
    )
}

export default QuickActions