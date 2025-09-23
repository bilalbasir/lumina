'use client'

import CrossIcon from '@/components/icons/crossIcon/CrossIcon'
import Loader from '@/components/loader/Loader'
import DeleteLeadsModal from '@/components/Modal/AdminModals/DeleteLeadsModal'
import ViewApplicationModal from '@/components/Modal/AdminModals/ViewApplicationModal'
import ViewLeadModal from '@/components/Modal/AdminModals/ViewLeadModal'
import LayoutHeader from '@/components/pages/adminSide/LayoutHeader'
import Pagination from '@/components/pagination/Pagination'
import SearchBar from '@/components/searchBar/SearchBar'
import Table from '@/components/table/Table'
import { useGetAllLeads } from '@/hooks/use-lead-hook'
import { isDeleteLeadsmodalOpenReducer, isViewLeadmodalOpenReducer } from '@/redux/slice/ModalSlice'
import { RootState } from '@/redux/store'
import { LeadType } from '@/types/LeadType'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const page = () => {
    const columns = [
        { key: "contactInfo", label: "CONTACT INFO" },
        { key: "message", label: "MESSAGE" },
        { key: "status", label: "STATUS" },
        { key: "appliedDate", label: "APPLIED DATE" },
    ];
    const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const { data: leadsRes, isLoading } = useGetAllLeads(currentPage, searchTerm);

    const leads = leadsRes?.data?.data || [];
    console.log("LEAD RES", leads);

    // ✅ Transform leads before passing to Table
    const formattedLeads = (leads as LeadType[]).map((lead: any) => ({
        ...lead,
        contactInfo: {
            name: `${lead.firstName} ${lead.lastName}`,
            email: lead.email,
        },
        appliedDate: new Date(lead.createdAt).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
        }),
    }));
    const totalPages = leadsRes?.data?.totalPages || 1;


    // Reset page to 1 whenever search term changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);
    const isDeleteLeadsmodal = useSelector((state: RootState) => state.ModalDetail.isDeleteLeadsModalOpen)
    const isViewLeadModal = useSelector((state: RootState) => state.ModalDetail.isViewLeadModalOpen)
    const dispatch = useDispatch()

    const handleEditClick = (id: string) => {
        console.log("Edit clicked, ID:", id);
    };

    const handleViewClick = (id: string) => {
        setSelectedLeadId(id);

        dispatch(isViewLeadmodalOpenReducer())
    };

    const handleDeleteClick = (id: string) => {
        console.log("Delete clicked, ID:", id);
        setSelectedLeadId(id);

        dispatch(isDeleteLeadsmodalOpenReducer())
    };

    return (
        <div>
            {isLoading && <Loader />}
            {isDeleteLeadsmodal && selectedLeadId && <DeleteLeadsModal id={selectedLeadId} />}
            {isViewLeadModal && <ViewLeadModal id={selectedLeadId} />}

            <LayoutHeader heading='Contact Leads'
                searchBar={
                    <SearchBar
                        placeholder='Search Leads by name'
                        value={searchTerm}
                        onChange={setSearchTerm}
                    />
                }
            />

            <Table
                columns={columns}
                data={formattedLeads}
                onEditClick={handleEditClick}
                onViewClick={handleViewClick}
                isEditIconShow={false}
                onDeleteClick={handleDeleteClick}
            />
            <div className="flex justify-end mt-4">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => setCurrentPage(page)}
                />
            </div>
        </div>
    )
}

export default page
