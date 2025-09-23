"use client";
import { Controller, Control } from "react-hook-form";
import React from "react";

interface CheckboxFieldProps {
    name: string;
    label: string;
    control: Control<any>;
    labelColor?: string
}

const CheckboxField: React.FC<CheckboxFieldProps> = ({ name, label, control, labelColor = "text-[#666]" }) => (
    <Controller
        name={name}
        control={control}
        defaultValue={false}
        render={({ field: { value, onChange } }) => (
            <label className="flex items-start gap-x-2 cursor-pointer" >
                <div
                    onClick={() => onChange(!value)}
                    className={`w-4 h-4  md:w-6    md:h-6 border-2 rounded flex items-center justify-center ${value ? "bg-[#00624F] border-[#00624F]" : "border-[#131313] bg-white"
                        }`}
                >
                    {value && (
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            className="text-white"
                        >
                            <path
                                d="M13.5 4.5L6 12L2.5 8.5"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    )}
                </div>
                < span
                    className={`flex-1 ${labelColor} text-sm md:text-base md:leading-6`}
                    style={{
                        fontFamily: "Onest, -apple-system, Roboto, Helvetica, sans-serif",
                    }}
                >
                    {label}
                </span>
            </label>
        )}
    />
);

export default CheckboxField;
