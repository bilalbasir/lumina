"use client";

import React from "react";
import { List } from "lucide-react";

type EmptyContentOverviewProps = {
    title?: string;
    subtitle?: string;
};

const EmptyContentOverview: React.FC<EmptyContentOverviewProps> = ({
    title = "No content overview items yet",
    subtitle = "Add items to create sidebar navigation",
}) => {
    return (
        <div className="flex flex-col items-center gap-2 w-full">
            <div
                className="flex h-40 px-5 py-9 justify-center items-center w-full rounded border-2 border-dashed border-[#D1D5DB] bg-white 
        cursor-default hover:border-[#00634F] transition-colors relative"
            >
                <div className="flex flex-col items-center justify-center text-center gap-2">
                    <List className="w-8 h-8 text-gray-400" />
                    <p
                        className="text-[#131313] text-sm font-medium leading-[150%]"
                        style={{
                            fontFamily: "Onest, -apple-system, Roboto, Helvetica, sans-serif",
                        }}
                    >
                        {title}
                    </p>
                    <p className="text-gray-500 text-xs">{subtitle}</p>
                </div>
            </div>
        </div>
    );
};

export default EmptyContentOverview;
