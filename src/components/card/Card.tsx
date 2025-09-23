import React from 'react'
interface CardProps {
    children: React.ReactNode
    heading?: string
    hover?: string
}
const Card: React.FC<CardProps> = (props) => {
    return (
        <div className={`rounded-[10px] w-[100%] bg-white p-6  border-1 border-[#D9D9D9] border-solid transition-all group duration-500 ${props.hover}`}>
            <p className='textHeadlineSemi mb-4'>{props.heading}</p>
            {props.children}
        </div>
    )
}

export default Card

