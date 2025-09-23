// components/inputField/UrlSlugField.tsx
import React from 'react'
import { FieldError, UseFormRegister } from 'react-hook-form'

interface UrlSlugFieldProps {
    label: string
    name: string
    prefix?: string
    placeholder?: string
    register: UseFormRegister<any>
    error?: FieldError
    required?: boolean
}

const UrlSlugField: React.FC<UrlSlugFieldProps> = ({
    label,
    name,
    prefix = '/blog/',
    placeholder,
    register,
    error,
    required = false,
}) => {
    return (
        <div className="flex flex-col gap-2 w-full">
            <label className={`w-full capitalize text-[#131313] text-sm font-medium leading-[150%]`}
                style={{
                    fontFamily: "Onest, -apple-system, Roboto, Helvetica, sans-serif",
                }}>{label} {required && "*"}</label>
            <div className="flex rounded-md border-[1.5px] border-[#E6E6E6]">
                <span className="inline-flex items-center py-3 px-4 rounded-l-[4px]  border border-r-0 border-[#E6E6E6] bg-[#F3F3F3] text-greyscale600 text-sm">
                    {prefix}
                </span>
                <input
                    type="text"
                    placeholder={placeholder}
                    className={`flex h-11 px-4 py-3 items-center gap-2 w-full rounded-r rounded-l-0  
          ${error ? "border-red-500" : "border-[#E6E6E6]"} 
          bg-white text-[#686868] text-sm font-medium leading-[150%] outline-none 
          focus:border-[#00634F]`}
                    style={{
                        fontFamily: "Onest, -apple-system, Roboto, Helvetica, sans-serif",
                    }}
                    {...register(name, { required })}
                />
            </div>
            {error && <p className="text-red-500 text-xs">{error.message}</p>}
        </div>
    )
}

export default UrlSlugField
