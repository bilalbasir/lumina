import React, { useEffect, useRef, useState } from 'react'
import { ChevronDownIcon } from '../tiptap-icons/chevron-down-icon'

interface DropDownWOHookProps {
    onClick: (value: string) => void
    options: string[]
    label: string
    value: string
}

const DropDownWOHook: React.FC<DropDownWOHookProps> = (props) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)




    // outside click handler
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsDropdownOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <div className="flex flex-col items-start gap-2 flex-1" ref={dropdownRef}>
            <label className="w-full text-[#131313] text-sm font-medium leading-[150%]">
                {props.label}
            </label>
            <div className="relative flex h-11 items-start gap-4 w-full">
                <div
                    className="flex h-11 px-4 py-3 items-center gap-2 flex-1 rounded border-[1.5px] border-[#E6E6E6] bg-white cursor-pointer"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                    <span className="flex-1 text-[#686868] text-sm font-medium leading-[150%]">
                        {props.value || 'Select Option'}
                    </span>
                    <ChevronDownIcon
                        className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : "rotate-0"
                            }`}
                    />
                </div>

                {isDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#E6E6E6] rounded shadow-lg z-10">
                        {props.options.map((type) => (
                            <div
                                key={type}
                                className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm"
                                onClick={() => {
                                    props.onClick(type)             // parent ko notify
                                    setIsDropdownOpen(false)        // close after select
                                }}
                            >
                                {type}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default DropDownWOHook
