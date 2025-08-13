import { fetchProfileDataThunk, mappingErrors } from "@entities/Profile"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { editableProfileStateMap } from "../storeTypes/editableProfileState.map"
import { postProfileDataThunk } from "../thunks/postProfileData/postProfileData.thunk"
import { buildSlice } from "@helpers/buildSlice/buildSlice.helper"

const initialState: editableProfileStateMap = {
	isLoading: false,
	data: undefined,
	formData: undefined,
	readOnly: true,
	errors: undefined
}

const editableProfileCardSlice = buildSlice({
	name: "editableProfileSlice",
	initialState,
	reducers: {
		setReadOnly(state: editableProfileStateMap, action: PayloadAction<boolean>) {
			state.readOnly = action.payload
		},
		resetForm(state: editableProfileStateMap) {
			state.formData = state.data
			state.readOnly = true
			state.errors = undefined
		},
		updateForm(
			state: editableProfileStateMap,
			action: PayloadAction<editableProfileStateMap["formData"]>
		) {
			state.formData = {
				...state.formData,
				...action.payload
			}
		}
	},
	extraReducers: builder => {
		builder
			.addCase(fetchProfileDataThunk.pending, state => {
				state.isLoading = true
				state.errors = undefined
			})
			.addCase(fetchProfileDataThunk.fulfilled, (state, action) => {
				state.isLoading = false
				state.errors = undefined

				const { id, ...formData } = action.payload

				state.data = { id, ...formData }
				state.formData = formData
			})
			.addCase(fetchProfileDataThunk.rejected, (state, action) => {
				state.isLoading = false
				state.errors = action.payload
			})
			.addCase(postProfileDataThunk.pending, state => {
				state.isLoading = true
				state.errors = undefined
				state.readOnly = true
			})
			.addCase(postProfileDataThunk.fulfilled, (state, action) => {
				state.isLoading = false
				state.errors = undefined

				const { id, ...formData } = action.payload

				state.formData = formData
				state.data = { id, ...formData }

				state.readOnly = true
			})
			.addCase(postProfileDataThunk.rejected, (state, action) => {
				state.isLoading = false
				state.errors = action.payload

				const { isServerErrors } = mappingErrors(action.payload)

				state.readOnly = isServerErrors
			})
	}
})

export const {
	actions: editableProfileActions,
	reducer: editableProfileCardReducer,
	useActions: useEditableProfileCardActions
} = editableProfileCardSlice
