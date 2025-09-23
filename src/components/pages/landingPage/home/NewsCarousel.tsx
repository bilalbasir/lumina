'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const NewsCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const newsItems = [
    {
      publication: "Fortune",
      title: "Why Courageous Cultures Outperform Safe Ones",
      link: "#",
      publicationColor: "#0F766E"
    },
    {
      publication: "Harvard Business Review",
      title: "The Future of Remote Leadership Excellence",
      link: "#",
      publicationColor: "#0F766E"
    },
    {
      publication: "Forbes",
      title: "Building Resilient Teams in Uncertain Times",
      link: "#",
      publicationColor: "#0F766E"
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % newsItems.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [newsItems.length]);

  const handleIndicatorClick = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative w-full h-[525px] bg-[#F0F9F1] overflow-hidden">
      {/* Background Decorative SVGs */}
      <div className="absolute inset-0">
        {/* Right Side SVG */}
        <svg
          className="absolute right-0 top-0 w-[655px] h-full mix-blend-multiply"
          width="655"
          height="525"
          viewBox="0 0 655 525"
          fill="none"
        >
          <g style={{ mixBlendMode: 'multiply' }}>
            <mask id="mask0_545_9357" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="0" y="-115" width="681" height="687">
              <path d="M680.408 -114.985L0 -114.985L3.9803e-05 571.634L680.408 571.634L680.408 -114.985Z" fill="white" />
            </mask>
            <g mask="url(#mask0_545_9357)">
              <path d="M670.21 571.637L670.21 -42.2834C582.329 50.9047 545.015 2.01737 448.688 119.004C344.894 245.012 380.121 311.504 276.318 437.595C191.094 541.055 152.084 514.771 83.4082 571.774L670.21 571.637Z" fill="url(#paint0_linear_545_9357)" />
              <path d="M670.21 -42.2834C582.329 50.9047 545.015 2.01737 448.688 119.004C344.894 245.012 380.121 311.504 276.318 437.595C191.094 541.055 152.084 514.771 83.4082 571.774" stroke="white" strokeMiterlimit="10" />
            </g>
          </g>
          <defs>
            <linearGradient id="paint0_linear_545_9357" x1="456.172" y1="430.193" x2="285.032" y2="274.378" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F0F0F0" />
              <stop offset="1" stopColor="white" />
            </linearGradient>
          </defs>
        </svg>

        {/* Left Side SVG */}
        <svg
          className="absolute left-[-47px] top-[0px] w-[634px] h-full mix-blend-multiply"
          width="634"
          height="525"
          viewBox="0 0 634 525"
          fill="none"
        >
          <g style={{ mixBlendMode: 'multiply' }}>
            <mask id="mask0_545_9379" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="-47" y="-81" width="681" height="688">
              <path d="M-46.9999 -80.1876L633.408 -80.1875L633.408 606.432L-47 606.432L-46.9999 -80.1876Z" fill="white" />
            </mask>
            <g mask="url(#mask0_545_9379)">
              <path d="M-36.8023 606.435L-36.8022 -7.48553C51.0793 85.7025 88.3929 36.8152 184.721 153.802C288.515 279.81 253.288 346.302 357.091 472.393C442.314 575.853 481.324 549.569 550 606.572L-36.8023 606.435Z" fill="url(#paint0_linear_545_9379)" />
              <path d="M-36.8022 -7.48553C51.0793 85.7025 88.3929 36.8152 184.721 153.802C288.515 279.81 253.288 346.302 357.091 472.393C442.314 575.853 481.324 549.569 550 606.572" stroke="white" strokeMiterlimit="10" />
            </g>
          </g>
          <defs>
            <linearGradient id="paint0_linear_545_9379" x1="177.236" y1="464.991" x2="348.376" y2="309.176" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F0F0F0" />
              <stop offset="1" stopColor="white" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full px-8">
        <div className="flex flex-col items-center gap-15 max-w-5xl text-center">
          {/* Header */}
          <div className="flex flex-col items-center gap-6">
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1D1D1D] leading-[120%]"
              style={{ fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif' }}
            >
              Lumina Talent in the News
            </h2>

            {/* Publication and Article */}
            <div className="flex flex-col items-center gap-5">
              <h3
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-[120%]"
                style={{
                  fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif',
                  color: newsItems[currentSlide].publicationColor
                }}
              >
                {newsItems[currentSlide].publication}
              </h3>

              {/* Article Link */}
              <Link
                href={newsItems[currentSlide].link}
                className="flex items-center gap-4 group"
              >
                <span
                  className="text-base sm:text-lg md:text-xl text-[#2CC294] underline group-hover:text-[#22A371] transition-colors"
                  style={{ fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif' }}
                >
                  {newsItems[currentSlide].title}
                </span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="group-hover:scale-110 transition-transform"
                >
                  <g clipPath="url(#clip0_545_9345)">
                    <path d="M14.1666 16.0001H1.83335C0.82202 16.0001 0.00012207 15.1781 0.00012207 14.1669V4.50022C0.00012207 3.48889 0.821989 2.66699 1.83335 2.66699H4.16671C4.4427 2.66699 4.6667 2.89099 4.6667 3.16699C4.6667 3.44298 4.4427 3.66698 4.16671 3.66698H1.83335C1.37398 3.66698 1.00011 4.04089 1.00011 4.50022V14.1669C1.00011 14.6261 1.37401 15.0001 1.83335 15.0001H14.1666C14.626 15.0001 15 14.6261 15 14.1669V8.50019C15 8.22419 15.224 8.00019 15.5 8.00019C15.776 8.00019 16 8.22419 16 8.50019V14.1669C16 15.1781 15.1779 16.0001 14.1666 16.0001Z" fill="#00624F" />
                    <path d="M4.49937 10.6581C4.46228 10.6583 4.42532 10.6538 4.38937 10.6447C4.16343 10.5921 4.00012 10.3987 4.00012 10.1668V9.16679C4.00012 5.58283 6.91609 2.66686 10.5001 2.66686H10.6667V0.500127C10.6668 0.400373 10.6966 0.302913 10.7524 0.220244C10.8083 0.137575 10.8875 0.0734642 10.98 0.0361311C11.0724 -0.00107697 11.1739 -0.00978843 11.2713 0.011117C11.3687 0.0320224 11.4576 0.0815889 11.5266 0.153442L15.86 4.6534C16.0466 4.84677 16.0466 5.15339 15.86 5.34677L11.5266 9.84672C11.3853 9.99407 11.1673 10.0395 10.98 9.96403C10.8875 9.9267 10.8083 9.86259 10.7524 9.77992C10.6966 9.69725 10.6668 9.59979 10.6667 9.50004V7.33344H9.87469C7.77743 7.33344 5.89267 8.4987 4.95543 10.374C4.86936 10.5474 4.68871 10.6581 4.49937 10.6581ZM10.5001 3.66685C7.70002 3.66685 5.38145 5.77011 5.04211 8.48002C6.25398 7.12812 7.99202 6.33344 9.87469 6.33344H11.1667C11.4427 6.33344 11.6667 6.55744 11.6667 6.83344V8.26005L14.8059 5.00008L11.6667 1.74011V3.16685C11.6667 3.44285 11.4427 3.66685 11.1667 3.66685H10.5001Z" fill="#00624F" />
                  </g>
                  <defs>
                    <clipPath id="clip0_545_9345">
                      <rect width="16" height="16" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </Link>
            </div>
          </div>

          {/* Carousel Indicators */}
          <div className="flex items-center gap-2 mt-8">
            {newsItems.map((_, index) => (
              <button
                key={index}
                onClick={() => handleIndicatorClick(index)}
                className={`w-[90px] sm:w-[114px] h-[5px] rounded transition-colors duration-300 ${index === currentSlide ? 'bg-[#0F766E]' : 'bg-[#D9D9D9]'
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsCarousel;
