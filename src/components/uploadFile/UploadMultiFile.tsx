"use client";

import React, { useState } from "react";
import { Upload as UploadIcon, FileText } from "lucide-react";

type UploadFileProps = {
    label: string;
    name: string;
    required?: boolean;
    accept?: string;
    placeholder?: string; // ✅ new
    multiple?: boolean;
    register: any; // react-hook-form register
    error?: any;
};

const UploadMultiFile: React.FC<UploadFileProps> = ({
    label,
    name,
    required = false,
    accept = ".png,.jpg,.jpeg,.gif,.pdf,.doc,.docx",
    placeholder = "Upload your file(s)", // ✅ default placeholder
    multiple = true,
    register,
    error,
}) => {
    const [files, setFiles] = useState<File[]>([]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
        setFiles(selectedFiles);
    };

    return (
        <div className="flex flex-col w-full gap-2">
            <label
                htmlFor={name}
                className="text-[#131313] text-base font-medium leading-[150%]"
                style={{
                    fontFamily: "Onest, -apple-system, Roboto, Helvetica, sans-serif",
                }}
            >
                {label}
                {required && " *"}
            </label>

            <label
                htmlFor={name}
                className="flex flex-col items-center justify-center w-full h-48 rounded-md border-2 border-dashed border-gray-300 cursor-pointer hover:border-[#00634F] transition-colors"
            >
                <input
                    id={name}
                    type="file"
                    accept={accept}
                    multiple={multiple}
                    {...register(name, { required })}
                    onChange={handleFileChange}
                    className="hidden"
                />

                <UploadIcon className="text-gray-400 mb-2" size={28} />

                {files.length === 0 ? (
                    <>
                        <p className="text-gray-500 text-sm">{placeholder}</p>
                        <p className="text-gray-900 text-sm font-medium">Click to upload</p>
                    </>
                ) : (
                    <div className="flex flex-col items-center">
                        {files.length === 1 ? (
                            <>
                                {files[0].type.startsWith("image/") ? (
                                    <p className="text-gray-900 text-sm font-medium">{files[0].name}</p>
                                ) : (
                                    <div className="flex flex-col items-center gap-1">
                                        <FileText size={24} className="text-gray-500" />
                                        <p className="text-gray-900 text-sm font-medium">{files[0].name}</p>
                                    </div>
                                )}
                                <p className="text-gray-500 text-xs">Click to change file</p>
                            </>
                        ) : (
                            <>
                                <p className="text-gray-900 text-sm font-medium">
                                    {files.length} files selected
                                </p>
                                <p className="text-gray-500 text-xs">Click to change files</p>
                            </>
                        )}
                    </div>
                )}
            </label>

            {error && (
                <span className="text-red-500 text-sm mt-1">{error.message}</span>
            )}
        </div>
    );
};

export default UploadMultiFile;
