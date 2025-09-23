const JoinOurTeamSection = () => {
  return (
    <section className="flex flex-col items-start gap-10 w-[100%]  sm:px-6 lg:px-20 py-16">
      <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-16 w-[100%]">
        {/* Image */}
        <div className="flex-shrink-0">
          <img
            src="/assets/careers/hero/careerHeroSectionImg.png"
            alt="Team collaboration at Lumina Talent Advisory"
            className="w-[100%] md:max-w-[523px] h-auto aspect-[523/358] sm:rounded-[15.3px] shadow-lg"
            style={{
              boxShadow: '0 4px 6px -4px rgba(0, 0, 0, 0.10), 0 10px 15px -3px rgba(0, 0, 0, 0.10)'
            }}
          />
        </div>

        {/* Content */}
        <div className="flex flex-col items-start gap-8 flex-1 px-4 sm:px-0">
          <div className="flex flex-col items-start gap-6 w-full">
            {/* Title */}
            <h2
              className="w-full text-gray-900 text-2xl sm:text-4xl lg:text-[48px] font-bold leading-tight lg:leading-[57.6px]"
              style={{
                fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif',
                color: '#1D1D1D'
              }}
            >
              Join Our Growing Team
            </h2>

            {/* Description */}
            <div
              className="w-full text-gray-600 text-sm sm:text-base leading-relaxed space-y-4"
              style={{
                fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif',
                color: '#686868',
                lineHeight: '24px'
              }}
            >
              <p>
                At Lumina Talent Advisory, we believe in fostering a culture of innovation, diversity, and continuous growth. Our team is passionate about connecting exceptional talent with transformative opportunities.
              </p>
              <p>
                We're committed to creating an inclusive environment where every team member can thrive, learn, and make a meaningful impact in the talent acquisition industry.
              </p>
              <p>
                Join us in shaping the future of talent advisory services while building your own successful career path.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinOurTeamSection;
