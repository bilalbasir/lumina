'use client'
import React from "react";

interface PrimaryButtonProps {
    text: string;
    onClick?: () => void;
    className?: string;
    hoverBg?: string
    px?: string
    py?: string
    borderColor?: string
    bgColor?: string
    textColor?: string
    width?: string
    icon?: React.ReactNode
    type?: "button" | "submit" | "reset";

}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
    text,
    onClick,
    className,
    hoverBg = "hover:bg-[#2CC294]",
    px = "px-4",
    py = "py-4",
    borderColor = "border-primaryColor",
    bgColor = "bg-[#D5EED7]",
    textColor = "text-[#131313]",
    icon,
    width,
    type = "submit" }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`inline-flex ${width} items-center cursor-pointer justify-center gap-x-2  ${px} ${py} 
        ${bgColor} ${textColor} font-medium rounded text-base  ${borderColor}
        border-[2px]  active:border-black hover:border-transparent
        ${hoverBg} transition-colors duration-200 ${className}`}
            style={{ fontFamily: "Onest, -apple-system, Roboto, Helvetica, sans-serif" }}
        >
            <div>
                {icon}
            </div>
            {text}
        </button>
    );
};

export default PrimaryButton;
