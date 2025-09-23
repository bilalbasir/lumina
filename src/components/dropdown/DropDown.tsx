"use client";
import React, { useState, useRef, useEffect } from "react";
import { Controller, Control, FieldError } from "react-hook-form";
import { ChevronDownIcon } from "../tiptap-icons/chevron-down-icon";
// import { ChevronDownIcon } from "@heroicons/react/24/solid";

interface DropdownFieldProps {
    label?: string;
    name: string;
    options: string[];
    control: Control<any>;
    error?: FieldError;
    required?: boolean;
    placeholder?: string;
    labelColor?: string

}

const DropdownField: React.FC<DropdownFieldProps> = ({
    label,
    name,
    options,
    control,
    error,
    required = false,
    placeholder = "Select",
    labelColor = "text-[#131313]"

}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown on outside click
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <Controller
            name={name}
            control={control}
            rules={{ required }}
            render={({ field: { onChange, value } }) => (
                <div className="flex flex-col items-start gap-2 flex-1 w-full" ref={dropdownRef}>
                    {/* Label */}
                    <label
                        htmlFor={name}
                        className={`w-full ${labelColor} text-sm font-medium leading-[150%]`}
                        style={{
                            fontFamily: "Onest, -apple-system, Roboto, Helvetica, sans-serif",
                        }}
                    >
                        {label} {required && "*"}
                    </label>

                    {/* Dropdown */}
                    <div className="relative w-full">
                        <div
                            className={`flex h-11 px-4 py-3 items-center gap-2 w-full rounded border-[1.5px] 
              ${error ? "border-red-500" : "border-[#E6E6E6]"} 
              bg-white cursor-pointer`}
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <span
                                className={`flex-1 text-sm font-medium leading-[150%] ${value ? "text-[#131313]" : "text-[#686868]"
                                    }`}
                                style={{
                                    fontFamily: "Onest, -apple-system, Roboto, Helvetica, sans-serif",
                                }}
                            >
                                {value || placeholder}
                            </span>
                            {/* <ChevronDownIcon className="w-4 h-4 text-gray-500" /> */}
                        </div>
                        <ChevronDownIcon
                            className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"
                                }`}
                        />
                        {isOpen && (
                            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#E6E6E6] rounded shadow-lg z-10">
                                {options.map((option) => (
                                    <div
                                        key={option}
                                        className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm text-[#131313]"
                                        style={{
                                            fontFamily: "Onest, -apple-system, Roboto, Helvetica, sans-serif",
                                        }}
                                        onClick={() => {
                                            onChange(option);
                                            setIsOpen(false);
                                        }}
                                    >
                                        {option}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Error message */}
                    {error && (
                        <span className="text-red-500 text-xs">
                            {error.message || `${label} is required`}
                        </span>
                    )}
                </div>
            )}
        />
    );
};

export default DropdownField;
