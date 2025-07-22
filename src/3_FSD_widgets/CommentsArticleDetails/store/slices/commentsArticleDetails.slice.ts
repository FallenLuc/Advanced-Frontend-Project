import type { commentsArticleDetailsMap } from "../storeTypes/commentsArticleDetails.map"
import { fetchCommentsByArticleIdThunk } from "../thunks/fetchCommentsByArticleId.thunk"
import { buildSlice } from "@helpers/buildSlice/buildSlice.helper"
import { commentsArticleDetailsAdapter } from "../../configs/commentsArticleDetailsAdapter.config"

const commentsArticleDetailsSlice = buildSlice({
	name: "commentsArticleDetails",
	initialState: commentsArticleDetailsAdapter.getInitialState<commentsArticleDetailsMap>({
		isLoading: false,
		error: undefined,
		ids: [],
		entities: {}
	}),
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchCommentsByArticleIdThunk.pending, state => {
				state.isLoading = true
				state.error = undefined
			})
			.addCase(fetchCommentsByArticleIdThunk.fulfilled, (state, action) => {
				state.isLoading = false
				state.error = undefined
				commentsArticleDetailsAdapter.setAll(state, action.payload)
			})
			.addCase(fetchCommentsByArticleIdThunk.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload
			})
	}
})

export const {
	actions: commentsArticleDetailsActions,
	reducer: commentsArticleDetailsReducer,
	useActions: useCommentsArticleDetailsActions
} = commentsArticleDetailsSlice
