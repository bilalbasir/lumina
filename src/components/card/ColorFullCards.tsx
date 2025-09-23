import React from 'react'

interface ColorFullCardsProps {
    heading: string,
    paragraph: string,
    icon: React.ReactNode
    cardBgColor: string
    iconBgColor: string
}

const ColorFullCards: React.FC<ColorFullCardsProps> = (props) => {
    return (
        <div className={` ${props.cardBgColor} border-[1px] border-solid border-white rounded-lg flex flex-col items-center gap-y-4 p-6`}>
            <div className={`${props.iconBgColor} h-[48px] w-[48px] rounded-full flex items-center justify-center`}>
                {props.icon}
            </div>
            <p className='font-semibold text-[#131313] text-[18px]'>{props.heading}</p>
            <p className='text-[14px] text-[#4E4E4] text-center'>{props.paragraph}</p>
        </div>
    )
}

export default ColorFullCards