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
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                            ▶
                        </div>
                    </div>
                </div>
            ) : (
                // Video (after click)
                <iframe
                    src="https://drive.google.com/file/d/1fY1swx0GycFiUDDptBBMEn0qApi6yFAS/preview"
                    width="100%"
                    height="665"
                    allow="autoplay"
                    allowFullScreen
                ></iframe>
            )}
        </div>
    );
};

export default VideoPlayer;
