import blogApi from '@/app/apiServices/blogApi/BlogApi';
import BlogPageClient from './BlogPageClient';
import { Metadata } from 'next';

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

type Props = {
    params: Promise<{ slug: string }>
}

// Utility to strip HTML tags for meta description
const stripHtml = (html: string) => {
    if (!html) return "";
    return html.replace(/<[^>]*>?/gm, '');
}

export async function generateMetadata(
    { params }: Props
): Promise<Metadata> {
    const slug = (await params).slug;
    try {
        const response = await blogApi.getBlogBySlug(slug);
        if (response.success && response.data) {
            const blog = response.data as BlogData;
            return {
                title: blog.seoTitle || blog.title,
                description: stripHtml(blog.metaDescription) || blog.shortDescription,
            }
        }
    } catch (error) {
        console.error("Error generating metadata:", error);
    }

    return {
        title: 'Blog | Lumina Talent',
        description: 'Read the latest from Lumina Talent',
    }
}

const Page = async ({ params }: Props) => {
    const slug = (await params).slug;

    let blogData: BlogData | null = null;
    let error: string | null = null;

    try {
        const response = await blogApi.getBlogBySlug(slug);
        if (response.success) {
            blogData = response.data;
        } else {
            error = 'Blog not found';
        }
    } catch (err) {
        error = 'Failed to load blog';
        console.error('Error fetching blog:', err);
    }

    if (error || !blogData) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen gap-4">
                <div className="text-red-500 text-2xl font-bold">{error || 'Blog not found'}</div>
                <a href="/blogs" className="text-primaryColor underline">Go Back</a>
            </div>
        )
    }

    return <BlogPageClient blogData={blogData} slug={slug} />;
}

export default Page
