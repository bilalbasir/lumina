'use client'

// ModalLayout.tsx
import { isDeletecareermodalCloseReducer, isDeleteCareermodalOpenReducer, isDeleteServicemodalCloseReducer, isViewApplicationmodalCloseReducer, isViewLeadmodalCloseReducer, modalCloseReducer, isDeleteBlogmodalCloseReducer, isDeleteLeadsmodalCloseReducer, isDeleteApplicantmodalCloseReducer } from '@/redux/slice/ModalSlice'
import { RootState } from '@/redux/store'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import "./modalLayout.css"
import CrossIcon from '../icons/crossIcon/CrossIcon'
interface ModalLayoutProps {
    children?: React.ReactNode
    showCrossIcon?: boolean
}

const ModalLayout: React.FC<ModalLayoutProps> = ({ children, showCrossIcon = "true" }) => {
    // const isModalOpen = useSelector((state: RootState) => state.ModalDetail.isModalOpen)
    const isModalOpen = true

    const dispatch = useDispatch()
    const closeModal = () => {
        dispatch(modalCloseReducer())
        dispatch(isViewApplicationmodalCloseReducer())
        dispatch(isViewLeadmodalCloseReducer())
        dispatch(isDeleteServicemodalCloseReducer())
        dispatch(isDeletecareermodalCloseReducer())
        dispatch(isDeleteBlogmodalCloseReducer())
        dispatch(isDeleteLeadsmodalCloseReducer())
        dispatch(isDeleteApplicantmodalCloseReducer())

    }

    if (!isModalOpen) return null

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            onClick={closeModal}
        >
            <div
                className="bg-white w-full md:w-[90%] xl:w-[50%]   rounded-[16px]"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="max-h-[80vh] overflow-y-auto p-5 thin-scrollbar relative">
                    {showCrossIcon &&
                        <div className='absolute top-7 right-4' onClick={closeModal}>
                            <CrossIcon />
                        </div>
                    }
                    {children}
                </div>
            </div>
        </div>
    )
}

export default ModalLayout
