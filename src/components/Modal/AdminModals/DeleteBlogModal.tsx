'use client'
import React from 'react'
import ModalLayout from '../ModalLayout'
import PrimaryButton from '@/components/button/PrimaryButton'
import LocationIcon from '@/components/icons/locationIcon/LocationIcon'

import GreyLine from '@/components/greyLine/GreyLine'

import MessageIcon from '@/components/icons/messageIcon/MessageIcon'
import CallIcon from '@/components/icons/callIcon/CallIcon'
import DeleteIcon from '@/components/icons/deleteIcon/DeleteIcon'
import { useSelector, useDispatch } from 'react-redux'
import { isDeleteBlogmodalCloseReducer, isDeleteBlogmodalOpenReducer } from '@/redux/slice/ModalSlice'
import { RootState } from '@/redux/store'
import blogApi from '@/app/apiServices/blogApi/BlogApi'
import toast from 'react-hot-toast'
import { useState } from 'react'

interface DeleteBlogModalProps {
    onSuccess?: () => void;
}

const DeleteBlogModal: React.FC<DeleteBlogModalProps> = ({ onSuccess }) => {
    const dispatch = useDispatch()
    const deleteId = useSelector((state: RootState) => state.ModalDetail.deleteId)
    const [loading, setLoading] = useState(false)

    const handleDelete = async () => {
        if (!deleteId) return;
        setLoading(true);
        try {
            const res = await blogApi.deleteBlog(deleteId);
            if (res.success) {
                toast.success("Blog deleted successfully");
                if (onSuccess) onSuccess();
                dispatch(isDeleteBlogmodalCloseReducer());
            }
        } catch (error) {
            console.error("Error deleting blog:", error);
            // toast.error is handled in api service
        } finally {
            setLoading(false);
        }
    }

    return (
        <ModalLayout showCrossIcon={false}>
            <div className='w-[100%]'>
                <div className='mb-6 flex flex-col items-center justify-center w-full'>
                    <div className='flex items-center justify-center h-[48px] w-[48px] rounded-full bg-[#FCC4C4] border-8 border-solid border-[#FFEFEF]'>
                        <DeleteIcon width='16' height='16' />
                    </div>
                    <h1 className='textH3Semi'>Delete Blog</h1>
                </div>


                <p className='text-center agBodyBaseGrey600'>Are you sure you want to delete this item? This action cannot be undone.</p>

                <div
                    className='w-[100%] mt-6 flex items-center justify-center gap-x-4'>
                    <PrimaryButton bgColor='bg-white' borderColor='border-[#CCCCCC]' text='No, Cancel' py="py-2" textColor='text-[#131313]' width="w-[25%]" onClick={() => dispatch(isDeleteBlogmodalCloseReducer())} />
                    <PrimaryButton
                        bgColor='bg-[#DC2626]'
                        hoverBg='hover:bg-[#DC2626]'
                        borderColor='border-[#DC2626]'
                        text={loading ? 'Deleting...' : 'Yes, Delete'}
                        py="py-2"
                        textColor='text-white'
                        width="w-[25%]"
                        onClick={handleDelete}
                    />
                </div>
            </div>
        </ModalLayout >
    )
}

export default DeleteBlogModal