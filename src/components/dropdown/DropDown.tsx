"use client";
import React, { useState, useRef, useEffect } from "react";
import { Controller, Control, FieldError } from "react-hook-form";
import { ChevronDownIcon } from "../tiptap-icons/chevron-down-icon";

interface DropdownFieldProps {
    label?: string;
    name: string;
    options: string[];
    control: Control<any>;
    error?: FieldError;
    required?: boolean;
    placeholder?: string;
    labelColor?: string;
    onDelete?: (option: string) => void;
    deletableOptions?: string[];
}

const DropdownField: React.FC<DropdownFieldProps> = ({
    label,
    name,
    options,
    control,
    error,
    required = false,
    placeholder = "Select",
    labelColor = "text-[#131313]",
    onDelete,
    deletableOptions,
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
                        </div>
                        <ChevronDownIcon
                            className={`w-4 h-4 absolute top-4 right-2 text-gray-500 transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"
                                }`}
                        />
                        {isOpen && (
                            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#E6E6E6] rounded shadow-lg z-10 max-h-60 overflow-y-auto">
                                {options.map((option) => (
                                    <div
                                        key={option}
                                        className="group px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm text-[#131313] flex items-center justify-between"
                                        style={{
                                            fontFamily: "Onest, -apple-system, Roboto, Helvetica, sans-serif",
                                        }}
                                        onClick={() => {
                                            onChange(option);
                                            setIsOpen(false);
                                            console.log("Option selected:", option);
                                        }}
                                    >
                                        <span>{option}</span>
                                        {onDelete && deletableOptions?.includes(option) && (
                                            <button
                                                type="button"
                                                className="transition-opacity cursor-pointer text-red-600 hover:text-red-500 ml-2 p-1"
                                                title={`Delete ${option}`}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onDelete(option);
                                                }}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <polyline points="3 6 5 6 21 6" />
                                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                                    <line x1="10" y1="11" x2="10" y2="17" />
                                                    <line x1="14" y1="11" x2="14" y2="17" />
                                                </svg>
                                            </button>
                                        )}
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
