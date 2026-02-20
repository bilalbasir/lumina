import React from 'react'
import SearchIcon from '../icons/searchIcon/SearchIcon'
interface SearchBarProps {
    bgColor?: string
    isBorder?: boolean
    value?: string
    placeholder?: string
    onChange?: (val: string) => void

}
const SearchBar: React.FC<SearchBarProps> = ({ placeholder, onChange, value, bgColor = "bg-white", isBorder = true }) => {
    return (
        <div className={`${isBorder && 'border-1'}  flex items-center py-2 px-4 gap-x-3 ${bgColor} border-[#E6E6E6] rounded-lg text-[#131313] border-solid`}>
            <SearchIcon />
            <input className='outline-none' value={value} placeholder={placeholder} onChange={(e) => onChange?.(e.target.value)}
            />
        </div>
    )
}

export default SearchBar