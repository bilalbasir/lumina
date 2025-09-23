import React from "react";
import { FieldError, UseFormRegister } from "react-hook-form";

interface TextAreaProps {
    label: string;
    name: string;
    placeholder?: string;
    register: UseFormRegister<any>;
    error?: FieldError;
    required?: boolean;
    labelColor?: string

}

const TextArea: React.FC<TextAreaProps> = ({
    label,
    name,
    placeholder,
    register,
    error,
    required = false,
    labelColor = "text-[#131313]"

}) => {
    return (
        <div className={` flex flex-col items-start gap-2 flex-1 w-full`}>
            {/* Label */}
            <label
                htmlFor={name}
                className={`w-full capitalize text-[#131313] text-sm font-medium leading-[150%] ${labelColor}`}
                style={{
                    fontFamily: "Onest, -apple-system, Roboto, Helvetica, sans-serif",
                }}
            >
                {label} {required && "*"}
            </label>

            {/* Input */}
            <textarea
                id={name}
                rows={5}

                placeholder={placeholder}
                {...register(name, { required })}
                className={`flex px-4 py-3 items-center gap-2 w-full rounded border-[1.5px] 
          ${error ? "border-red-500" : "border-[#E6E6E6]"} 
          bg-white text-[#686868] text-sm font-medium leading-[150%] outline-none 
          focus:border-[#00634F]`}
                style={{
                    fontFamily: "Onest, -apple-system, Roboto, Helvetica, sans-serif",
                }}
            />

            {/* Error message */}
            {error && (
                <span className="text-red-500 text-xs capitalize">
                    {error.message || `${label} is required`}
                </span>
            )}
        </div>
    );
};

export default TextArea;
