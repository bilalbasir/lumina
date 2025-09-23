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
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const page = () => {
    const columns = [
        { key: "name", label: "BLOG NAME" },
        { key: "author", label: "AUTHOR" },
        { key: "views", label: "VIEWS" },
        { key: "date", label: "DATE POSTED" },
    ];

    const data = [
        { id: "111", name: "UIUX Talent", author: "Dev", location: "NY", status: "Open", date: "20/01/2024", "applications": "12" },
        { id: "222", name: "Backend Developer", author: "Dev", location: "NY", status: "Closed", date: "25/01/2024", "applications": "21" },
        { id: "333", name: "Full Stack Developer", author: "Dev", location: "NY", status: "Open", date: "01/02/2024", "applications": "15" },
    ];

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
        navigate.push(`/dashboard/blogs/view-blog/${id}`)

        // 👇 ab id apke pass hai, yahan navigate / state update / modal open kar skte ho
    };
    const handleDeleteClick = (id: string) => {
        console.log("View clicked, ID:", id);
        dispatch(isDeleteBlogmodalOpenReducer())

        // 👇 ab id apke pass hai, yahan navigate / state update / modal open kar skte ho
    };
    return (
        <>
            {isDeleteBlogmodal &&
                <DeleteBlogModal />
            }
            <LayoutHeader heading='Blogs '
                button={
                    <Link href={"/dashboard/blogs/add-blog"}>

                        <PrimaryButton text='Add new blog' py="py-1.5" px="px-2" bgColor='bg-[#00624F]' textColor='text-white' icon={<AddIcon color='white' width="14" height="14" />} />
                    </Link>

                }


                searchBar={<SearchBar placeholder='Search blog' />}
            />
            <Table columns={columns} data={data} onEditClick={handleEditClick} onViewClick={handleViewClick} onDeleteClick={handleDeleteClick} />
        </>
    )
}

export default page