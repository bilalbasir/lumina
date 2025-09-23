import React from 'react'
interface ForwardIconProps {
    icon?: () => void
    color?: string
}
const ForwardIcon: React.FC<ForwardIconProps> = ({ icon, color = "white" }) => {
    return (
        <svg onClick={icon} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_180_359)">
                <path d="M23.725 11.3364L23.7242 11.3355L18.8256 6.4605C18.4586 6.09529 17.865 6.09665 17.4997 6.46368C17.1345 6.83067 17.1359 7.42425 17.5028 7.7895L20.7918 11.0625H0.9375C0.419719 11.0625 0 11.4822 0 12C0 12.5178 0.419719 12.9375 0.9375 12.9375H20.7917L17.5029 16.2105C17.1359 16.5757 17.1345 17.1693 17.4998 17.5363C17.865 17.9034 18.4587 17.9047 18.8256 17.5395L23.7242 12.6645L23.7251 12.6636C24.0923 12.2971 24.0911 11.7016 23.725 11.3364Z" fill={color} />
            </g>
            <defs>
                <clipPath id="clip0_180_359">
                    <rect width="24" height="24" fill={color} />
                </clipPath>
            </defs>
        </svg>

    )
}

export default ForwardIcon