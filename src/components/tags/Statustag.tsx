import React from 'react'
interface StatustagProps {
    statusName: string
}
export const Statustag: React.FC<StatustagProps> = ({ statusName }) => {
    return (
        <div className={`px-3 py-1 w-auto inline-block rounded-full text-xs font-medium ${statusName === "Active" || statusName === "Open" || statusName === "new"
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
            }`}>{statusName}</div>
    )
}
