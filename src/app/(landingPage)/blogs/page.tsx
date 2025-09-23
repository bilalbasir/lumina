import ForwardIcon from '@/components/icons/forwardIcon/ForwardIcon';
import HeroImgSvg from '@/components/svgDesign/heroImgSvg';
import { slugify } from '@/utils/slugify';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blog | Lumina Talent Advisory',
  description: 'Stay updated with the latest insights, trends, and best practices in talent acquisition and human resources.',
};

export default function Blogs() {
  const blogPosts = [

    {
      title: "The Future of Remote Hiring: Trends and Best Practices",
      date: "December 15, 2024",
      img: "/assets/blog/blogImg1.png"

    },
    {
      title: "The Future of Remote Hiring: Trends and Best Practices",
      date: "December 15, 2024",
      img: "/assets/blog/blogImg1.png"

    },
    {
      title: "The Future of Remote Hiring: Trends and Best Practices",
      date: "December 15, 2024",
      img: "/assets/blog/blogImg1.png"

    },
    {
      title: "The Future of Remote Hiring: Trends and Best Practices",
      date: "December 15, 2024",
      img: "/assets/blog/blogImg1.png"

    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative w-full h-[600px] overflow-hidden">
        {/* Background Image */}
        <img
          src="/assets/blog/hero/blogHeroImg.png"
          alt="Hero Background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Gradient Overlay */}
        <HeroImgSvg />


        {/* Hero Content */}
        <div className="relative z-10 flex items-center justify-center h-full px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-10 max-w-4xl text-center">
            <div className="flex flex-col items-center gap-0.5">
              <h1
                className="text-4xl md:text-5xl lg:text-[64px] font-bold leading-[103.2px]"
                style={{
                  fontFamily: "Onest, -apple-system, Roboto, Helvetica, sans-serif",
                }}
              >
                <span className="text-[#D5EED7]">Blogs</span>
              </h1>
              <p
                className="text-lg md:text-xl lg:text-[28px] text-white leading-[150%] max-w-[824px]"
                style={{
                  fontFamily: "Onest, -apple-system, Roboto, Helvetica, sans-serif",
                }}
              >
                Insights and strategies to attract talent, enhance recruitment, and build a strong workplace culture.              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <div className=" mx-auto px-4 sm:px-6 lg:px-20 py-12">
        <p className='text-5xl leading-[57px] font-semibold'>Blogs</p>
        <p className='mt-6 mb-16 text-[#686868] text-base font-medium'>
          "Our blog provides in-depth insights, expert strategies, and practical guidance on recruitment, leadership, and workforce development. From attracting and securing top-tier talent to optimizing organizational processes, we cover the latest trends, proven methods, and actionable tips that help businesses achieve long-term growth. Whether you’re an HR professional, business leader, or entrepreneur, you’ll find valuable resources to strengthen your recruitment strategies, align talent with organizational culture, and create a thriving workplace that drives success."
        </p>


        {/* <div className='grid grid-cols-3'> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-9 m-auto">
          {blogPosts?.map((data, idx) =>
            <div key={idx} className="w-full max-w-[428px] m-auto">
              <div className='relative group w-full h-full rounded-md overflow-hidden'>

                <img
                  src={data?.img}
                  alt={data?.title}
                  className=" w-full h-[200px] object-cover rounded-md"
                />
                <Link href={`/blogs/${slugify(data.title)}`}
                  className="absolute bottom-0 xl:bottom-[-40px] group-hover:bottom-0 left-0 right-0 h-10 
             bg-white/10 backdrop-blur-md 
             border-t border-white/20 shadow-md
             flex items-center justify-center 
             transition-all duration-500 ease-out 
             cursor-pointer"
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
              <p className='text-[28px] mt-2'>{data?.title}</p>
              <p className='text-[14px] text-[#4E4E4E] mt-2'>{data?.date}</p>
            </div>)}


        </div>


      </div>
    </div>
  );
}
