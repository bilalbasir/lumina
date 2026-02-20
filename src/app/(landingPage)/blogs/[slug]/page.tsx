'use client'

import BlogDetail from '@/components/pages/landingPage/blogs/BlogDetail';
import ContentOverview from '@/components/pages/landingPage/blogs/ContentOverview';
import HeroImgSvg from '@/components/svgDesign/heroImgSvg'
import { useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react'
import blogApi from '@/app/apiServices/blogApi/BlogApi';
import { imageBaseUrl } from '@/app/apiServices/baseUrl/BaseUrl';

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

const Page = () => {
    const params = useParams()
    const slug = params?.slug as string

    const [selectedContent, setSelectedContent] = useState<string>()
    const [blogData, setBlogData] = useState<BlogData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (slug) {
            fetchBlogBySlug()
        }
    }, [slug])

    const fetchBlogBySlug = async () => {
        try {
            setLoading(true)
            const response = await blogApi.getBlogBySlug(slug)
            if (response.success) {
                setBlogData(response.data)
            } else {
                setError('Blog not found')
            }
        } catch (err) {
            setError('Failed to load blog')
            console.error('Error fetching blog:', err)
        } finally {
            setLoading(false)
        }
    }

    const getImageUrl = (imageUrl: string) => {
        if (!imageUrl) return "";
        if (imageUrl.startsWith('http')) return imageUrl;
        return `${imageBaseUrl}/${imageUrl}`;
    };

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

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primaryColor"></div>
            </div>
        )
    }

    if (error || !blogData) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen gap-4">
                <div className="text-red-500 text-2xl font-bold">{error || 'Blog not found'}</div>
                <button onClick={() => window.history.back()} className="text-primaryColor underline">Go Back</button>
            </div>
        )
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
                <section className='w-[100%] lg:w-[24%] sticky top-[68px] lg:top-20 self-start bg-white z-20'>
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

export default Page