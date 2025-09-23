import React from 'react'
import TrophyIcon from '../../../icons/trophyIcon/TrophyIcon'
import UsersIcon from '../../../icons/usersIcon/UsersIcon'
import BookIcon from '../../../icons/bookIcon/BookIcon'
import GlobIcon from '../../../icons/globIcon/GlobIcon'
import ColorFullCards from '../../../card/ColorFullCards'

const WhyWorkingWithUs = () => {
    return (
        <div className=' bg-[#F8F8F8] items-start gap-6 w-full px-4 sm:px-6 lg:px-20 py-16'>
            <div className='flex flex-col items-center justify-center gap-y-2 w-[100%]'>

                <h2
                    className="w-full text-center text-gray-900 text-3xl sm:text-4xl lg:text-[48px] font-bold leading-tight lg:leading-[57.6px]"
                    style={{
                        fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif',
                        color: '#1D1D1D'
                    }}
                >
                    Why Work With Us
                </h2>
                <p className='text-[#686868] text-[20px] w-[65%] text-center'>
                    Join a team that's passionate about making a difference in the talent industry while building rewarding careers</p>
            </div>
            <div className='flex items-center justify-between mt-12'>
                <div className='w-[23%]'>

                    <ColorFullCards
                        iconBgColor='bg-[#E0FFD8]'
                        icon={<TrophyIcon color="#015524" />}
                        cardBgColor='bg-[#E0FFD8]/30'
                        heading='Career Growth'
                        paragraph='Accelerate your professional development with mentorship programs and clear advancement paths.' />
                </div>

                <div className='w-[23%]'>

                    <ColorFullCards
                        iconBgColor='bg-[#FAEDFF]'
                        icon={<UsersIcon color="#6B21A8" />}
                        cardBgColor='bg-[#FFF3F3]/30'
                        heading='Inclusive Culture'
                        paragraph='Join a diverse and collaborative team that values different perspectives and backgrounds.' />
                </div>
                <div className='w-[23%]'>

                    <ColorFullCards
                        iconBgColor='bg-[#E5F8FF]'
                        icon={<BookIcon color="#087589" />}
                        cardBgColor='bg-[#E5F8FF]/30'
                        heading='Continuous Learning'
                        paragraph='Access to industry training, certifications, and professional development opportunities.' />
                </div>
                <div className='w-[23%]'>

                    <ColorFullCards
                        iconBgColor='bg-[#FFF2D5]'
                        icon={<GlobIcon color="#7D5903" />}
                        cardBgColor='bg-[#FFF2D5]/40'
                        heading='Global Impact'
                        paragraph='Make a meaningful difference by connecting top talent with transformative opportunities worldwide.' />
                </div>


            </div>
        </div>
    )
}

export default WhyWorkingWithUs