import React from "react";

const Loader = () => {
    return (
        <div className="w-[100vw] h-screen fixed flex items-center justify-center bg-black/30  top-0 left-0 z-50">

            <div className="flex justify-center items-center h-[200px] w-[200px] rounded-lg bg-white/70">
                <div className="relative flex items-center justify-center">
                    {/* Outer spinning ring */}
                    <div className="w-16 h-16 rounded-full border-4 border-t-transparent border-b-transparent border-[#00624F] animate-spin"></div>

                    {/* Middle pulse with gradient */}
                    <div className="absolute w-10 h-10 rounded-full bg-gradient-to-r from-[#00624F] to-[#C0DCD5] animate-pulse"></div>

                    {/* Inner glowing dot */}
                    <div className="absolute w-4 h-4 rounded-full bg-[#00624F] shadow-md"></div>
                </div>
            </div>
        </div>
    );
};

export default Loader;
