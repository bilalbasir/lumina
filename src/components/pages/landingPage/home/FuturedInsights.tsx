'use client'
import PrimaryButton from '@/components/button/PrimaryButton';
import ForwardIcon from '@/components/icons/forwardIcon/ForwardIcon';
import { slugify } from '@/utils/slugify';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface BlogCard {
  image: string;
  title: string;
  date: string;
  link: string;
}

const FuturedInsights = () => {
  const blogCards: BlogCard[] = [
    {
      image: "https://api.builder.io/api/v1/image/assets/TEMP/ad3dca63897b2f0868f1a6fbfb3be0a10b257010?width=821",
      title: "The Future of Work: Adapting to Hybrid Models",
      date: "July 14, 2025",
      link: "/blogs"
    },
    {
      image: "https://api.builder.io/api/v1/image/assets/TEMP/daea0f4baf9e6c040ef0440c883fcbec0af9248a?width=821",
      title: "The Future of Work: Adapting to Hybrid Models",
      date: "July 14, 2025",
      link: "/blogs"
    },
    {
      image: "https://api.builder.io/api/v1/image/assets/TEMP/f1a0cb3c37f7fa678481bea4a2490620bab9c4da?width=821",
      title: "The Future of Work: Adapting to Hybrid Models",
      date: "July 14, 2025",
      link: "/blogs"
    },
    {
      image: "https://api.builder.io/api/v1/image/assets/TEMP/f1a0cb3c37f7fa678481bea4a2490620bab9c4da?width=821",
      title: "The Future of Work: Adapting to Hybrid Models",
      date: "July 14, 2025",
      link: "/blogs"
    },
    {
      image: "https://api.builder.io/api/v1/image/assets/TEMP/ad3dca63897b2f0868f1a6fbfb3be0a10b257010?width=821",
      title: "The Future of Work: Adapting to Hybrid Models",
      date: "July 14, 2025",
      link: "/blogs"
    },
    {
      image: "https://api.builder.io/api/v1/image/assets/TEMP/daea0f4baf9e6c040ef0440c883fcbec0af9248a?width=821",
      title: "The Future of Work: Adapting to Hybrid Models",
      date: "July 14, 2025",
      link: "/blogs"
    }
  ];
  const router = useRouter()
  return (
    <section className="bg-[#053328] py-10 px-4 sm:px-6 lg:px-20">
      <div className=" mx-auto">
        {/* Section Header */}
        <div className="flex flex-col  gap-4 mb-10">
          <div className="flex items-center gap-2 md::gap-4 w-full">
            <h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#F3F3F3] whitespace-nowrap"
              style={{ fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif' }}
            >
              Futured Insights
            </h2>
            <div className="h-0.5 flex-1 bg-[#2CC294]"></div>
          </div>
          <p
            className="text-left text-base sm:text-lg md:text-xl text-[#E5E5E5] leading-[150%]"
            style={{ fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif' }}
          >
            Join hundreds of satisfied clients who have chosen our professional padel court installation services.
          </p>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {blogCards.map((card, index) => (
            <div key={index} className="flex flex-col gap-4">
              {/* Card Image */}
              <div className="block relative group overflow-hidden">
                <div className="relative h-[200px] w-full ">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <Link href={`/blogs/${slugify(card.title)}`}
                  className="absolute bottom-0 md:bottom-[-40px] group-hover:bottom-0 left-0 right-0 h-10 
             bg-white/10 backdrop-blur-md 
             border-t border-white/20 shadow-md
             flex items-center justify-center 
             transition-all duration-500 ease-out 
             cursor-pointer rounded-bl-lg rounded-br-lg"
                >
                  <div
                    className="text-white text-base flex items-center gap-x-2"
                    style={{ fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif' }}
                  >
                    <p>
                      Read more
                    </p>
                    <ForwardIcon />
                  </div>

                </Link>
              </div>

              {/* Card Content */}
              <div className="flex flex-col gap-3">
                <h3
                  className="text-xl md:text-2xl lg:text-[28px] text-[#F3F3F3] leading-[150%]"
                  style={{ fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif' }}
                >
                  {card.title}
                </h3>
                <p
                  className="text-sm text-[#CCC] leading-[150%]"
                  style={{ fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif' }}
                >
                  {card.date}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          {/* <Link
            href="/blogs"
            className="flex h-[52px] px-8 py-4 justify-center items-center gap-2 rounded border border-[#CCC] bg-[#D5EED7] text-[#282828] text-base font-medium transition-colors duration-200 hover:bg-[#C5DEC7]"
            style={{ fontFamily: 'Onest, -apple-system, Roboto, Helvetica, sans-serif' }}
          >
            View More Blogs
          </Link> */}
          <PrimaryButton text='View More Blogs' onClick={() => router.push("/blogs")} width='w-full lg:w-auto' />

        </div>
      </div>
    </section>
  );
};

export default FuturedInsights;
