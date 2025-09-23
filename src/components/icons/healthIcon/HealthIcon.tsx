import React from 'react'
interface HealthIconProps {
    onClick?: () => void
    color?: string
    width?: string
    height?: string
}
const HealthIcon: React.FC<HealthIconProps> = ({ color = "#1E40AF", onClick, width = "12", height = "10" }) => {
    return (
        <svg width={width} height={height} viewBox="0 0 12 10" fill={color} xmlns="http://www.w3.org/2000/svg" onClick={onClick}>
            <path d="M10.5 8.5H11.5V9.5H0.5V8.5H1.5V1C1.5 0.860001 1.54833 0.741667 1.645 0.645C1.74167 0.548333 1.86 0.5 2 0.5H7C7.14 0.5 7.25833 0.548333 7.355 0.645C7.45167 0.741667 7.5 0.860001 7.5 1V8.5H9.5V4.5H8.5V3.5H10C10.14 3.5 10.2583 3.54833 10.355 3.645C10.4517 3.74167 10.5 3.86 10.5 4V8.5ZM2.5 1.5V8.5H6.5V1.5H2.5ZM3.5 4.5H5.5V5.5H3.5V4.5ZM3.5 2.5H5.5V3.5H3.5V2.5Z" fill={color} />
        </svg>

    )
}

export default HealthIcon