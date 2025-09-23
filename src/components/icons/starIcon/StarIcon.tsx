interface CheckIconProps {
    color: string
}
const StarIcon: React.FC<CheckIconProps> = ({ color = "#cccc" }) => {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill={color} xmlns="http://www.w3.org/2000/svg">
            <path d="M8.00018 12.6002L3.29645 15.2402L4.34913 9.9469L0.391602 6.29357L5.74825 5.65357L8.00018 0.760235L10.2521 5.65357L15.6088 6.29357L11.6512 9.9469L12.7039 15.2402L8.00018 12.6002ZM8.00018 11.0802L10.8251 12.6669L10.1988 9.48023L12.584 7.28023L9.35933 6.89357L8.00018 3.9469L6.64103 6.89357L3.41638 7.28023L5.80155 9.48023L5.17528 12.6669L8.00018 11.0802Z" fill={color} />
        </svg>

    )
}

export default StarIcon