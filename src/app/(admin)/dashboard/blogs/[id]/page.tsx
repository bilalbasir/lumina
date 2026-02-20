'use client'
import { HorizontalLine } from '@/components/horizontalLine/HorizontalLine'
import InputField from '@/components/inputField/InputField'
import LayoutHeader from '@/components/pages/adminSide/LayoutHeader'
import { useForm } from 'react-hook-form'
import React, { useEffect, useState } from 'react'
import TextArea from '@/components/inputField/TextArea'
import TipTapEditor from '@/components/inputField/TipTapEditor'
import UrlSlugField from '@/components/inputField/UrlSlugField'
import UploadFile from '@/components/uploadFile/UploadFile'
import UploadMultiFile from '@/components/uploadFile/UploadMultiFile'
import PrimaryButton from '@/components/button/PrimaryButton'
import AddIcon from '@/components/icons/addIcon/AddIcon'
import EmptyContentOverview from '@/components/inputField/EmptyContentOverview'
import blogApi from '@/app/apiServices/blogApi/BlogApi'
import toast from 'react-hot-toast'
import { useParams, useRouter } from 'next/navigation'
import { slugify } from '@/utils/slugify'
import { imageBaseUrl } from '@/app/apiServices/baseUrl/BaseUrl'

type FormValues = {
    blogTitle: string;
    blogDescription: string;
    blogSlug: string;
    bannerImage: FileList;
    additionalImages: FileList;
    content: string;
    seoTitle: string;
    seoDescription: string;
    authorName: string;
    featuredImage: FileList;
}

const Page = () => {
    const router = useRouter();
    const params = useParams();
    const id = params?.id as string;

    const { register, formState: { errors }, handleSubmit, control, reset, setValue, watch } = useForm<FormValues>()
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [blogData, setBlogData] = useState<any>(null);

    // tags state
    const [tags, setTags] = useState<string[]>([])
    const [tagInput, setTagInput] = useState("")

    // Content Overview state
    const [contentOverviewItems, setContentOverviewItems] = useState<string[]>([])
    const [overviewInput, setOverviewInput] = useState("")

    // Watch blog title and content to auto-generate slug and overview
    const watchedTitle = watch("blogTitle");
    const watchedContent = watch("content");

    // Fetch initial data
    useEffect(() => {
        if (id) {
            fetchBlogDetails();
        }
    }, [id]);

    const fetchBlogDetails = async () => {
        try {
            setFetching(true);
            const res = await blogApi.getBlogId(id);
            if (res.success && res.data) {
                const blog = res.data;
                reset({
                    blogTitle: blog.title,
                    blogDescription: blog.shortDescription,
                    blogSlug: blog.slugUrl,
                    seoTitle: blog.seoTitle,
                    seoDescription: blog.metaDescription,
                    authorName: blog.authorName,
                    content: blog.blogContent,
                    bannerImage: blog.bannerImage,
                    featuredImage: blog.featuredImage,
                    additionalImages: blog.additionalImages,
                });
                setBlogData(blog);

                // Populate Tags
                if (blog.tags) setTags(blog.tags);

                // Populate Content Overview (Sidebar items)
                // Assuming backend returns it as an array of strings in 'blogContextTable'
                if (blog.blogContextTable) setContentOverviewItems(blog.blogContextTable);
            }
        } catch (error) {
            console.error("Error fetching blog details:", error);
            toast.error("Failed to load blog details");
        } finally {
            setFetching(false);
        }
    }

    // 1. Fixed Slug Generation: Auto-generate slug from title
    React.useEffect(() => {
        if (watchedTitle) {
            setValue("blogSlug", slugify(watchedTitle), { shouldValidate: true });
        }
    }, [watchedTitle, setValue]);

    // 2. Heading Extraction: Automagically scrape headings from TipTap editor
    React.useEffect(() => {
        if (watchedContent) {
            const headingRegex = /<(h[1-3])\b[^>]*>([\s\S]*?)<\/h\1>/gi;
            const matches: string[] = [];
            let match;

            while ((match = headingRegex.exec(watchedContent)) !== null) {
                const headingText = match[2]
                    .replace(/<\/?[^>]+(>|$)/g, "")
                    .replace(/&nbsp;/g, " ")
                    .trim();

                if (headingText && headingText !== "") {
                    matches.push(headingText);
                }
            }

            setContentOverviewItems(prev => {
                if (JSON.stringify(matches) !== JSON.stringify(prev)) {
                    return matches;
                }
                return prev;
            });
        }
    }, [watchedContent]);


    const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault()
            if (tagInput.trim() === "") return
            if (!tags.includes(tagInput.trim())) {
                setTags([...tags, tagInput.trim()])
            }
            setTagInput("")
        }
    }

    const removeTag = (tag: string) => {
        setTags(tags.filter(t => t !== tag))
    }

    const handleAddOverviewItem = () => {
        if (overviewInput.trim() === "") return
        if (!contentOverviewItems.includes(overviewInput.trim())) {
            setContentOverviewItems([...contentOverviewItems, overviewInput.trim()])
        }
        setOverviewInput("")
    }

    const removeOverviewItem = (index: number) => {
        setContentOverviewItems(contentOverviewItems.filter((_, i) => i !== index))
    }

    const updateBlogFun = async (data: FormValues) => {
        setLoading(true);
        try {
            const formData = new FormData();

            // Text fields
            formData.append("blogTitle", data.blogTitle);
            formData.append("blogDescription", data.blogDescription);
            formData.append("blogSlug", slugify(data.blogSlug)); // Enforce slugify
            formData.append("seoTitle", data.seoTitle || "");
            formData.append("seoDescription", data.seoDescription || "");
            formData.append("authorName", data.authorName);
            formData.append("content", data.content);

            // Complex fields
            formData.append("tags", JSON.stringify(tags));
            formData.append("blogContextTable", JSON.stringify(contentOverviewItems));

            // Files - Only append if new file selected
            if (data.bannerImage?.[0]) {
                formData.append("bannerImage", data.bannerImage[0]);
            }
            if (data.featuredImage?.[0]) {
                formData.append("featuredImage", data.featuredImage[0]);
            }
            if (data.additionalImages) {
                Array.from(data.additionalImages).forEach((file) => {
                    formData.append("additionalImages", file);
                });
            }

            const res = await blogApi.updateBlog(id, formData);
            if (res.success) {
                toast.success("Blog updated successfully!");
                router.push("/dashboard/blogs");
            }
        } catch (error) {
            console.error("Error updating blog:", error);
            // toast.error handled in api service usually, but double check
        } finally {
            setLoading(false);
        }
    }

    if (fetching) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primaryColor"></div>
            </div>
        )
    }

    return (
        <>
            <LayoutHeader heading='Edit blog' />
            <HorizontalLine />
            <div className="flex flex-col lg:flex-row gap-6 mt-6">
                <div className="w-[100%] lg:w-[60%]">
                    <form id="edit-blog-form" className='flex flex-col items-start gap-y-8' onSubmit={handleSubmit(updateBlogFun)}>
                        {/* Blog info */}
                        <div className="flex flex-col p-2 md:p-4 w-full gap-y-8 bg-[#F9FAFB]">
                            <InputField
                                label="Blog Title"
                                name="blogTitle"
                                placeholder="Enter your blog title"
                                register={register}
                                error={errors.blogTitle}
                                required
                            />
                            <TipTapEditor
                                label="Short Description"
                                name="blogDescription"
                                required
                                placeholder="Provide a detailed description..."
                                control={control}
                                error={errors.blogDescription}
                            />
                            <UrlSlugField
                                label="URL Slug"
                                name="blogSlug"
                                placeholder="enter-slug-here"
                                prefix="/blog/"
                                register={register}
                                error={errors.blogSlug}
                                required
                            />
                            <UploadFile
                                label="Banner Image"
                                name="bannerImage"
                                // Not required in Edit mode typically, unless we force replace
                                accept=".png,.jpg"
                                placeholder="Upload Service Banner Image"
                                register={register}
                                error={errors.bannerImage}
                                defaultValue={blogData?.bannerImage || ""}
                            />
                        </div>

                        {/* Featured Image */}
                        <div className="flex flex-col p-2 md:p-4 w-full gap-y-8 bg-[#F9FAFB]">
                            <LayoutHeader heading='Featured Image' />
                            <UploadFile
                                label="Upload featured image for blog banner"
                                name="featuredImage"
                                accept=".png,.jpg"
                                placeholder="Upload featured blog image"
                                register={register}
                                error={errors.featuredImage}
                                defaultValue={blogData?.featuredImage || ""}
                            />

                            <div className="w-[100%]">
                                <TipTapEditor
                                    label="Blog Content"
                                    name="content"
                                    placeholder="Write full content here..."
                                    control={control}
                                    error={errors.content}
                                    required
                                />
                            </div>
                        </div>

                        {/* Additional Images */}
                        <div className="flex flex-col p-2 md:p-4 w-full gap-y-8 bg-[#F9FAFB]">
                            <LayoutHeader heading='Additional Images' />
                            <UploadMultiFile
                                label="Upload additional images for your blog content"
                                name="additionalImages"
                                placeholder="Upload additional images for your blog content"
                                register={register}
                                error={errors.additionalImages}
                                setValue={setValue}
                                defaultImages={blogData?.additionalImages || []}
                            />
                        </div>

                        {/* SEO Settings */}
                        <div className="flex flex-col p-2 md:p-4 w-full gap-y-8 bg-[#F9FAFB]">
                            <LayoutHeader heading='SEO Settings' />
                            <InputField
                                label="Meta Title"
                                name="seoTitle"
                                placeholder="SEO optimized title"
                                register={register}
                                error={errors.seoTitle}
                            />
                            <TipTapEditor
                                label="Meta Description"
                                name="seoDescription"
                                placeholder="Brief description for search engines"
                                control={control}
                                error={errors.seoDescription}
                            />
                        </div>
                    </form>
                </div>

                <div className="w-[100%] lg:w-[40%] flex flex-col gap-6">
                    {/* Author Section */}
                    <div className="flex flex-col p-2 md:p-4 w-full gap-y-8 bg-[#F9FAFB]">
                        <InputField
                            label="Author"
                            name="authorName"
                            placeholder="Write Author Name"
                            register={register}
                            error={errors.authorName}
                            required
                        />
                    </div>

                    {/* Tags */}
                    <div className="flex flex-col p-2 md:p-4 w-full gap-y-8 bg-[#F9FAFB]">
                        <div className="w-[100%]">
                            <LayoutHeader heading='Tags / Keywords' />
                            <div className="w-full">
                                <label className="w-full capitalize text-[#131313] text-sm font-medium leading-[150%] mb-2"
                                    style={{
                                        fontFamily: "Onest, -apple-system, Roboto, Helvetica, sans-serif",
                                    }}>Tags</label>
                                <div className="flex flex-wrap gap-2 border border-[#E6E6E6] rounded px-2 py-2 bg-white">
                                    <input
                                        value={tagInput}
                                        onChange={(e) => setTagInput(e.target.value)}
                                        onKeyDown={handleTagKeyDown}
                                        className="flex-1 min-w-[120px] text-black border-none focus:ring-0 outline-none text-sm"
                                        placeholder="Type and press Enter"
                                    />
                                </div>
                                <div className='flex flex-col items-start gap-3 mt-3'>
                                    <p className="w-full capitalize text-[#131313] text-sm font-medium leading-[150%]"
                                        style={{
                                            fontFamily: "Onest, -apple-system, Roboto, Helvetica, sans-serif",
                                        }}>Quick Add</p>
                                    <div className="flex flex-wrap gap-2">
                                        {tags.map((tag, idx) => (
                                            <span
                                                key={idx}
                                                className="bg-[#00634F] w-auto text-white text-sm px-3 py-1 rounded-full flex items-center gap-2"
                                            >
                                                {tag}
                                                <button
                                                    type="button"
                                                    onClick={() => removeTag(tag)}
                                                    className="text-white hover:text-red-300 cursor-pointer"
                                                >
                                                    ✕
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Content Overview Section */}
                    <div className="flex flex-col p-2 md:p-4 w-full gap-y-8 bg-[#F9FAFB]">
                        <div className="w-[100%]">
                            <LayoutHeader heading='Content Overview' />
                            <p className='text-[#676767] hidden sm:block sm:text-[14px]'>Create sidebar navigation links to your blog content</p>
                            <div className="w-[100%] flex items-center gap-2 mt-2">
                                <div className="w-full">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Overview Item
                                    </label>
                                    <input
                                        type="text"
                                        value={overviewInput}
                                        onChange={(e) => setOverviewInput(e.target.value)}
                                        placeholder="e.g. Introduction"
                                        className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-primaryColor focus:border-primaryColor outline-none transition-all"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                handleAddOverviewItem();
                                            }
                                        }}
                                    />
                                </div>
                                <div className='mt-6'>
                                    <PrimaryButton
                                        text=''
                                        py="py-2"
                                        px="px-2"
                                        bgColor='bg-[#00624F]'
                                        textColor='text-white'
                                        icon={<AddIcon color='white' width="20" height="20" />}
                                        onClick={handleAddOverviewItem}
                                        type="button"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* List of Overview Items */}
                        <div className="w-[100%] flex flex-col gap-2">
                            {contentOverviewItems.length > 0 ? (
                                contentOverviewItems.map((item, idx) => (
                                    <div key={idx} className="flex justify-between items-center bg-white p-3 rounded border border-gray-200">
                                        <span className="text-sm text-[#131313] font-medium">{item}</span>
                                        <button
                                            type="button"
                                            onClick={() => removeOverviewItem(idx)}
                                            className="text-red-500 hover:text-red-700 font-bold"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <EmptyContentOverview />
                            )}
                        </div>

                        <div className='w-[100%] flex flex-col items-center justify-center gap-y-3'>
                            <PrimaryButton form="edit-blog-form" type='submit' className='w-full' text={loading ? 'Updating...' : 'Update Blog'} bgColor='bg-primaryColor' textColor='text-white' py="py-2" />
                            <PrimaryButton className='w-full' text='No, Cancel' bgColor='bg-white' textColor='text-greyscale500' py="py-2" borderColor="border-[#CCCCCC]" onClick={() => router.back()} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Page
