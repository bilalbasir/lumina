"use client";

import React, { useState, useEffect } from "react";
import { Upload as UploadIcon, FileText, X } from "lucide-react";

type UploadFileProps = {
    label: string;
    name: string;
    required?: boolean;
    accept?: string;
    placeholder?: string;
    multiple?: boolean;
    register: any; // react-hook-form register
    error?: any;
    setValue?: any; // Optional: react-hook-form setValue
    defaultImages?: string[]; // Existing images from backend
};

const UploadMultiFile: React.FC<UploadFileProps> = ({
    label,
    name,
    required = false,
    accept = ".png,.jpg,.jpeg,.gif,.webp",
    placeholder = "Upload additional images",
    multiple = true,
    register,
    error,
    setValue,
    defaultImages = [],
}) => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const [existingImages, setExistingImages] = useState<string[]>(defaultImages);

    useEffect(() => {
        if (defaultImages && defaultImages.length > 0) {
            setExistingImages(defaultImages);
        }
    }, [defaultImages]);

    const syncWithForm = (files: File[]) => {
        if (setValue) {
            setValue(name, files);
        } else {
            try {
                const dataTransfer = new DataTransfer();
                files.forEach(file => dataTransfer.items.add(file));
                const input = document.getElementById(name) as HTMLInputElement;
                if (input) {
                    input.files = dataTransfer.files;
                    const event = new Event('change', { bubbles: true });
                    input.dispatchEvent(event);
                }
            } catch (err) {
                console.error("DataTransfer error:", err);
            }
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newFiles = e.target.files ? Array.from(e.target.files) : [];
        if (newFiles.length === 0) return;

        let updatedFiles: File[];
        if (multiple) {
            updatedFiles = [...selectedFiles, ...newFiles];
        } else {
            updatedFiles = newFiles;
            previews.forEach(url => url && URL.revokeObjectURL(url));
        }

        setSelectedFiles(updatedFiles);

        const newPreviews = newFiles.map(file =>
            file.type.startsWith("image/") ? URL.createObjectURL(file) : ""
        );

        if (multiple) {
            setPreviews([...previews, ...newPreviews]);
        } else {
            setPreviews(newPreviews);
        }

        syncWithForm(updatedFiles);
    };

    const removeFile = (index: number, isExisting: boolean) => {
        if (isExisting) {
            const updated = existingImages.filter((_, i) => i !== index);
            setExistingImages(updated);
            if (setValue) {
                setValue(`${name}_existing`, updated);
            }
            return;
        }

        const updatedFiles = selectedFiles.filter((_, i) => i !== index);
        setSelectedFiles(updatedFiles);

        if (previews[index]) {
            URL.revokeObjectURL(previews[index]);
        }
        const updatedPreviews = previews.filter((_, i) => i !== index);
        setPreviews(updatedPreviews);

        syncWithForm(updatedFiles);
    };

    useEffect(() => {
        return () => {
            previews.forEach(url => {
                if (url && url.startsWith("blob:")) {
                    URL.revokeObjectURL(url);
                }
            });
        };
    }, [previews]);

    return (
        <div className="flex flex-col w-full gap-3">
            <label
                className="text-[#131313] text-sm font-semibold leading-[150%] mb-1"
                style={{
                    fontFamily: "Onest, -apple-system, Roboto, Helvetica, sans-serif",
                }}
            >
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {/* Existing Backend Images */}
                {existingImages.map((url, index) => (
                    <div
                        key={`existing-${index}`}
                        className="relative group aspect-square rounded-xl border border-gray-200 overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300"
                    >
                        <img
                            src={url}
                            alt={`Existing ${index}`}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <button
                                type="button"
                                onClick={() => removeFile(index, true)}
                                className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transform hover:scale-110 transition-all duration-200 cursor-pointer"
                                title="Remove existing image"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    </div>
                ))}

                {/* Newly Selected Files */}
                {selectedFiles.map((file, index) => (
                    <div
                        key={`new-${index}`}
                        className="relative group aspect-square rounded-xl border border-gray-200 overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300"
                    >
                        {previews[index] ? (
                            <img
                                src={previews[index]}
                                alt={`Preview ${index}`}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full p-2 bg-gray-50">
                                <FileText size={24} className="text-gray-400 mb-1" />
                                <p className="text-[10px] text-gray-500 truncate w-full text-center px-2">
                                    {file.name}
                                </p>
                            </div>
                        )}
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <button
                                type="button"
                                onClick={() => removeFile(index, false)}
                                className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transform hover:scale-110 transition-all duration-200 cursor-pointer"
                                title="Remove image"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    </div>
                ))}

                {(multiple || (selectedFiles.length + existingImages.length) === 0) && (
                    <label
                        htmlFor={name}
                        className="flex flex-col items-center justify-center aspect-square rounded-xl border-2 border-dashed border-gray-300 cursor-pointer hover:border-[#00634F] hover:bg-[#00634F]/5 transition-all duration-300 group"
                    >
                        <input
                            id={name}
                            type="file"
                            accept={accept}
                            multiple={multiple}
                            {...register(name)}
                            onChange={handleFileChange}
                            className="hidden"
                        />
                        <div className="bg-gray-100 p-3 rounded-full group-hover:bg-[#00634F]/10 transition-colors duration-300">
                            <UploadIcon className="text-gray-400 group-hover:text-[#00634F] transition-colors" size={24} />
                        </div>
                        <p className="mt-2 text-[#6B7280] group-hover:text-[#00634F] text-[11px] font-medium text-center px-4 transition-colors">
                            {placeholder || "Add more"}
                        </p>
                    </label>
                )}
            </div>

            {error && (
                <span className="text-red-500 text-xs font-medium mt-1">
                    {error.message}
                </span>
            )}
        </div>
    );
};

export default UploadMultiFile;


