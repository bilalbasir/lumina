'use client'

import React from "react";
import EditIcon from "../icons/editIcon/EditIcon";
import DeleteIcon from "../icons/deleteIcon/DeleteIcon";
import EyeIcon from "../icons/eyeIcon/EyeIcon";
import { roboto } from "@/app/lib/font";
import { Statustag } from "../tags/Statustag";

interface Column {
    key: string;
    label: string;
}

interface TableProps {
    columns: Column[];
    data: any[];
    onEditClick: (id: string) => void;
    onViewClick?: (id: string) => void;
    onDeleteClick?: (id: string) => void;
    isDeleteIconShow?: boolean
    isViewIconShow?: boolean
    isEditIconShow?: boolean
}

const Table: React.FC<TableProps> = ({
    columns, data, onEditClick, onViewClick, onDeleteClick, isDeleteIconShow = true,
    isViewIconShow = true,
    isEditIconShow = true,
}) => {

    return (
        <>
            {data?.length === 0 ? <p className="w-full text-center p-2 border border-b-gray-300 rounded-lg">
                No Data Found
            </p> :


                <div className="overflow-x-auto bg-white">
                    <table className="min-w-full border-collapse">
                        <thead className="bg-[#F9FAFB] text-greyscale600 text-sm ">
                            <tr className="border-1 border-x-0 border-greyscale100">
                                {columns.map((col) => (
                                    <th
                                        key={col.key}
                                        className="px-4 py-3 text-left font-[500]"
                                    >
                                        {col.label}
                                    </th>
                                ))}
                                <th className="px-4 py-3 border-b border-gray-200 font-[500]">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody className={`agBodyMediumGrey900 ${roboto.className}`}>
                            {data.map((row, idx) => (
                                <tr
                                    key={idx}
                                    className={`${idx % 2 !== 0 && "bg-[#F9FAFB]"} hover:bg-gray-50 border-1 border-b border-greyscale100 border-x-0`}
                                >
                                    {columns.map((col) => {
                                        let cellValue = row[col.key];
                                        if (col.key === "message" && typeof cellValue === "string") {
                                            cellValue = cellValue.length > 20 ? cellValue.substring(0, 20) + "..." : cellValue;
                                        }
                                        return (
                                            <td key={col.key} className="px-4 py-3">
                                                {/* Status tag */}
                                                {col.key === "status" ? (
                                                    <Statustag statusName={cellValue} />
                                                ) : typeof cellValue === "object" && cellValue !== null ? (
                                                    // Custom render if value is object
                                                    <div className="flex items-center space-x-3">
                                                        {cellValue.img &&
                                                            <img
                                                                src="/assets/dp.jpg"
                                                                alt={cellValue.name}
                                                                className="w-10 h-10 rounded-full object-cover"
                                                            />
                                                        }
                                                        <div className="flex flex-col">
                                                            <span className="font-medium text-gray-900">{cellValue.name}</span>
                                                            <span className="text-sm text-gray-500">{cellValue.email}</span>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    // Default render
                                                    cellValue
                                                )}
                                            </td>
                                        );
                                    })}
                                    <td className="px-4 py-3 text-center align-middle">
                                        <div className="flex space-x-3 items-center justify-center">
                                            {isEditIconShow && <div className="cursor-pointer" onClick={() => onEditClick(row._id)}>
                                                <EditIcon />
                                            </div>}
                                            {isDeleteIconShow && <div className="cursor-pointer" onClick={() => onDeleteClick?.(row._id)}>
                                                <DeleteIcon />
                                            </div>}
                                            {isViewIconShow && <div className="cursor-pointer" onClick={() => onViewClick?.(row._id)}>
                                                <EyeIcon />
                                            </div>}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }

        </>
    );
};

export default Table;
