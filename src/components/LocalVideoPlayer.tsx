'use client'
import { useState, useRef, useEffect } from "react";

const LocalVideoPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const handlePlayClick = () => {
        setIsLoading(true);
        setIsPlaying(true);
    };

    const handleVideoLoaded = () => {
        setIsLoading(false);
        // Auto-play when video is loaded
        if (videoRef.current) {
            videoRef.current.play().catch((error) => {
                console.error("Autoplay failed:", error);
                setIsLoading(false);
            });
        }
    };

    const handleVideoPlay = () => {
        setIsLoading(false);
    };

    const handleVideoError = (error: any) => {
        console.error("Video error:", error);
        setIsLoading(false);
        setIsPlaying(false);
    };

    const handleCloseVideo = () => {
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
        setIsPlaying(false);
        setIsLoading(false);
    };

    return (
        <div className="relative h-[200px] sm:h-[250px] md:h-[500px] lg:h-[665px] rounded-2xl overflow-hidden bg-black">
            {!isPlaying ? (
                // Thumbnail (before play)
                <div
                    className="relative cursor-pointer group h-full"
                    onClick={handlePlayClick}
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
                                width="32" 
                                height="32" 
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
                    <div className="absolute bottom-6 left-6 text-white">
                        <p className="text-lg font-semibold mb-1">Watch Our Story</p>
                        <p className="text-sm opacity-90">Click to play video</p>
                    </div>
                </div>
            ) : (
                // Video player (after click)
                <div className="relative w-full h-full bg-black">
                    {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
                            <div className="text-white text-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                                <p className="text-lg">Loading video...</p>
                            </div>
                        </div>
                    )}
                    
                    <video
                        ref={videoRef}
                        className="w-full h-full object-contain"
                        controls
                        autoPlay
                        muted={false} // You can set this to true if you want muted autoplay
                        preload="metadata"
                        onLoadedData={handleVideoLoaded}
                        onPlay={handleVideoPlay}
                        onError={handleVideoError}
                        poster="https://api.builder.io/api/v1/image/assets/TEMP/a5952939ffe1e87a950082a3c88c1f3111d2f009?width=2560"
                    >
                        {/* Primary video source - you'll replace this with your video */}
                        <source src="/videos/lumina-intro.mp4" type="video/mp4" />
                        
                        {/* Fallback for different formats */}
                        <source src="/videos/lumina-intro.webm" type="video/webm" />
                        <source src="/videos/lumina-intro.ogv" type="video/ogg" />
                        
                        {/* Fallback message */}
                        <p className="text-white text-center p-8">
                            Your browser does not support the video tag. 
                            <a href="/videos/lumina-intro.mp4" className="underline ml-2">
                                Download the video instead.
                            </a>
                        </p>
                    </video>
                    
                    {/* Custom close button */}
                    <button
                        onClick={handleCloseVideo}
                        className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition-all z-20"
                        aria-label="Close video"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                        </svg>
                    </button>

                    {/* Video info overlay */}
                    <div className="absolute bottom-4 left-4 text-white bg-black bg-opacity-50 px-4 py-2 rounded-lg">
                        <p className="text-sm font-semibold">Lumina Talent Advisory</p>
                        <p className="text-xs opacity-90">Company Introduction</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LocalVideoPlayer;