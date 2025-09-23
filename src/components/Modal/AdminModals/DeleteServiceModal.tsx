'use client'
import React from 'react'
import ModalLayout from '../ModalLayout'
import PrimaryButton from '@/components/button/PrimaryButton'
import DeleteIcon from '@/components/icons/deleteIcon/DeleteIcon'
import { isDeleteServicemodalCloseReducer } from '@/redux/slice/ModalSlice'
import { useDispatch } from 'react-redux'
import { useDeleteService } from '@/hooks/use-delete-service-hook'

type Props = {
    id: string;
};

const DeleteServiceModal: React.FC<Props> = ({ id }) => {
    const dispatch = useDispatch();
    const mutation = useDeleteService();

    const handleDelete = () => {
        mutation.mutate(id, {
            onSuccess: () => {
                dispatch(isDeleteServicemodalCloseReducer());
            },
        });
    };

    return (
        <ModalLayout showCrossIcon={false}>
            <div className='w-[100%]'>
                <div className='mb-6 flex flex-col items-center justify-center w-full'>
                    <div className='flex items-center justify-center h-[48px] w-[48px] rounded-full bg-[#FCC4C4] border-8 border-solid border-[#FFEFEF]'>
                        <DeleteIcon width='16' height='16' />
                    </div>
                    <h1 className='textH3Semi'>Delete Service</h1>
                </div>

                <p className='text-center agBodyBaseGrey600'>
                    Are you sure you want to delete this item? This action cannot be undone.
                </p>

                <div className='w-[100%] mt-6 flex items-center justify-center gap-x-4'>
                    <PrimaryButton
                        bgColor='bg-white'
                        borderColor='border-[#CCCCCC]'
                        text='No, Cancel'
                        py='py-2'
                        textColor='text-[#131313]'
                        width='w-[25%]'
                        onClick={() => dispatch(isDeleteServicemodalCloseReducer())}
                    />
                    <PrimaryButton
                        bgColor='bg-[#DC2626]'
                        hoverBg='hover:bg-[#DC2626]'
                        borderColor='border-[#DC2626]'
                        text='Yes, Delete'
                        py='py-2'
                        textColor='text-white'
                        width='w-[25%]'
                        onClick={handleDelete}
                    />
                </div>
            </div>
        </ModalLayout>
    );
};

export default DeleteServiceModal;
