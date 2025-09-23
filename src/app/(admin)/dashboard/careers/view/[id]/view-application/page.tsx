'use client'

import careerApi from '@/app/apiServices/careerApi/CareerApi'
import CrossIcon from '@/components/icons/crossIcon/CrossIcon'
import DeleteApplicantModal from '@/components/Modal/AdminModals/DeleteApplicantModal'
import ViewApplicationModal from '@/components/Modal/AdminModals/ViewApplicationModal'
import LayoutHeader from '@/components/pages/adminSide/LayoutHeader'
import Pagination from '@/components/pagination/Pagination'
import SearchBar from '@/components/searchBar/SearchBar'
import Table from '@/components/table/Table'
import { isDeleteApplicantmodalOpenReducer, isViewApplicationmodalOpenReducer } from '@/redux/slice/ModalSlice'
import { RootState } from '@/redux/store'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const page = () => {
    const columns = [
        { key: "candidate", label: "CANDIDATE" },
        { key: "experience", label: "EXPERIENCE" },
        { key: "appliedDate", label: "APPLIED DATE" },
    ];

    const [currentPage, setCurrentPage] = useState(1)
    const params = useParams();
    const id = params?.id as string;
    console.log("ID", params);
    const [allApplicationData, setAllApplicationData] = useState<any>(null);
    const [selectedApplicantId, setSelectedApplicantId] = useState<string>('')
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState(""); // ✅ new state
    const filteredApplicant = allApplicationData?.filter((data: any) =>
        data?.candidate?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const [totalPages, setTotalPages] = useState(1);

    // Fetch service detail
    useEffect(() => {
        if (!id) return;

        const fetchApplicants = async () => {
            try {
                const res = await careerApi.getApplicationByJob(id, currentPage, searchTerm); // pass page + search
                const formattedApplicants = res.applicants.map((app: any) => ({
                    _id: app._id,
                    candidate: { name: `${app.firstName} ${app.lastName}`, email: app.email },
                    experience: `${app.experience} years`,
                    appliedDate: new Date(app.createdAt).toLocaleDateString("en-GB")
                }));
                setAllApplicationData(formattedApplicants);
                setTotalPages(res.totalPages);
            } catch (err) {
                console.error(err);
            }
        };

        fetchApplicants();
    }, [id, currentPage, searchTerm]);

    console.log("CAREER>>>>>>>>>>", allApplicationData);

    const isDeleteApplicantemodal = useSelector((state: RootState) => state.ModalDetail.isDeleteApplicantModalOpen)
    const isViewApplicationmodal = useSelector((state: RootState) => state.ModalDetail.isViewApplicationModalOpen)
    const dispatch = useDispatch()

    const handleEditClick = (id: string) => {
        console.log("Edit clicked, ID:", id);
        // navigate.push(`/dashboard/blogs/${id}`)
        // 👇 ab id apke pass hai, yahan navigate / state update / modal open kar skte ho
    };
    const handleViewClick = (id: string) => {
        console.log("View clicked, ID:", id);
        setSelectedApplicantId(id)
        dispatch(isViewApplicationmodalOpenReducer())
        // navigate.push(`/dashboard/blogs/view-blog/${id}`)

        // 👇 ab id apke pass hai, yahan navigate / state update / modal open kar skte ho
    };
    const handleDeleteClick = (id: string) => {
        console.log("Edit clicked, ID:", id);
        setSelectedApplicantId(id)
        dispatch(isDeleteApplicantmodalOpenReducer())
    }

    // if (loading) return <p>Loading...</p>;
    if (!allApplicationData) return <p>No data found</p>;
    return (
        <div>
            {isDeleteApplicantemodal &&
                <DeleteApplicantModal id={selectedApplicantId} />
            }
            {isViewApplicationmodal &&
                <ViewApplicationModal id={selectedApplicantId} />
            }
            <LayoutHeader heading='Applicants'
                subHeading='Applications for Senior Software Engineer'
                button={<Link href={"/dashboard/careers/view/111"}><CrossIcon /></Link>}
                searchBar={<SearchBar
                    placeholder="Search Applicants by name"
                    value={searchTerm}
                    onChange={(value) => {
                        setSearchTerm(value);
                        setCurrentPage(1); // search me hamesha page 1 se start
                    }}
                />
                }
            />
            <Table columns={columns} data={filteredApplicant} onEditClick={handleEditClick} onViewClick={handleViewClick} isEditIconShow={false} onDeleteClick={handleDeleteClick} />
            <div className='flex items-center justify-end w-[100%]'>

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