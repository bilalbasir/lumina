import ColorFullCards from '@/components/card/ColorFullCards'
import BadgeCheckIcon from '@/components/icons/badgeCheckIcon/BadgeCheckIcon'
import BulbIcon from '@/components/icons/bulbIcon/BulbIcon'
import GrowthGraphIcon from '@/components/icons/growthGraphIcon/GrowthGraphIcon'
import TrophyIcon from '@/components/icons/trophyIcon/TrophyIcon'
import React from 'react'

const OurValues = () => {
    return (
        <div>
            <div className='md:text-center px-4'>

                <h1 className='text-[24px]  md:text-[32px] lg:text-[48px] md:leading-[57px] text-[#131313] font-semibold'>
                    Our Values
                </h1>
                <p className='text-[16px] text-[#383838] leading-6'>These core principles guide every decision we make and every relationship we build</p>
            </div>
            <div className='flex items-center justify-between flex-wrap gap-x-2 gap-y-4 md:gap-y-7 mt-12 sm:px-4 md:px-0'>
                <div className='w-full sm:w-[49%] md:w-[32%]'>
                    <ColorFullCards
                        iconBgColor='bg-[#E0FFD8]'
                        icon={<BadgeCheckIcon color='#015524' />}
                        cardBgColor='bg-[#E0FFD8]/30'
                        heading='Integrity'
                        paragraph='We operate with unwavering ethical standards and complete transparency in every interaction.'
                    />
                </div>
                <div className='w-full sm:w-[49%] md:w-[32%]'>

                    <ColorFullCards
                        iconBgColor='bg-[#FAEDFF]'
                        icon={<TrophyIcon color='#6B21A8' />}
                        cardBgColor='bg-[#FFF3F3]/40'
                        heading='Excellence'
                        paragraph='We pursue the highest quality in our work, constantly exceeding expectations and industry standards.'
                    />
                </div>
                <div className='w-full sm:w-[49%] md:w-[32%]'>

                    <ColorFullCards
                        iconBgColor='bg-[#E5F8FF]'
                        icon={<BulbIcon color='#087589' />}
                        cardBgColor='bg-[#E5F8FF]/40'
                        heading='Innovation'
                        paragraph='We embrace cutting-edge approaches and creative solutions to transform talent acquisition.' />
                </div>
                <div className='w-full sm:w-[49%] md:w-[32%]'>

                    <ColorFullCards
                        iconBgColor='bg-[#E5F8FF]'
                        icon={<GrowthGraphIcon color='#087589' />}
                        cardBgColor='bg-[#E5F8FF]/40'
                        heading='Growth'
                        paragraph='We foster continuous development for both our clients and the professionals we place.'
                    />
                </div>
                <div className='w-full sm:w-[49%] md:w-[32%]'>

                    <ColorFullCards
                        iconBgColor='bg-[#E0FFD8]'
                        icon={<GrowthGraphIcon color='#015524' />}
                        cardBgColor='bg-[#E0FFD8]/30'
                        heading='Collaboration'
                        paragraph='We build lasting partnerships through open communication and shared commitment to success.' />
                </div>
                <div className='w-full sm:w-[49%] md:w-[32%]'>

                    <ColorFullCards
                        iconBgColor='bg-[#FAEDFF]'
                        icon={<GrowthGraphIcon color='#6B21A8' />}
                        cardBgColor='bg-[#FFF3F3]/40'
                        heading='Diversity'
                        paragraph='We champion inclusive talent strategies that harness the power of diverse perspectives.' />
                </div>
            </div>
        </div>
    )
}

export default OurValues