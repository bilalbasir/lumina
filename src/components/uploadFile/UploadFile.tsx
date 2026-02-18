"use client";

import React, { useState } from "react";
import { Upload as UploadIcon, FileText } from "lucide-react";

type UploadFileProps = {
    label: string;
    name: string;
    required?: boolean;
    accept?: string;
    placeholder?: string;
    register: any; // react-hook-form register
    error?: any;
    defaultValue?: string;
};

const UploadFile: React.FC<UploadFileProps> = ({
    label,
    name,
    required = false,
    accept = ".pdf,.doc,.docx,.png,.jpg,.jpeg",
    placeholder = "Upload your file",
    register,
    error,
    defaultValue,
}) => {
    const [preview, setPreview] = useState<string | null>(defaultValue || null);
    const [fileName, setFileName] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFileName(file.name);
            if (file.type.startsWith("image/")) {
                const url = URL.createObjectURL(file);
                setPreview(url);
            } else {
                setPreview(null);
            }
        }
    };

    // Update preview if defaultValue changes (e.g. after fetch)
    React.useEffect(() => {
        if (defaultValue) {
            setPreview(defaultValue);
        }
    }, [defaultValue]);

    return (
        <div className="flex flex-col items-start gap-2 w-full">
            <label
                htmlFor={name}
                className="w-full text-[#131313] text-sm font-medium leading-[150%]"
                style={{
                    fontFamily: "Onest, -apple-system, Roboto, Helvetica, sans-serif",
                }}
            >
                {label}
                {required && " *"}
            </label>

            <label
                htmlFor={name}
                className="flex h-40 px-5 py-9 justify-center items-center w-full rounded border-2 border-dashed border-[#D1D5DB] cursor-pointer hover:border-[#00634F] transition-colors relative"
            >
                <input
                    id={name}
                    type="file"
                    accept={accept}
                    {...register(name, {
                        required,
                        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                            handleFileChange(e); // your preview logic
                        },
                    })}
                    className="hidden"
                />

                {/* Preview Section */}
                {preview ? (
                    <img
                        src={preview}
                        alt="Preview"
                        className="absolute inset-0 w-full h-full object-cover rounded"
                    />
                ) : fileName ? (
                    <div className="flex flex-col items-center gap-2">
                        <FileText size={32} className="text-gray-500" />
                        <p className="text-gray-900 text-sm font-medium">{fileName}</p>
                        <p className="text-gray-500 text-xs">Click to change file</p>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-2">
                        <UploadIcon />
                        <p className="text-gray-900 text-sm font-medium">{placeholder}</p>
                        <p className="text-gray-500 text-xs">Click to upload</p>
                    </div>
                )}
            </label>

            {error && (
                <span className="text-red-500 text-sm mt-1">{error.message}</span>
            )}
        </div>
    );
};

export default UploadFile;
