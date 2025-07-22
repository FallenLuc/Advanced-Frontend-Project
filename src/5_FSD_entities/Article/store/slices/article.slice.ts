import type { articleDetailsStateMap } from "../storeTypes/articleDetailsState.map"
import { fetchArticleDataByIdThunk } from "../thunks/fetchArticleDataByIdThunk/fetchArticleDataById.thunk"
import { buildSlice } from "@helpers/buildSlice/buildSlice.helper"

const initialState: articleDetailsStateMap = {
	isLoading: false,
	data: undefined,
	error: ""
}

const articleSlice = buildSlice({
	name: "article",
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchArticleDataByIdThunk.pending, state => {
				state.isLoading = true
				state.error = undefined
			})
			.addCase(fetchArticleDataByIdThunk.fulfilled, (state, action) => {
				state.isLoading = false
				state.error = undefined
				state.data = action.payload
			})
			.addCase(fetchArticleDataByIdThunk.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload
			})
	}
})

export const {
	actions: articleActions,
	reducer: articleReducer,
	useActions: useArticleActions
} = articleSlice
