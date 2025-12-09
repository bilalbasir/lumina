"use client";
import { HorizontalLine } from "@/components/horizontalLine/HorizontalLine";
import InputField from "@/components/inputField/InputField";
import LayoutHeader from "@/components/pages/adminSide/LayoutHeader";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import TextArea from "@/components/inputField/TextArea";
import UrlSlugField from "@/components/inputField/UrlSlugField";
import UploadFile from "@/components/uploadFile/UploadFile";
import UploadMultiFile from "@/components/uploadFile/UploadMultiFile";
import PrimaryButton from "@/components/button/PrimaryButton";
import AddIcon from "@/components/icons/addIcon/AddIcon";
import EmptyContentOverview from "@/components/inputField/EmptyContentOverview";
import TextEditor from "@/components/inputField/TextEditor";

type FormValues = {
  blogTitle: string;
  blogDescription: string;
  blogSlug: string;
  bannerImage: FileList;
  additionalImages: FileList;
  seoTitle: string;
  seoDescription: string;
  shortDescription: string;
  authorName: string;
  featuredImage: FileList;
};

const Page = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm<FormValues>({
    mode: "onChange",
  });

  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (tagInput.trim() === "") return;
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const addBlogFun = async (data: FormValues) => {
    console.log("Form submission started");
    try {
      setIsSubmitting(true);
      
      // Validate content
      if (!blogContent || blogContent.trim() === "" || blogContent === "<p><br></p>") {
        alert("Blog content is required.");
        setIsSubmitting(false);
        return;
      }

      // Validate required fields
      if (!data.blogTitle?.trim()) {
        alert("Blog title is required.");
        setIsSubmitting(false);
        return;
      }
      
      if (!data.blogDescription?.trim()) {
        alert("Blog description is required.");
        setIsSubmitting(false);
        return;
      }

      if (!data.blogSlug?.trim()) {
        alert("URL slug is required.");
        setIsSubmitting(false);
        return;
      }

      if (!data.authorName?.trim()) {
        alert("Author name is required.");
        setIsSubmitting(false);
        return;
      }

      console.log('Creating form data...');
      const formData = new FormData();

      //Append text fields
      formData.append("title", data.blogTitle);
      formData.append("description", data.blogDescription);
      formData.append("slugUrl", data.blogSlug);
      formData.append("shortDescription", data.shortDescription || "");
      formData.append("seoTitle", data.seoTitle || "");
      formData.append("seoDescription", data.seoDescription || "");
      formData.append("authorName", data.authorName);
      formData.append("blogContent", blogContent);
      formData.append("tags", JSON.stringify(tags));
      
      console.log('Text fields appended');

      // Append single files
      if (data.bannerImage?.[0]) {
        formData.append("bannerImage", data.bannerImage[0]);
        console.log('Banner image appended');
      }
      
      if (data.featuredImage?.[0]) {
        formData.append("featuredImage", data.featuredImage[0]);
        console.log('Featured image appended');
      }

      // Append multiple images
      if (data.additionalImages && data.additionalImages.length > 0) {
        Array.from(data.additionalImages).forEach((file: File) => {
          formData.append("additionalImages", file);
        });
        console.log('Additional images appended');
      }

      // Log form data contents for debugging
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      console.log("Submitting form data to API...");
      const res = await fetch("http://localhost:5000/api/blogs/add-blog", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      console.log("API Response:", result);

      if (result.success) {
        alert("Blog created successfully!");
        reset();
        setTags([]);
        setBlogContent("");
      } else {
        alert(`Error: ${result.message}`);
      }

    } catch (error) {
      console.error("Error creating blog:", error);
      alert("Something went wrong while creating the blog.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    reset();
    setTags([]);
    setBlogContent("");
  };

  return (
    <>
      <LayoutHeader heading="Add New Blog" />
      <HorizontalLine />

      <div className="">
        <form
          className="flex flex-col lg:flex-row gap-6 mt-6"
          onSubmit={handleSubmit(addBlogFun)}
          noValidate
        >
          {/* LEFT COLUMN - Main Content */}
          <div className="w-full lg:w-[60%] flex flex-col gap-6">
            {/* Basic Information */}
            <div className="flex flex-col p-4 w-full gap-6 bg-[#F9FAFB] rounded-lg">
              <InputField
                label="Blog Title"
                name="blogTitle"
                placeholder="Enter your blog title"
                register={register}
                error={errors.blogTitle}
                validation={{ 
                  required: "Blog title is required",
                  minLength: {
                    value: 5,
                    message: "Blog title must be at least 5 characters"
                  }
                }}
              />
              
              <TextArea
                label="Short Description"
                name="blogDescription"
                placeholder="Provide a detailed description of the blog..."
                register={register}
                error={errors.blogDescription}
                validation={{ 
                  required: "Blog description is required",
                  minLength: {
                    value: 10,
                    message: "Description must be at least 10 characters"
                  }
                }}
              />

              <UrlSlugField
                label="URL Slug"
                name="blogSlug"
                placeholder="enter-slug-here"
                prefix="/blog/"
                register={register}
                error={errors.blogSlug}
                validation={{ 
                  required: "URL slug is required",
                  pattern: {
                    value: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
                    message: "Slug can only contain lowercase letters, numbers, and hyphens"
                  }
                }}
              />
              
              <UploadFile
                label="Banner Image"
                name="bannerImage"
                accept=".png,.jpg,.jpeg,.webp"
                placeholder="Upload banner image"
                register={register}
                error={errors.bannerImage}
                validation={{ 
                  required: "Banner image is required",
                  validate: {
                    fileType: (files: FileList) => {
                      if (!files?.[0]) return "Banner image is required";
                      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
                      return allowedTypes.includes(files[0].type) || "Only JPEG, PNG, and WebP images are allowed";
                    },
                    fileSize: (files: FileList) => {
                      if (!files?.[0]) return "Banner image is required";
                      return files[0].size <= 5 * 1024 * 1024 || "File size must be less than 5MB";
                    }
                  }
                }}
              />
            </div>

            {/* Featured Image & Content */}
            <div className="flex flex-col p-4 w-full gap-6 bg-[#F9FAFB] rounded-lg">
              <LayoutHeader heading="Featured Image" />
              <UploadFile
                label="Upload featured image for blog banner"
                name="featuredImage"
                accept=".png,.jpg,.jpeg,.webp"
                placeholder="Upload featured image"
                register={register}
                error={errors.featuredImage}
                validation={{
                  validate: {
                    fileType: (files: FileList) => {
                      if (!files?.[0]) return true;
                      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
                      return allowedTypes.includes(files[0].type) || "Only JPEG, PNG, and WebP images are allowed";
                    },
                    fileSize: (files: FileList) => {
                      if (!files?.[0]) return true;
                      return files[0].size <= 5 * 1024 * 1024 || "File size must be less than 5MB";
                    }
                  }
                }}
              />
              
              <TextArea
                label="Short Description"
                name="shortDescription"
                placeholder="Provide a short description for the blog..."
                register={register}
                error={errors.shortDescription}
              />
              
              <div>
                <TextEditor
                  label="Blog Content"
                  name="blogContent"
                  placeholder="Write full content here..."
                  value={blogContent}
                  onChange={setBlogContent}
                />
                {(!blogContent || blogContent.trim() === "" || blogContent === "<p><br></p>") && (
                  <p className="text-red-500 text-sm mt-1">Blog content is required</p>
                )}
              </div>
            </div>

            {/* Additional Images */}
            <div className="flex flex-col p-4 w-full gap-6 bg-[#F9FAFB] rounded-lg">
              <LayoutHeader heading="Additional Images" />
              <UploadMultiFile
                label="Upload additional images for your blog content"
                name="additionalImages"
                placeholder="Upload additional images for your blog content"
                register={register}
                error={errors.additionalImages}
                validation={{
                  validate: {
                    fileTypes: (files: FileList) => {
                      if (!files || files.length === 0) return true;
                      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
                      const invalidFiles = Array.from(files).filter(
                        file => !allowedTypes.includes(file.type)
                      );
                      return invalidFiles.length === 0 || "Only JPEG, PNG, and WebP images are allowed";
                    },
                    fileSizes: (files: FileList) => {
                      if (!files || files.length === 0) return true;
                      const oversizedFiles = Array.from(files).filter(
                        file => file.size > 5 * 1024 * 1024
                      );
                      return oversizedFiles.length === 0 || "Each file must be less than 5MB";
                    },
                    maxFiles: (files: FileList) => {
                      if (!files) return true;
                      return files.length <= 10 || "Maximum 10 files allowed";
                    }
                  }
                }}
              />
            </div>

            {/* SEO Settings */}
            <div className="flex flex-col p-4 w-full gap-6 bg-[#F9FAFB] rounded-lg">
              <LayoutHeader heading="SEO Settings" />
              <InputField
                label="Meta Title"
                name="seoTitle"
                placeholder="SEO optimized title (60 characters recommended)"
                register={register}
                error={errors.seoTitle}
                validation={{
                  maxLength: {
                    value: 60,
                    message: "Meta title should not exceed 60 characters"
                  }
                }}
              />
              
              <TextArea
                label="Meta Description"
                name="seoDescription"
                placeholder="Brief description for search engines (160 characters recommended)"
                register={register}
                error={errors.seoDescription}
                validation={{
                  maxLength: {
                    value: 160,
                    message: "Meta description should not exceed 160 characters"
                  }
                }}
              />
            </div>
          </div>

          {/* RIGHT COLUMN - Sidebar */}
          <div className="w-full lg:w-[40%] flex flex-col gap-6">
            {/* Author Information */}
            <div className="flex flex-col p-4 w-full gap-6 bg-[#F9FAFB] rounded-lg">
              <InputField
                label="Author"
                name="authorName"
                placeholder="Write Author Name"
                register={register}
                error={errors.authorName}
                validation={{ 
                  required: "Author name is required",
                  minLength: {
                    value: 2,
                    message: "Author name must be at least 2 characters"
                  }
                }}
              />
            </div>

            {/* Tags Section */}
            <div className="flex flex-col p-4 w-full gap-6 bg-[#F9FAFB] rounded-lg">
              <LayoutHeader heading="Tags / Keywords" />
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags
                </label>
                <div className="flex flex-wrap gap-2 border border-gray-300 rounded px-2 py-2 bg-white">
                  <input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleTagKeyDown}
                    className="flex-1 min-w-[120px] border-none focus:ring-0 outline-none text-sm"
                    placeholder="Type and press Enter"
                  />
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-[#00634F] text-white text-sm px-3 py-1 rounded-full flex items-center gap-2"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="text-white hover:text-red-300 cursor-pointer text-xs"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
                {tags.length === 0 && (
                  <p className="text-gray-500 text-sm mt-2">No tags added yet</p>
                )}
              </div>
            </div>

            {/* Content Overview */}
            <div className="flex flex-col p-4 w-full gap-6 bg-[#F9FAFB] rounded-lg">
              <LayoutHeader heading="Content Overview" />
              <p className="text-[#676767] text-sm sm:text-base">
                Create sidebar navigation links to your blog content
              </p>
              <div className="w-full flex items-center gap-2">
                <InputField
                  label=""
                  name="contentOverview"
                  placeholder="e.g. Guide to future work"
                  register={register}
                />
                <div className="mt-2">
                  <PrimaryButton
                    type="button"
                    text=""
                    py="py-2"
                    px="px-2"
                    bgColor="bg-[#00624F]"
                    textColor="text-white"
                    icon={<AddIcon color="white" width="20" height="20" />}
                  />
                </div>
              </div>
              <EmptyContentOverview />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col p-4 w-full gap-4 bg-[#F9FAFB] rounded-lg">
              <PrimaryButton
                type="submit"
                className="w-full"
                text={isSubmitting ? "Publishing..." : "Publish Blog"}
                bgColor="bg-primaryColor"
                textColor="text-white"
                py="py-3"
                disabled={isSubmitting}
              />
              
              <PrimaryButton
                type="button"
                className="w-full"
                text="No, Cancel"
                bgColor="bg-white"
                textColor="text-greyscale500"
                py="py-3"
                borderColor="border-[#CCCCCC]"
                onClick={handleCancel}
                disabled={isSubmitting}
              />

              <div className="text-xs text-gray-500 text-center mt-2">
                {isSubmitting 
                  ? "Please wait while we publish your blog..." 
                  : "Review all information before publishing"
                }
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Page;