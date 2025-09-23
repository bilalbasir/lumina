import PrimaryButton from '@/components/button/PrimaryButton'
import React from 'react'

const ContactUs = () => {
    return (
        <div className='w-[100%] md:max-w-7xl mx-auto  py-12'>

            <div className='md:rounded-4xl bg-[#D5EED7] text-center py-10 px-2 md:w-[80%] mx-auto'>
                <p className='text-[22px] md:text-[26px] text-[#131313] font-semibold'>Ready to take your workforce to the next level?</p>
                <p className='text-sm md:text-[16px] text-[#686868] w-[70%] mx-auto mt-6'>Partner with Lumina Talent Advisory and discover how the right talent can transform your organization's future.</p>

                <div className='mt-6'>

                    <PrimaryButton width='w-[90%] md:w-auto' text='Contact Us Today' textColor='text-white' bgColor='bg-[#00624F]' py='py-4' px="px-4" />
                </div>
            </div>
        </div>
    )
}

export default ContactUs