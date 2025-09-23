
import CardData from '@/components/pages/adminSide/dashboard/CardData'
import QuickActions from '@/components/pages/adminSide/dashboard/QuickActions'
import LayoutHeader from '@/components/pages/adminSide/LayoutHeader'
import React from 'react'

const page = () => {
    return (
        <>
            <LayoutHeader heading='Dashboard' />


            <CardData />
            <div className='mt-6'>
                <QuickActions />
            </div>
        </>
    )
}

export default page