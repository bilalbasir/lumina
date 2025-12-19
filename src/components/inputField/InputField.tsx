'use client'
import React, { useState } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";
import EyeIcon from "../icons/eyeIcon/EyeIcon";
import EyeSlashIcon from "../icons/eyeSlashIcon/EyeSlashIcon";

interface InputFieldProps {
    label?: string;
    name: string;
    type?: string;
    placeholder?: string;
    register: UseFormRegister<any>;
    error?: FieldError;
    required?: boolean;
    labelColor?: string
    min?: number
    max?: number
}

const InputField: React.FC<InputFieldProps> = ({
    label,
    name,
    type = "text",
    placeholder,
    register,
    error,
    required = false,
    labelColor = "text-[#131313]",
    min,
    max
}) => {
    const [isShowPassword, setIsShowPassword] = useState(false)

    return (
        <div className="flex flex-col items-start gap-2 flex-1 w-full">
            {/* Label */}
            <label
                htmlFor={name}
                className={`w-full capitalize ${labelColor} text-sm font-medium leading-[150%]`}
                style={{
                    fontFamily: "Onest, -apple-system, Roboto, Helvetica, sans-serif",
                }}
            >
                {label} {required && "*"}
            </label>

            {/* Input */}
            <div className="relative w-[100%]">

                <input

                    id={name}
                    type={type === "password" ? (isShowPassword ? "text" : "password") : type}
                    placeholder={placeholder}
                    {...register(name, { required, min, max })}
                    className={`flex h-11 px-4 py-3 items-center gap-2 w-full rounded border-[1.5px] 
          ${error ? "border-red-500" : "border-[#E6E6E6]"} 
          bg-white text-[#686868] text-sm font-medium leading-[150%] outline-none 
          focus:border-[#00634F]`}
                    style={{
                        fontFamily: "Onest, -apple-system, Roboto, Helvetica, sans-serif",
                    }}
                />
                {type === "password" && (
                    <div
                        className="absolute right-2 top-4 cursor-pointer"
                        onClick={() => setIsShowPassword((prev) => !prev)}
                    >
                        {isShowPassword ? <EyeSlashIcon /> : <EyeIcon />}
                    </div>
                )}
            </div>

            {/* Error message */}
            {error && (
                <span className="text-red-500 text-xs capitalize">
                    {error.message || `${label} is required`}
                </span>
            )}
        </div>
    );
};

export default InputField;
