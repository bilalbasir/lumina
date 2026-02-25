'use client'

import React, { useState } from 'react'
import BlogDetail from '@/components/pages/landingPage/blogs/BlogDetail';
import ContentOverview from '@/components/pages/landingPage/blogs/ContentOverview';
import HeroImgSvg from '@/components/svgDesign/heroImgSvg'
import { getImageUrl } from '@/app/apiServices/baseUrl/BaseUrl';

interface BlogData {
    _id: string;
    title: string;
    slugUrl: string;
    bannerImage: string;
    featuredImage: string;
    shortDescription: string;
    blogContent: string;
    authorName: string;
    tags: string[];
    blogContextTable: string[];
    additionalImages: string[];
    createdAt: string;
    seoTitle: string;
    metaDescription: string;
}

interface BlogPageClientProps {
    blogData: BlogData;
    slug: string;
}

const BlogPageClient = ({ blogData, slug }: BlogPageClientProps) => {
    const [selectedContent, setSelectedContent] = useState<string>()

    const transformBlogData = (blog: BlogData) => {
        // 1. Prepare Main Content for Rendering (Single Block)
        const mainContentData = [{
            heading: blog.title,
            data: blog.blogContent || "",
            // Map all additional images instead of just the first one
            additionalImages: blog.additionalImages ? blog.additionalImages.map(img => getImageUrl(img)) : []
        }];

        // 2. Prepare Sidebar Items (Table of Contents)
        const sidebarItems = blog.blogContextTable && blog.blogContextTable.length > 0
            ? blog.blogContextTable.map(heading => ({ heading }))
            : [{ heading: "Overview" }];

        return {
            overView: blog.shortDescription || "",
            featuredImage: getImageUrl(blog.featuredImage),
            data: mainContentData,
            sidebarItems: sidebarItems
        }
    }

    const transformedData = transformBlogData(blogData)

    return (
        <div>
            {/* Hero Section */}
            <section className="relative w-full h-[400px] md:h-[600px] overflow-hidden">
                {/* Background Image */}
                <img
                    src={blogData.bannerImage ? getImageUrl(blogData.bannerImage) : "/assets/blog/blogImg1.png"}
                    alt={blogData.title}
                    className="absolute inset-0 w-full h-full object-cover z-0"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 z-5">
                    <HeroImgSvg />
                </div>

                {/* Hero Content */}
                <div className="relative z-10 flex items-center justify-center h-full px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center md:gap-10 max-w-4xl text-center">
                        <div className="flex flex-col items-center gap-0.5">
                            <h1
                                className="text-3xl md:text-5xl lg:text-[64px] font-bold leading-tight md:leading-[1.2] lg:leading-[1.1] text-white shadow-sm"
                                style={{
                                    fontFamily: "Onest, -apple-system, Roboto, Helvetica, sans-serif",
                                }}
                            >
                                <span className="text-[#D5EED7]">{blogData.title || slug}</span>
                            </h1>
                        </div>
                    </div>
                </div>
            </section>

            <div className='flex items-start justify-between mx-auto flex-col-reverse lg:flex-row px-4 sm:px-6 lg:px-20 py-5 md:pt-10 lg:py-16 gap-8 bg-white'>
                {/* blog details section */}
                <section className='w-[100%] lg:w-[72%] pr-0 lg:pr-4'>
                    <BlogDetail data={transformedData} selectedContent={selectedContent || ""} />
                </section>

                {/* content overview section */}
                <section className='w-[100%] lg:w-[24%] lg:sticky lg:top-20 self-start bg-white z-20'>
                    <ContentOverview
                        contentOverview={transformedData?.sidebarItems}
                        onSelect={(heading) => setSelectedContent(heading)}
                        authorName={blogData.authorName}
                        date={new Date(blogData.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    />
                </section>
            </div>
        </div>
    )
}

export default BlogPageClient
