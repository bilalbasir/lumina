'use client'
import { useState, useEffect } from "react";

const VideoPlayerEnhanced = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [iframeKey, setIframeKey] = useState(0);

    const handlePlay = () => {
        setIsPlaying(true);
        // Force iframe reload with autoplay
        setIframeKey(prev => prev + 1);
    };

    // Alternative: Try direct Google Drive video URL
    const videoId = "1fY1swx0GycFiUDDptBBMEn0qApi6yFAS";
    const autoplayUrl = `https://drive.google.com/file/d/${videoId}/preview?autoplay=1&mute=0`;

    return (
        <div className="relative h-[200px] sm:h-[250px] md:h-[500px] lg:h-[665px] rounded-2xl overflow-hidden">
            {!isPlaying ? (
                // Thumbnail (before play)
                <div
                    className="relative cursor-pointer group"
                    onClick={handlePlay}
                >
                    <img
                        src="https://api.builder.io/api/v1/image/assets/TEMP/a5952939ffe1e87a950082a3c88c1f3111d2f009?width=2560"
                        alt="Lumina Talent Advisory Video"
                        className="w-full h-full object-cover"
                    />
                    
                    {/* Dark overlay for better button visibility */}
                    <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-40 transition-all duration-300"></div>
                    
                    {/* Play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform duration-200 group-hover:bg-gray-100">
                            <svg 
                                width="28" 
                                height="28" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                className="ml-1 text-gray-800"
                            >
                                <path 
                                    d="M8 5V19L19 12L8 5Z" 
                                    fill="currentColor"
                                />
                            </svg>
                        </div>
                    </div>
                    
                    {/* Play text */}
                    <div className="absolute bottom-4 left-4 text-white">
                        <p className="text-sm opacity-90">Click to play video</p>
                    </div>
                </div>
            ) : (
                // Video (after click)
                <div className="relative w-full h-full">
                    <iframe
                        key={iframeKey}
                        src={autoplayUrl}
                        title="Lumina Talent Advisory Video"
                        width="100%"
                        height="100%"
                        allow="autoplay; fullscreen; encrypted-media"
                        allowFullScreen
                        className="w-full h-full border-0"
                    />
                    
                    {/* Back to thumbnail button */}
                    <button
                        onClick={() => setIsPlaying(false)}
                        className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
                        aria-label="Close video"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                        </svg>
                    </button>
                </div>
            )}
        </div>
    );
};

export default VideoPlayerEnhanced;