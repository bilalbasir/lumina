'use client'

import PrimaryButton from '@/components/button/PrimaryButton'
import AddIcon from '@/components/icons/addIcon/AddIcon'
import Loader from '@/components/loader/Loader'
import DeleteCareerModal from '@/components/Modal/AdminModals/DeleteCareerModal'
import LayoutHeader from '@/components/pages/adminSide/LayoutHeader'
import Pagination from '@/components/pagination/Pagination'
import SearchBar from '@/components/searchBar/SearchBar'
import Table from '@/components/table/Table'
import { useGetAllCareers } from '@/hooks/use-career-hook'
import { isDeleteCareermodalOpenReducer } from '@/redux/slice/ModalSlice'
import { RootState } from '@/redux/store'
import { dateConvert } from '@/utils/dateConvert'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const page = () => {
    const columns = [
        { key: "jobTitle", label: "JOB TITLE" },
        { key: "department", label: "DEPARTMENT" },
        { key: "location", label: "LOCATION" },
        { key: "status", label: "STATUS" },
        { key: "date", label: "DATE POSTED" },
        { key: "totalApplications", label: "APPLICATIONS" },
    ];


    const [selectedCareerId, setSelectedCareerId] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const { data: careersRes, isLoading, isError } = useGetAllCareers(currentPage, searchTerm);
    const careers = careersRes?.data?.careers?.map((career: any) => ({
        ...career,
        date: dateConvert(career.createdAt),
    })) || [];
    const totalPages = careersRes?.data?.totalPages || 1

    console.log("CAREERS", careersRes);
    const data = careers;
    const isDeleteCareerModalOpen = useSelector((state: RootState) => state.ModalDetail.isDeleteCareerModalOpen)

    const navigate = useRouter()
    const dispatch = useDispatch()

    const handleEditClick = (id: string) => {
        setLoading(true)

        navigate.push(`/dashboard/careers/${id}`)
    };
    const handleViewClick = (id: string) => {
        setLoading(true)
        navigate.push(`/dashboard/careers/view/${id}`)
    };
    // const filteredCareers = careers?.filter((careers: any) =>
    //     careers?.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase())
    // );

    const handleDeleteClick = (id: string) => {
        setSelectedCareerId(id)
        dispatch(isDeleteCareermodalOpenReducer())
    }


    // Auto go to previous page if last record deleted
    useEffect(() => {
        if (!isLoading && careers.length === 0 && currentPage > 1) {
            setCurrentPage(prev => prev - 1)
        }
    }, [careers.length, currentPage, isLoading])
    return (
        <>
            {(isLoading || loading)
                && <Loader />}
            {isDeleteCareerModalOpen && selectedCareerId &&
                <DeleteCareerModal id={selectedCareerId} />
            }
            <LayoutHeader heading='Careers Management | Jobs'
                button={
                    <Link href={"/dashboard/careers/add-career"}>
                        <PrimaryButton
                            text='List New Job'
                            py="py-1.5"
                            px="px-2"
                            bgColor='bg-[#00624F]'
                            textColor='text-white'
                            icon={<AddIcon color='white' width="14" height="14" />}
                            onClick={() => {
                                setLoading(true)
                            }}
                        />
                    </Link>}
                searchBar={<SearchBar placeholder='Search Careers by name' value={searchTerm}
                    onChange={setSearchTerm} />}
            />
            <Table columns={columns} data={careers} onEditClick={handleEditClick} onViewClick={handleViewClick} onDeleteClick={handleDeleteClick} />
            <div className='flex items-center justify-end w-[100%]'>

                <Pagination
                    currentPage={careersRes?.data?.page || 1}       // backend current page
                    totalPages={careersRes?.data?.totalPages || 1} // backend total pages
                    onPageChange={(page) => setCurrentPage(page)}
                />

            </div>
        </>
    )
}

export default page