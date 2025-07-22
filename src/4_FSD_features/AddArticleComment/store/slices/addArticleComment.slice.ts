import type { PayloadAction } from "@reduxjs/toolkit"
import type { addArticleCommentStateMap } from "../storeTypes/addArticleCommentState.map"
import { addNewArticleCommentThunk } from "../thunks/addNewArticleCommentThunk/addNewArticleComment.thunk"
import { buildSlice } from "@helpers/buildSlice/buildSlice.helper"

const initialState: addArticleCommentStateMap = { error: undefined, text: "", isLoading: false }

const addArticleCommentSlice = buildSlice({
	name: "addArticleComment",
	initialState,
	reducers: {
		setText: (
			state: addArticleCommentStateMap,
			action: PayloadAction<addArticleCommentStateMap["text"]>
		) => {
			state.text = action.payload
			state.error = undefined
		}
	},
	extraReducers: builder => {
		builder
			.addCase(addNewArticleCommentThunk.pending, state => {
				state.isLoading = true
				state.error = undefined
			})
			.addCase(addNewArticleCommentThunk.fulfilled, state => {
				state.isLoading = false
				state.error = undefined
				state.text = ""
			})
			.addCase(addNewArticleCommentThunk.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload
				state.text = ""
			})
	}
})

export const {
	actions: addArticleCommentActions,
	reducer: addArticleCommentReducer,
	useActions: useAddArticleCommentActions
} = addArticleCommentSlice
