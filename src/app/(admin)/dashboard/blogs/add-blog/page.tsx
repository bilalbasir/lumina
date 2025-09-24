'use client'
import { HorizontalLine } from '@/components/horizontalLine/HorizontalLine'
import InputField from '@/components/inputField/InputField'
import LayoutHeader from '@/components/pages/adminSide/LayoutHeader'
import { useForm } from 'react-hook-form'
import React, { useState } from 'react'
import TextArea from '@/components/inputField/TextArea'
import UrlSlugField from '@/components/inputField/UrlSlugField'
import UploadFile from '@/components/uploadFile/UploadFile'
import UploadMultiFile from '@/components/uploadFile/UploadMultiFile'
import PrimaryButton from '@/components/button/PrimaryButton'
import AddIcon from '@/components/icons/addIcon/AddIcon'
import EmptyContentOverview from '@/components/inputField/EmptyContentOverview'
import TextEditor from '@/components/inputField/TextEditor'



type FormValues = {
    blogTitle: string;
    blogDescription: string;
    blogSlug: string;
    bannerImage: FileList;
    additionalImages: FileList;
    seoTitle: string;
    seoDescription: string;
    authorName: string;
    featuredImage: FileList
    content: string;

    formstate: unknown;
    register: unknown;
}

const Page = () => {

    const { register, formState: { errors }, handleSubmit } = useForm<FormValues>()
    // tags state
    const [tags, setTags] = useState<string[]>([])
    const [tagInput, setTagInput] = useState("")

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


    const addBlogFun = (data: FormValues) => {
        console.log("BLOG DATA", data);

    }

    return (
        <>
            <LayoutHeader heading='Add New Blog' />
            <HorizontalLine />
            <div className=" flex flex-col lg:flex-row gap-6 mt-6">
                <div className="w-[100%] lg:w-[60%]">
                    <form action="" className='flex flex-col items-start gap-y-8' onSubmit={handleSubmit(addBlogFun)}>
                        <div className="flex flex-col p-2 md:p-4 w-full gap-y-8 bg-[#F9FAFB]">
                            <div className="w-[100%]">
                                <InputField
                                    label="Blog Title"
                                    name="blogTitle"
                                    placeholder="Enter your blog title"
                                    register={register}
                                    error={errors.blogTitle}
                                    required
                                />
                            </div>
                            <div className="w-[100%]">
                                <TextArea
                                    label="Short Description"
                                    name="blogDescription"
                                    required
                                    placeholder="Provide a detailed description of the role..."
                                    register={register}
                                    error={errors.blogDescription}
                                />
                            </div>

                            <div className="w-[100%]">
                                <UrlSlugField
                                    label="URL Slug"
                                    name="blogSlug"
                                    placeholder="enter-slug-here"
                                    prefix="/blog/"
                                    register={register}
                                    error={errors.blogSlug}
                                    required
                                />
                            </div>
                            <div className="w-[100%]">
                                <UploadFile
                                    label="Banner Image"
                                    name="bannerImage"
                                    required
                                    accept=".png,.jpg"
                                    placeholder="Upload Service Banner Image.docx"
                                    register={register}
                                    error={errors.bannerImage}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col p-2 md:p-4 w-full gap-y-8 bg-[#F9FAFB]">

                            <div className="w-[100%]">
                                <LayoutHeader heading='Featured Image' />
                                <UploadFile
                                    label="Upload featured image for blog banner"
                                    name="featuredImage"
                                    accept=".png,.jpg"
                                    placeholder="Upload Service Banner Image.docx"
                                    register={register}
                                    error={errors.featuredImage}
                                />
                            </div>
                            <div className="w-[100%]">
                                <TextArea
                                    label="Short Description"
                                    name="blogDescription"
                                    required
                                    placeholder="Provide a detailed description of the role..."
                                    register={register}
                                    error={errors.blogDescription}
                                />
                            </div>
                            <div className="w-[100%]">
                                <TextEditor
                                    label="Blog Content"
                                    name="content"
                                    placeholder="Write full content here..."
                                    register={register}
                                    error={errors.content}
                                    required
                                />


                            </div>


                        </div>
                        <div className="flex flex-col p-2 md:p-4 w-full gap-y-8 bg-[#F9FAFB]">

                            <div className="w-[100%]">
                                <LayoutHeader heading='Additional Images' />
                                <UploadMultiFile
                                    label="Upload additional images for your blog content"
                                    name="additionalImages"
                                    placeholder="Upload additional images for your blog content"
                                    register={register}
                                    error={errors.additionalImages}
                                />


                            </div>



                        </div>
                        <div className="flex flex-col p-2 md:p-4 w-full gap-y-8 bg-[#F9FAFB]">


                            <LayoutHeader heading='SEO Settings' />

                            <div className="w-[100%]">
                                <InputField
                                    label="Meta Title"
                                    name="seoTitle"
                                    placeholder="SEO optimized title (60 characters recommended)"
                                    register={register}
                                    error={errors.seoTitle}
                                />
                            </div>
                            <div className="w-[100%]">
                                <TextArea
                                    label="Meta Description"
                                    name="seoDescription"
                                    placeholder="Brief description for search engines (160 characters recommended)"
                                    register={register}
                                    error={errors.seoDescription}
                                />
                            </div>

                        </div>
                    </form>
                </div>
                <div className="">
                    <div className="flex flex-col p-2 md:p-4 w-full gap-y-8 bg-[#F9FAFB]">
                        <div className="w-[100%]">
                            <InputField
                                label="Author"
                                name="authorName"
                                placeholder="Write Author Name"
                                register={register}
                                error={errors.authorName}
                                required
                            />
                        </div>
                    </div>
                    <div className="flex flex-col p-2 md:p-4 w-full gap-y-8 bg-[#F9FAFB]">
                        <div className="w-[100%]">
                            <LayoutHeader heading='Tags / Keywords' />
                            <div className="w-full">
                                <label className="w-full capitalize text-[#131313] text-sm font-medium leading-[150%] mb-2"
                                    style={{
                                        fontFamily: "Onest, -apple-system, Roboto, Helvetica, sans-serif",
                                    }}>Tags</label>
                                <div className="flex flex-wrap gap-2 border border-[#E6E6E6] rounded px-2 py-2">
                                    <input
                                        value={tagInput}
                                        onChange={(e) => setTagInput(e.target.value)}
                                        onKeyDown={handleTagKeyDown}
                                        className="flex-1 min-w-[120px] border-none focus:ring-0 outline-none text-sm"
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
                    <div className="flex flex-col p-2 md:p-4 w-full gap-y-8 bg-[#F9FAFB]">
                        <div className="w-[100%]">
                            <LayoutHeader heading='Content Overview' />
                            <p className='__className_667262 text-[#676767]  hidden sm:block sm:text-[16px]'>Create sidebar navigation links to your blog content</p>
                            <div className="w-[100%] flex items-center gap-2">
                                <InputField
                                    label=""
                                    name="authorName"
                                    placeholder="e.g. Guide to future work"
                                    register={register}
                                    error={errors.authorName}
                                />
                                <div className='mt-2' ><PrimaryButton text='' py="py-2" px="px-2" bgColor='bg-[#00624F]' textColor='text-white' icon={<AddIcon color='white' width="20" height="20" />} /></div>
                            </div>


                        </div>
                        <div className="w-[100%]">
                            <EmptyContentOverview />
                        </div>
                        <div className='w-[100%] flex flex-col items-center justify-center gap-y-3'>
                            <PrimaryButton className='w-full' text='Publish Blog' bgColor='bg-primaryColor' textColor='text-white' py="py-2" />
                            <PrimaryButton className='w-full' text='No, Cancel' bgColor='bg-white' textColor='text-greyscale500' py="py-2" borderColor="border-[#CCCCCC]" />
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Page