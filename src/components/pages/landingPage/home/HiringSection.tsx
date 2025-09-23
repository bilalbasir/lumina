'use client'
import PrimaryButton from '../../../button/PrimaryButton';
import { useRouter } from 'next/navigation';

const HiringSection = () => {
  const router = useRouter()
  return (
    <section className="relative w-full bg-white">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/422f11dcfb7628ac10de42b70a32c8dcefc92bd3?width=6076"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center px-4 sm:px-6 lg:px-28 py-16">
        {/* Main Content Header */}
        <div className="flex flex-col items-center gap-8 max-w-3xl text-center mb-12">
          {/* Main Title */}
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[120%]"
            style={{ fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif' }}
          >
            We're Hiring – Join Our Team
          </h2>

          {/* Subtitle */}
          <p
            className="text-lg md:text-xl lg:text-[22px] text-white leading-[150%]"
            style={{ fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif' }}
          >
            Be part of a dynamic team that's shaping the future of talent advisory. We offer exciting opportunities for growth, innovation, and making a meaningful impact.
          </p>

          {/* CTA Button */}
          {/* <Link
            href="/careers"
            className="flex h-[52px] max-w-[330px] px-4 py-4 justify-center items-center gap-2 rounded border border-[#CCC] bg-[#D5EED7] text-[#282828] text-base font-medium transition-colors duration-200 hover:bg-[#C5DEC7] w-full"
            style={{ fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif' }}
          >
            View Careers
          </Link> */}

          <PrimaryButton hoverBg="hover:bg-[#CCCCCC]" text='View Careers' width='w-full md:w-auto' px="md:px-28" onClick={() => router.push("/careers")} />
        </div>

        {/* Feature Cards Section */}
        <div className="w-full max-w-6xl pt-12">
          <div className="grid md:grid-cols-3 gap-8 md:gap-8">
            {/* Collaborative Culture */}
            <div className="flex flex-col items-center text-center">
              {/* Icon */}
              <div className="flex w-16 h-16 justify-center items-center rounded-full bg-white/20 mb-4">
                <svg width="26" height="24" viewBox="0 0 26 24" fill="none">
                  <path d="M13 11C13.9067 11 14.7433 11.2233 15.51 11.67C16.2767 12.1167 16.8833 12.7233 17.33 13.49C17.7767 14.2567 18 15.0933 18 16V22H16V16C16 15.48 15.8733 14.9967 15.62 14.55C15.3667 14.1033 15.0267 13.7433 14.6 13.47C14.1733 13.1967 13.7 13.04 13.18 13H13C12.48 13 11.9967 13.1267 11.55 13.38C11.1033 13.6333 10.7433 13.9733 10.47 14.4C10.1967 14.8267 10.04 15.3 10 15.82V22H8V16C8 15.0933 8.22333 14.2567 8.67 13.49C9.11667 12.7233 9.72333 12.1167 10.49 11.67C11.2567 11.2233 12.0933 11 13 11ZM6.5 14C6.78 14 7.05333 14.0333 7.32 14.1C7.14667 14.6067 7.04 15.1267 7 15.66V16.08C6.88 16.04 6.76 16.0133 6.64 16H6.5C6.11333 16 5.77667 16.13 5.49 16.39C5.20333 16.65 5.04 16.9733 5 17.36V17.5V22H3V17.5C3 16.86 3.15667 16.2733 3.47 15.74C3.78333 15.2067 4.20667 14.7833 4.74 14.47C5.27333 14.1567 5.86 14 6.5 14ZM19.5 14C20.14 14 20.7267 14.1567 21.26 14.47C21.7933 14.7833 22.2167 15.2067 22.53 15.74C22.8433 16.2733 23 16.86 23 17.5V22H21V17.5C21 17.1133 20.87 16.7767 20.61 16.49C20.35 16.2033 20.0267 16.04 19.64 16H19.5C19.3267 16 19.16 16.0267 19 16.08V16C19 15.3467 18.9 14.7133 18.7 14.1C18.9533 14.0333 19.22 14 19.5 14ZM6.5 8C6.95333 8 7.37 8.11333 7.75 8.34C8.13 8.56667 8.43333 8.87 8.66 9.25C8.88667 9.63 9 10.0467 9 10.5C9 10.9533 8.88667 11.37 8.66 11.75C8.43333 12.13 8.13 12.4333 7.75 12.66C7.37 12.8867 6.95333 13 6.5 13C6.04667 13 5.63 12.8867 5.25 12.66C4.87 12.4333 4.56667 12.13 4.34 11.75C4.11333 11.37 4 10.9533 4 10.5C4 10.0467 4.11333 9.63 4.34 9.25C4.56667 8.87 4.87 8.56667 5.25 8.34C5.63 8.11333 6.04667 8 6.5 8ZM19.5 8C19.9533 8 20.37 8.11333 20.75 8.34C21.13 8.56667 21.4333 8.87 21.66 9.25C21.8867 9.63 22 10.0467 22 10.5C22 10.9533 21.8867 11.37 21.66 11.75C21.4333 12.13 21.13 12.4333 20.75 12.66C20.37 12.8867 19.9533 13 19.5 13C19.0467 13 18.63 12.8867 18.25 12.66C17.87 12.4333 17.5667 12.13 17.34 11.75C17.1133 11.37 17 10.9533 17 10.5C17 10.0467 17.1133 9.63 17.34 9.25C17.5667 8.87 17.87 8.56667 18.25 8.34C18.63 8.11333 19.0467 8 19.5 8ZM6.5 10C6.36667 10 6.25 10.05 6.15 10.15C6.05 10.25 6 10.3667 6 10.5C6 10.6333 6.05 10.75 6.15 10.85C6.25 10.95 6.36667 11 6.5 11C6.63333 11 6.75 10.95 6.85 10.85C6.95 10.75 7 10.6333 7 10.5C7 10.3667 6.95 10.25 6.85 10.15C6.75 10.05 6.63333 10 6.5 10ZM19.5 10C19.3667 10 19.25 10.05 19.15 10.15C19.05 10.25 19 10.3667 19 10.5C19 10.6333 19.05 10.75 19.15 10.85C19.25 10.95 19.3667 11 19.5 11C19.6333 11 19.75 10.95 19.85 10.85C19.95 10.75 20 10.6333 20 10.5C20 10.3667 19.95 10.25 19.85 10.15C19.75 10.05 19.6333 10 19.5 10ZM13 2C13.72 2 14.3867 2.18 15 2.54C15.6133 2.9 16.1 3.38667 16.46 4C16.82 4.61333 17 5.28 17 6C17 6.72 16.82 7.38667 16.46 8C16.1 8.61333 15.6133 9.1 15 9.46C14.3867 9.82 13.72 10 13 10C12.28 10 11.6133 9.82 11 9.46C10.3867 9.1 9.9 8.61333 9.54 8C9.18 7.38667 9 6.72 9 6C9 5.28 9.18 4.61333 9.54 4C9.9 3.38667 10.3867 2.9 11 2.54C11.6133 2.18 12.28 2 13 2ZM13 4C12.64 4 12.3067 4.09 12 4.27C11.6933 4.45 11.45 4.69333 11.27 5C11.09 5.30667 11 5.64 11 6C11 6.36 11.09 6.69333 11.27 7C11.45 7.30667 11.6933 7.55 12 7.73C12.3067 7.91 12.64 8 13 8C13.36 8 13.6933 7.91 14 7.73C14.3067 7.55 14.55 7.30667 14.73 7C14.91 6.69333 15 6.36 15 6C15 5.64 14.91 5.30667 14.73 5C14.55 4.69333 14.3067 4.45 14 4.27C13.6933 4.09 13.36 4 13 4Z" fill="white" />
                </svg>
              </div>

              {/* Title */}
              <h3
                className="text-lg md:text-xl lg:text-[22px] font-bold text-white mb-2 leading-[150%]"
                style={{ fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif' }}
              >
                Collaborative Culture
              </h3>

              {/* Description */}
              <p
                className="text-sm md:text-base text-[#DBEAFE] leading-[150%]"
                style={{ fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif' }}
              >
                Work with talented professionals in a supportive environment
              </p>
            </div>

            {/* Growth Opportunities */}
            <div className="flex flex-col items-center text-center">
              {/* Icon */}
              <div className="flex w-16 h-16 justify-center items-center rounded-full bg-white/20 mb-4">
                <svg width="26" height="24" viewBox="0 0 26 24" fill="none">
                  <path d="M6.00001 12.7604C6.00001 11.0937 6.30001 9.50035 6.90001 7.98035C7.48667 6.51368 8.31001 5.22368 9.37001 4.11035C10.43 2.99702 11.64 2.15368 13 1.58035C14.36 2.15368 15.57 2.99702 16.63 4.11035C17.69 5.22368 18.5133 6.51368 19.1 7.98035C19.7 9.50035 20 11.0937 20 12.7604C20 13.5737 19.9267 14.3737 19.78 15.1604L21.72 16.9804C21.8 17.0604 21.85 17.157 21.87 17.2704C21.89 17.3837 21.8733 17.4937 21.82 17.6004L19.32 22.1604C19.2533 22.2804 19.1533 22.3604 19.02 22.4004C18.8867 22.4404 18.76 22.427 18.64 22.3604C18.6 22.347 18.56 22.3204 18.52 22.2804L16.3 20.0404C16.1 19.8537 15.86 19.7604 15.58 19.7604H10.42C10.14 19.7604 9.90001 19.8537 9.70001 20.0404L7.48001 22.2804C7.37334 22.3737 7.25334 22.4204 7.12001 22.4204C6.98667 22.4204 6.86667 22.3737 6.76001 22.2804C6.73334 22.2537 6.70667 22.2137 6.68001 22.1604L4.18001 17.6004C4.12667 17.4937 4.11001 17.3837 4.13001 17.2704C4.15001 17.157 4.20001 17.0604 4.28001 16.9804L6.22001 15.1604C6.07334 14.3737 6.00001 13.5737 6.00001 12.7604ZM7.48001 19.4404L8.30001 18.6404C8.58001 18.3604 8.90334 18.1437 9.27001 17.9904C9.63667 17.837 10.02 17.7604 10.42 17.7604H15.58C15.98 17.7604 16.3633 17.837 16.73 17.9904C17.0967 18.1437 17.42 18.3604 17.7 18.6404L18.52 19.4404L19.5 17.6404L18.4 16.6204C18.16 16.3804 17.9867 16.1004 17.88 15.7804C17.7733 15.4604 17.7533 15.1337 17.82 14.8004C17.94 14.1204 18 13.4404 18 12.7604C18 11.4804 17.7933 10.2537 17.38 9.08035C16.9667 7.93368 16.3833 6.90368 15.63 5.99035C14.8767 5.07702 14 4.34702 13 3.80035C12 4.34702 11.1233 5.07702 10.37 5.99035C9.61667 6.90368 9.03334 7.93368 8.62001 9.08035C8.20667 10.2537 8.00001 11.4804 8.00001 12.7604C8.00001 13.4404 8.06001 14.1204 8.18001 14.8004C8.24667 15.1337 8.22667 15.4604 8.12001 15.7804C8.01334 16.1004 7.84001 16.3804 7.60001 16.6204L6.50001 17.6404L7.48001 19.4404ZM13 12.7604C12.64 12.7604 12.3067 12.6704 12 12.4904C11.6933 12.3104 11.45 12.067 11.27 11.7604C11.09 11.4537 11 11.1204 11 10.7604C11 10.4004 11.09 10.067 11.27 9.76035C11.45 9.45368 11.6933 9.21035 12 9.03035C12.3067 8.85035 12.64 8.76035 13 8.76035C13.36 8.76035 13.6933 8.85035 14 9.03035C14.3067 9.21035 14.55 9.45368 14.73 9.76035C14.91 10.067 15 10.4004 15 10.7604C15 11.1204 14.91 11.4537 14.73 11.7604C14.55 12.067 14.3067 12.3104 14 12.4904C13.6933 12.6704 13.36 12.7604 13 12.7604Z" fill="white" />
                </svg>
              </div>

              {/* Title */}
              <h3
                className="text-lg md:text-xl lg:text-[22px] font-bold text-white mb-2 leading-[150%]"
                style={{ fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif' }}
              >
                Growth Opportunities
              </h3>

              {/* Description */}
              <p
                className="text-sm md:text-base text-[#DBEAFE] leading-[150%]"
                style={{ fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif' }}
              >
                Continuous learning and career advancement programs
              </p>
            </div>

            {/* Purpose-Driven Work */}
            <div className="flex flex-col items-center text-center">
              {/* Icon */}
              <div className="flex w-16 h-16 justify-center items-center rounded-full bg-white/20 mb-4">
                <svg width="26" height="24" viewBox="0 0 26 24" fill="none">
                  <path d="M13 4.28023C13.7734 3.5869 14.66 3.13023 15.66 2.91023C16.66 2.69023 17.6467 2.71357 18.62 2.98023C19.6334 3.26023 20.51 3.77023 21.25 4.51023C21.99 5.25023 22.5 6.1269 22.78 7.14023C23.0467 8.11357 23.07 9.0969 22.85 10.0902C22.63 11.0836 22.1734 11.9736 21.48 12.7602L13 21.2402L4.52003 12.7602C3.8267 11.9736 3.37003 11.0836 3.15003 10.0902C2.93003 9.0969 2.95337 8.11357 3.22003 7.14023C3.50003 6.1269 4.01337 5.25023 4.76003 4.51023C5.5067 3.77023 6.38003 3.26023 7.38003 2.98023C8.35337 2.71357 9.34003 2.69023 10.34 2.91023C11.34 3.13023 12.2267 3.5869 13 4.28023ZM19.82 5.92023C19.3267 5.4269 18.7534 5.09023 18.1 4.91023C17.4467 4.73023 16.7867 4.71357 16.12 4.86023C15.4534 5.0069 14.86 5.31357 14.34 5.78023L13 6.98023L11.66 5.78023C11.1534 5.31357 10.5634 5.0069 9.89003 4.86023C9.2167 4.71357 8.55337 4.73023 7.90003 4.91023C7.2467 5.09023 6.67337 5.4269 6.18003 5.92023C5.6867 6.41357 5.3467 6.9869 5.16003 7.64023C4.97337 8.29357 4.95003 8.95023 5.09003 9.61023C5.23003 10.2702 5.5267 10.8602 5.98003 11.3802L13 18.4202L20.02 11.3802C20.4734 10.8602 20.77 10.2702 20.91 9.61023C21.05 8.95023 21.0267 8.29357 20.84 7.64023C20.6534 6.9869 20.3134 6.41357 19.82 5.92023Z" fill="white" />
                </svg>
              </div>

              {/* Title */}
              <h3
                className="text-lg md:text-xl lg:text-[22px] font-bold text-white mb-2 leading-[150%]"
                style={{ fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif' }}
              >
                Purpose-Driven Work
              </h3>

              {/* Description */}
              <p
                className="text-sm md:text-base text-[#DBEAFE] leading-[150%]"
                style={{ fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif' }}
              >
                Make a real impact on organizations and people's careers
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HiringSection;
