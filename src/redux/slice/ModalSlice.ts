import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    isModalOpen: false,
    isViewApplicationModalOpen: false,
    isViewLeadModalOpen: false,
    isDeleteServiceModalOpen: false,
    isDeleteCareerModalOpen: false,
    isDeleteBlogModalOpen: false,
    isDeleteLeadsModalOpen: false,
    isDeleteApplicantModalOpen: false,
    deleteId: "",

}
const ModalDetail = createSlice({
    name: "ModalDetail",
    initialState: initialState,
    reducers: {
        modalOpenReducer: ((state) => {
            state.isModalOpen = true
        }),
        modalCloseReducer: ((state) => {
            state.isModalOpen = false
        }),
        isViewApplicationmodalOpenReducer: ((state) => {
            state.isModalOpen = true
            state.isViewApplicationModalOpen = true
        }),
        isViewApplicationmodalCloseReducer: ((state) => {
            state.isModalOpen = false
            state.isViewApplicationModalOpen = false
        }),
        isViewLeadmodalOpenReducer: ((state) => {
            state.isModalOpen = true
            state.isViewLeadModalOpen = true
        }),
        isViewLeadmodalCloseReducer: ((state) => {
            state.isModalOpen = false
            state.isViewLeadModalOpen = false
        }),
        isDeleteServicemodalOpenReducer: ((state) => {
            state.isModalOpen = true
            state.isDeleteServiceModalOpen = true
        }),
        isDeleteServicemodalCloseReducer: ((state) => {
            state.isModalOpen = false
            state.isDeleteServiceModalOpen = false
        }),
        isDeleteCareermodalOpenReducer: ((state) => {
            state.isModalOpen = true
            state.isDeleteCareerModalOpen = true
        }),
        isDeletecareermodalCloseReducer: ((state) => {
            state.isModalOpen = false
            state.isDeleteCareerModalOpen = false
        }),
        isDeleteBlogmodalOpenReducer: ((state, action: PayloadAction<string>) => {
            state.isModalOpen = true
            state.isDeleteBlogModalOpen = true
            state.deleteId = action.payload
        }),
        isDeleteBlogmodalCloseReducer: ((state) => {
            state.isModalOpen = false
            state.isDeleteBlogModalOpen = false
            // @ts-ignore
            state.deleteId = ""
        }),
        isDeleteLeadsmodalOpenReducer: ((state) => {
            state.isDeleteLeadsModalOpen = true
            state.isDeleteLeadsModalOpen = true
        }),
        isDeleteLeadsmodalCloseReducer: ((state) => {
            state.isDeleteLeadsModalOpen = false
            state.isDeleteLeadsModalOpen = false
        }),
        isDeleteApplicantmodalOpenReducer: ((state) => {
            state.isDeleteApplicantModalOpen = true
            state.isDeleteApplicantModalOpen = true
        }),
        isDeleteApplicantmodalCloseReducer: ((state) => {
            state.isDeleteApplicantModalOpen = false
            state.isDeleteApplicantModalOpen = false
        }),

    }
})

export const { modalOpenReducer, isViewApplicationmodalCloseReducer, isViewApplicationmodalOpenReducer,
    isDeleteServicemodalOpenReducer,
    isDeleteServicemodalCloseReducer,
    isViewLeadmodalOpenReducer,
    isViewLeadmodalCloseReducer,
    isDeleteCareermodalOpenReducer,
    isDeletecareermodalCloseReducer,
    isDeleteBlogmodalOpenReducer,
    isDeleteBlogmodalCloseReducer,
    isDeleteLeadsmodalOpenReducer,
    isDeleteLeadsmodalCloseReducer,
    isDeleteApplicantmodalOpenReducer,
    isDeleteApplicantmodalCloseReducer,
    modalCloseReducer } = ModalDetail.actions
export default ModalDetail.reducer