import React from 'react'
interface ShapesIconProps {
    color: string
}
const ShapesIcon: React.FC<ShapesIconProps> = ({ color }) => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.96323 9.08467C8.18766 9.08467 9.99092 7.28141 9.99092 5.05698C9.99092 2.83255 8.18766 1.0293 5.96323 1.0293C3.7388 1.0293 1.93555 2.83255 1.93555 5.05698C1.93555 7.28141 3.7388 9.08467 5.96323 9.08467Z" stroke={color} stroke-width="1.40625" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M18.3901 0.703125L23.2854 9.1822H13.4948L18.3901 0.703125ZM14.2479 13.8937H22.5323V22.1781H14.2479V13.8937ZM5.97446 12.7754L0.713867 18.0359L5.97446 23.2969L11.2354 18.0359L5.97446 12.7754Z" stroke={color} stroke-width="1.40625" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
        </svg>



    )
}

export default ShapesIcon