'use client'

import React, { useState, useEffect } from 'react'
import PrimaryButton from '@/components/button/PrimaryButton'
import AddIcon from '@/components/icons/addIcon/AddIcon'
import Loader from '@/components/loader/Loader'
import DeleteServiceModal from '@/components/Modal/AdminModals/DeleteServiceModal'
import LayoutHeader from '@/components/pages/adminSide/LayoutHeader'
import Pagination from '@/components/pagination/Pagination'
import SearchBar from '@/components/searchBar/SearchBar'
import Table from '@/components/table/Table'
import { useGetAllServices } from '@/hooks/use-service-hook'
import { isDeleteServicemodalOpenReducer } from '@/redux/slice/ModalSlice'
import { RootState } from '@/redux/store'
import { dateConvert } from '@/utils/dateConvert'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { ServiceType } from '@/types/ServiceType'

const ServicesPage = () => {
    const columns = [
        { key: "name", label: "SERVICE NAME" },
        { key: "category", label: "CATEGORY" },
        { key: "status", label: "STATUS" },
        { key: "date", label: "DATE CREATED" },
    ];

    const [currentPage, setCurrentPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()
    const navigate = useRouter()
    const isDeleteServicemodal = useSelector((state: RootState) => state.ModalDetail.isDeleteServiceModalOpen)

    // Fetch services for current page
    const { data: servicesRes, isLoading } = useGetAllServices(currentPage, searchTerm);
    // Map services with formatted date
    const services = servicesRes?.data?.data?.map((service: ServiceType) => ({
        ...service,
        date: dateConvert(service.createdAt),
    })) || []

    // Total pages from backend
    const totalPages = servicesRes?.data?.totalPages || 1


    // Auto go to previous page if last record deleted
    useEffect(() => {
        if (!isLoading && services.length === 0 && currentPage > 1) {
            setCurrentPage(prev => prev - 1)
        }
    }, [services.length, currentPage, isLoading])

    // Handlers
    const handleEditClick = (id: string) => {
        navigate.push(`/dashboard/services/${id}`)
        setLoading(true)
    }
    const handleViewClick = (id: string) => {
        navigate.push(`/dashboard/services/view/${id}`)
        setLoading(true)
    }
    const handleDeleteClick = (id: string) => {

        setSelectedServiceId(id)
        dispatch(isDeleteServicemodalOpenReducer())
    }

    return (
        <>
            {(isLoading || loading) && <Loader />}

            {isDeleteServicemodal && selectedServiceId && (
                <DeleteServiceModal id={selectedServiceId} />
            )}

            <LayoutHeader
                heading='Services Management'
                button={
                    <Link href={"/dashboard/services/add-service"} onClick={() => setLoading(true)}>
                        <PrimaryButton
                            text='Add Service'
                            py="py-1.5"
                            px="px-2"
                            bgColor='bg-[#00624F]'
                            textColor='text-white'
                            icon={<AddIcon color='white' width="14" height="14" />}
                        />
                    </Link>
                }
                searchBar={
                    <SearchBar
                        placeholder='Search Service by name'
                        value={searchTerm}
                        onChange={setSearchTerm}
                    />
                }
            />

            <Table
                columns={columns}
                data={services}
                onEditClick={handleEditClick}
                onViewClick={handleViewClick}
                onDeleteClick={handleDeleteClick}
            />
            <div className='flex items-center justify-end w-[100%]'>

                <Pagination
                    currentPage={servicesRes?.data?.page || 1} // backend page
                    totalPages={totalPages}                   // backend totalPages
                    onPageChange={(page) => setCurrentPage(page)}
                />
            </div>
        </>
    )
}

export default ServicesPage
