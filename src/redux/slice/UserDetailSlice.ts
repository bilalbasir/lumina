import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isModalOpen: false,
    isViewApplicationModalOpen: false,
    isViewLeadModalOpen: false,
    isDeleteServiceModalOpen: false,
    isDeleteCareerModalOpen: false,
    isDeleteBlogModalOpen: false,
    isDeleteLeadsModalOpen: false,
    isDeleteApplicantModalOpen: false,
}
const UserDetail = createSlice({
    name: "UserDetail",
    initialState: initialState,
    reducers: {
        saveUserDetail: ((state) => {
            state.isModalOpen = true
        })

    }
})

export const { saveUserDetail } = UserDetail.actions
export default UserDetail.reducer