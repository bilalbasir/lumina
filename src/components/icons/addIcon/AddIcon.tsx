import React from 'react'
interface AddIconProps {
    color?: string
    width?: string,
    height?: string,
}
const AddIcon: React.FC<AddIconProps> = ({ color, width = "8", height = "8" }) => {
    return (
        <svg width={width} height={height} viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.09836 3.32457H4.61967V0.845883C4.61967 0.503821 4.34267 0.226196 3.99998 0.226196C3.6573 0.226196 3.3803 0.503821 3.3803 0.845883V3.32457H0.901609C0.558921 3.32457 0.281921 3.6022 0.281921 3.94426C0.281921 4.28632 0.558921 4.56395 0.901609 4.56395H3.3803V7.04263C3.3803 7.3847 3.6573 7.66232 3.99998 7.66232C4.34267 7.66232 4.61967 7.3847 4.61967 7.04263V4.56395H7.09836C7.44105 4.56395 7.71805 4.28632 7.71805 3.94426C7.71805 3.6022 7.44105 3.32457 7.09836 3.32457Z" fill={color} />
        </svg>

    )
}

export default AddIcon