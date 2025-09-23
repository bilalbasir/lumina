const StatsSection = () => {
  const stats = [
    {
      value: "20+",
      title: "Years",
      description: "Proven expertise in talent and leadership advisory.",
      color: "#34D399",
      borderColor: "rgba(52, 211, 153, 0.30)"
    },
    {
      value: "24/7",
      title: "Availability",
      description: "Always accessible to support evolving business needs.",
      color: "#2DD4BF",
      borderColor: "rgba(45, 212, 191, 0.30)"
    },
    {
      value: "50+",
      title: "Solutions",
      description: "Crafting strategies tailored to diverse business needs.",
      color: "#10B981",
      borderColor: "rgba(16, 185, 129, 0.30)"
    }
  ];

  return (
    <section className="relative bg-[#053328] py-16 px-8 overflow-hidden">
      {/* Background Blur Effects */}
      <div className="absolute inset-0">
        <div
          className="absolute w-52 h-52 rounded-full opacity-32 blur-[53px] top-0 left-52"
          style={{ background: "rgba(52, 211, 153, 0.32)" }}
        ></div>
        <div
          className="absolute w-60 h-60 rounded-full opacity-32 blur-[115px] top-8 -left-52"
          style={{ background: "rgba(45, 212, 191, 0.32)" }}
        ></div>
        <div
          className="absolute w-60 h-60 rounded-full opacity-32 blur-[115px] top-8 right-0"
          style={{ background: "rgba(45, 212, 191, 0.32)" }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center gap-4 mb-15 text-center">
          <h2
            className=" text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-[120%] w-full md:max-w-4xl"
            style={{ fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif' }}
          >
            <span className="text-[#F3F3F3]">We help </span>
            <span className="text-[#D5EED7]">businesses</span>
            <span className="text-[#F3F3F3]"> and the people in them thrive</span>
          </h2>
          <p
            className="text-base sm:text-lg md:text-xl text-[#E5E5E5] leading-[165%] max-w-3xl"
            style={{ fontFamily: 'Rubik, -apple-system, Roboto, Helvetica, sans-serif' }}
          >
            Across the globe, the companies we partner with are driving business transformation through people.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-16 max-w-6xl mx-auto pb-16">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="relative mb-8">
                {/* Spread Glow Effect */}
                <div
                  className="absolute inset-0 w-56 h-56 rounded-full blur-3xl opacity-30"
                  style={{ backgroundColor: "#34D399" }}
                ></div>

                {/* Outer Circle */}
                <div
                  className="relative w-48 h-48 rounded-full flex items-center justify-center p-1"
                  style={{
                    border: `4px solid ${stat.borderColor}`,
                    background: "rgba(31, 41, 55, 0.50)",
                    backdropFilter: "blur(2px)",
                  }}
                >
                  {/* Inner Circle */}
                  <div
                    className="w-42 h-42 rounded-full flex items-center justify-center p-0.5"
                    style={{ border: `2px solid ${stat.color}` }}
                  >
                    <div className="w-41 h-41 rounded-full flex items-center justify-center">
                      <span
                        className="text-5xl md:text-6xl lg:text-7xl font-bold text-center"
                        style={{
                          fontFamily: "Roboto, -apple-system, Roboto, Helvetica, sans-serif",
                          color: stat.color,
                        }}
                      >
                        {stat.value}
                      </span>
                    </div>
                  </div>
                </div>
              </div>


              {/* Stat Info */}
              <div className="text-center space-y-2">
                <h3
                  className="text-lg sm:text-xl md:text-2xl font-bold text-[#E5E7EB]"
                  style={{ fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif' }}
                >
                  {stat.title}
                </h3>
                <p
                  className="text-base sm:text-lg md:text-xl text-[#E5E5E5] leading-[150%] max-w-xs mx-auto"
                  style={{ fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif' }}
                >
                  {stat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
