'use client'
import React from 'react'
import ModalLayout from '../ModalLayout'
import PrimaryButton from '@/components/button/PrimaryButton'
import LocationIcon from '@/components/icons/locationIcon/LocationIcon'

import GreyLine from '@/components/greyLine/GreyLine'

import MessageIcon from '@/components/icons/messageIcon/MessageIcon'
import CallIcon from '@/components/icons/callIcon/CallIcon'
import DeleteIcon from '@/components/icons/deleteIcon/DeleteIcon'
import { useDispatch } from 'react-redux'
import { isDeleteLeadsmodalCloseReducer } from '@/redux/slice/ModalSlice'
import { useDeleteService } from '@/hooks/use-delete-service-hook'
import { useDeleteLead } from '@/hooks/use-delete-lead-hook'
import toast from 'react-hot-toast'
type Props = {
    id: string;
};
const DeleteLeadsModal: React.FC<Props> = ({ id }) => {
    const dispatch = useDispatch()
    const mutation = useDeleteLead();

    const handleDelete = () => {
        mutation.mutate(id, {
            onSuccess: () => {
                toast.success("Data deleted")
                dispatch(isDeleteLeadsmodalCloseReducer());
            },
            onError: () => {
                toast.error("Something went wrong")
                dispatch(isDeleteLeadsmodalCloseReducer());
            }
        });
    };
    return (
        <ModalLayout showCrossIcon={false}>
            <div className='w-[100%]'>
                <div className='mb-6 flex flex-col items-center justify-center w-full'>
                    <div className='flex items-center justify-center h-[48px] w-[48px] rounded-full bg-[#FCC4C4] border-8 border-solid border-[#FFEFEF]'>
                        <DeleteIcon width='16' height='16' />
                    </div>
                    <h1 className='textH3Semi'>Delete Contact Lead</h1>
                </div>


                <p className='text-center agBodyBaseGrey600'>Are you sure you want to delete this item? This action cannot be undone.</p>

                <div
                    className='w-[100%] mt-6 flex items-center justify-center gap-x-4'>
                    <PrimaryButton bgColor='bg-white' borderColor='border-[#CCCCCC]' text='No, Cancel' py="py-2" textColor='text-[#131313]' width="w-[25%]" onClick={() => dispatch(isDeleteLeadsmodalCloseReducer())} />
                    <PrimaryButton bgColor='bg-[#DC2626]' hoverBg='hover:bg-[#DC2626]' borderColor='border-[#DC2626]' text='Yes, Delete' py="py-2" textColor='text-white' width="w-[25%]" onClick={handleDelete} />
                </div>
            </div>
        </ModalLayout >
    )
}

export default DeleteLeadsModal