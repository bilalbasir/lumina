'use client'

import PrimaryButton from '@/components/button/PrimaryButton'
import AddIcon from '@/components/icons/addIcon/AddIcon'
import DeleteBlogModal from '@/components/Modal/AdminModals/DeleteBlogModal'
import LayoutHeader from '@/components/pages/adminSide/LayoutHeader'
import SearchBar from '@/components/searchBar/SearchBar'
import Table from '@/components/table/Table'
import { isDeleteBlogmodalOpenReducer } from '@/redux/slice/ModalSlice'
import { RootState } from '@/redux/store'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import blogApi from '@/app/apiServices/blogApi/BlogApi'

interface BlogData {
    _id: string;
    title: string;
    authorName: string;
    createdAt: string;
    slugUrl: string;
}

const page = () => {
    const [blogs, setBlogs] = useState<BlogData[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const columns = [
        { key: "name", label: "BLOG NAME" },
        { key: "author", label: "AUTHOR" },
        { key: "date", label: "DATE POSTED" },
    ];

    useEffect(() => {
        fetchBlogs();
    }, [searchTerm]);

    const fetchBlogs = async () => {
        try {
            setLoading(true);
            const response = await blogApi.getAllBlogs(1, searchTerm);
            if (response.success) {
                setBlogs(response.data.blogs);
            }
        } catch (error) {
            console.error('Error fetching blogs:', error);
        } finally {
            setLoading(false);
        }
    };

    // Transform blogs data for table format
    const tableData = blogs.map(blog => ({
        _id: blog._id,  // Table component expects _id field
        id: blog._id,   // Keep id for backup
        name: blog.title,
        author: blog.authorName,
        date: new Date(blog.createdAt).toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        })
    }));

    const isDeleteBlogmodal = useSelector((state: RootState) => state.ModalDetail.isDeleteBlogModalOpen)
    const navigate = useRouter()
    const dispatch = useDispatch()

    const handleEditClick = (id: string) => {
        console.log("Edit clicked, ID:", id);
        navigate.push(`/dashboard/blogs/${id}`)
        // 👇 ab id apke pass hai, yahan navigate / state update / modal open kar skte ho
    };
    const handleViewClick = (id: string) => {
        console.log("View clicked, ID:", id);
        console.log("Full URL will be:", `/dashboard/blogs/view-blog/${id}`);
        if (!id || id === 'undefined') {
            console.error('Invalid blog ID:', id);
            console.log('Available blogs:', blogs);
            console.log('Table data:', tableData);
            return;
        }
        navigate.push(`/dashboard/blogs/view-blog/${id}`)
    };
    const handleDeleteClick = (id: string) => {
        console.log("Delete clicked, ID:", id);
        dispatch(isDeleteBlogmodalOpenReducer(id))
    };
    return (
        <>
            {isDeleteBlogmodal &&
                <DeleteBlogModal onSuccess={fetchBlogs} />
            }
            <LayoutHeader heading='Blogs '
                button={
                    <Link href={"/dashboard/blogs/add-blog"}>

                        <PrimaryButton text='Add new blog' py="py-1.5" px="px-2" bgColor='bg-[#00624F]' textColor='text-white' icon={<AddIcon color='white' width="14" height="14" />} />
                    </Link>

                }


                searchBar={<SearchBar placeholder='Search blog' />}
            />
            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <div className="text-lg">Loading blogs...</div>
                </div>
            ) : (
                <Table columns={columns} data={tableData} onEditClick={handleEditClick} onViewClick={handleViewClick} onDeleteClick={handleDeleteClick} />
            )}
        </>
    )
}

export default page