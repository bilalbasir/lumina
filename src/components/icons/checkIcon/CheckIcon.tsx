import React from 'react'
interface CheckIconProps {
    color: string
}
const CheckIcon: React.FC<CheckIconProps> = ({ color = "#cccc" }) => {
    return (
        <svg width="12" height="10" viewBox="0 0 12 10" fill={color} xmlns="http://www.w3.org/2000/svg">
            <path d="M4.58745 7.11985L10.7169 0.986517L11.6497 1.93318L4.58745 9.01318L0.350098 4.75985L1.28285 3.82652L4.58745 7.11985Z" fill={color} />
        </svg>

    )
}

export default CheckIcon