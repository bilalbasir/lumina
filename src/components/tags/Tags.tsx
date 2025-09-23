import React from 'react'

interface TagsProps {
    color: string,
    bgColor: string,
    text: string
    icon?: React.ReactNode
}

const Tags: React.FC<TagsProps> = (props) => {
    return (
        <div className={`${props.color} ${props.bgColor} font-medium text-[12px] flex items-center gap-x-2 px-3.5 py-1 rounded-full`}>
            {props.icon}
            {props.text}
        </div>
    )
}

export default Tags