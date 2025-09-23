'use client'

import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    // if (totalPages <= 1) return null; // hide if only one page

    const pageNumbers = Array.from({ length: totalPages }, (_, idx) => idx + 1);

    return (
        <div className="flex justify-center mt-4 gap-2">
            <button
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                className={`px-3 py-1 rounded bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
                Previous
            </button>

            {pageNumbers.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`px-3 py-1 rounded ${currentPage === page ? 'bg-[#00624F] text-white' : 'bg-gray-200'}`}
                >
                    {page}
                </button>
            ))}

            <button
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                className={`px-3 py-1 rounded bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
