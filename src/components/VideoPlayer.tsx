'use client'
import { useState } from "react";

const VideoPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <div className="relative h-[200px] sm:h-[250px] md:h-[500px] lg:h-[665px] rounded-2xl overflow-hidden">
            {!isPlaying ? (
                // Thumbnail (before play)
                <div
                    className="relative cursor-pointer"
                    onClick={() => setIsPlaying(true)}
                >
                    <img
                        src="https://api.builder.io/api/v1/image/assets/TEMP/a5952939ffe1e87a950082a3c88c1f3111d2f009?width=2560"
                        alt="Lumina Talent Advisory Video"
                        className="w-full h-full object-cover"
                    />
                    {/* Play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                            <svg 
                                width="24" 
                                height="24" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                className="ml-1"
                            >
                                <path 
                                    d="M8 5V19L19 12L8 5Z" 
                                    fill="currentColor"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            ) : (
                // Video (after click) - with autoplay parameters
                <iframe
                    src="https://drive.google.com/file/d/1fY1swx0GycFiUDDptBBMEn0qApi6yFAS/preview?autoplay=1&start=1"
                    title="Lumina Talent Advisory Video"
                    width="100%"
                    height="100%"
                    allow="autoplay; fullscreen"
                    allowFullScreen
                    className="w-full h-full"
                ></iframe>
            )}
        </div>
    );
};

export default VideoPlayer;