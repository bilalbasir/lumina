'use client'
import ForwardIcon from '@/components/icons/forwardIcon/ForwardIcon';
import HeroImgSvg from '@/components/svgDesign/heroImgSvg';
import { slugify } from '@/utils/slugify';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import blogApi from '@/app/apiServices/blogApi/BlogApi';
import { imageBaseUrl } from '@/app/apiServices/baseUrl/BaseUrl';

interface Blog {
  _id: string;
  title: string;
  slugUrl: string;
  bannerImage: string;
  featuredImage: string;
  shortDescription: string;
  authorName: string;
  createdAt: string;
  tags: string[];
}

export default function Blogs() {
  const [blogPosts, setBlogPosts] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchBlogs();
  }, [page, searchTerm]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await blogApi.getAllBlogs(page, searchTerm);
      if (response.success) {
        setBlogPosts(response.data.blogs);
        setTotalPages(response.data.totalPages);
      }
    } catch (err) {
      setError('Failed to load blogs');
      console.error('Error fetching blogs:', err);
    } finally {
      setLoading(false);
    }
  };

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
      <div className=" mx-auto px-4 sm:px-6 lg:px-20 py-12 bg-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
          <div>
            <p className='text-5xl leading-[57px] font-semibold text-black'>Blogs</p>
            <p className='mt-6 text-[#686868] text-base font-medium max-w-4xl'>
              "Our blog provides in-depth insights, expert strategies, and practical guidance on recruitment, leadership, and workforce development. From attracting and securing top-tier talent to optimizing organizational processes, we cover the latest trends, proven methods, and actionable tips that help businesses achieve long-term growth."
            </p>
          </div>

          {/* Search Bar */}
          <div className="mt-6 md:mt-0 md:ml-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search blogs..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setPage(1); // Reset to first page when searching
                }}
                className="w-full md:w-80 px-4 py-3 border border-gray-500 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00634F] focus:border-transparent"
              />
              {searchTerm && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setPage(1);
                  }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>


        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="text-lg">Loading blogs...</div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="flex justify-center items-center py-20">
            <div className="text-red-500 text-lg">{error}</div>
          </div>
        )}

        {/* Blog Grid */}
        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-9 m-auto">
              {blogPosts?.map((blog, idx) =>
                <div key={blog._id} className="w-full max-w-[428px] m-auto">
                  <div className='relative group w-full h-full rounded-md overflow-hidden'>
                    <img
                      src={blog.bannerImage ? (blog.bannerImage.startsWith('http') ? blog.bannerImage : `${imageBaseUrl}/${blog.bannerImage}`) : '/assets/blog/blogImg1.png'}
                      alt={blog.title}
                      className=" w-full h-[200px] object-cover rounded-md"
                    />
                    <Link href={`/blogs/${blog.slugUrl}`}
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
                        <p>Read more</p>
                        <ForwardIcon />
                      </div>
                    </Link>
                  </div>
                  <p className='text-[28px] text-[#131313] mt-2 line-clamp-2'>{blog.title}</p>
                  <p className='text-[14px] text-[#4E4E4E] mt-1'>{new Date(blog.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  {blog.tags && blog.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {blog.tags.slice(0, 3).map((tag, tagIdx) => (
                        <span key={tagIdx} className="bg-[#00634F]/10 text-[#00634F] text-xs px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-12 gap-2 text-black">
                <button
                  onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                  className="px-4 py-2 border border-gray-700 text-black rounded disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="px-4 py-2">{page} of {totalPages}</span>
                <button
                  onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={page === totalPages}
                  className="px-4 py-2 border border-gray-700 text-black rounded disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}


      </div>
    </div>
  );
}
