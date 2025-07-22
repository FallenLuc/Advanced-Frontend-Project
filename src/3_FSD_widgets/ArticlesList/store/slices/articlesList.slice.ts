import { LOCAL_STORAGE_VIEW_ARTICLES_KEY } from "@constants/localStorage.constant"
import { ArticleItemViews, CountArticleItemOfView } from "@entities/Article"
import type { PayloadAction } from "@reduxjs/toolkit"
import type { articlesListStateMap } from "../storeTypes/articlesListState.map"
import { fetchArticlesThunk } from "../thunks/fetchArticles/fetchArticles.thunk"
import { buildSlice } from "@helpers/buildSlice/buildSlice.helper"
import { articlesListAdapter } from "../../config/articlesListAdapter.config"

const initialState: articlesListStateMap = {
	pageNumber: 1,
	_inited: false,
	limit: 0,
	hasMore: true,
	isLoading: false,
	view: ArticleItemViews.PlATES,
	error: undefined,
	ids: [],
	entities: {}
}

const articlesListSlice = buildSlice({
	name: "articlesList",
	initialState: articlesListAdapter.getInitialState<articlesListStateMap>(initialState),
	reducers: {
		initState: (state: articlesListStateMap) => {
			const view =
				(localStorage.getItem(LOCAL_STORAGE_VIEW_ARTICLES_KEY) as ArticleItemViews) ||
				ArticleItemViews.PlATES
			state.view = view
			state.pageNumber = 1
			state.limit =
				view === ArticleItemViews.PlATES ?
					CountArticleItemOfView.PlATES
				:	CountArticleItemOfView.DETAILED
			state._inited = true
		},

		setPage: (state: articlesListStateMap) => {
			state.pageNumber += 1
		},
		setView: (
			state: articlesListStateMap,
			action: PayloadAction<articlesListStateMap["view"]>
		) => {
			const newView = action.payload
			state.view = newView
			state.limit =
				newView === ArticleItemViews.PlATES ?
					CountArticleItemOfView.PlATES
				:	CountArticleItemOfView.DETAILED

			state.pageNumber = Math.floor(state.ids.length / state.limit)

			localStorage.setItem(LOCAL_STORAGE_VIEW_ARTICLES_KEY, action.payload)
		}
	},
	extraReducers: builder => {
		builder
			.addCase(fetchArticlesThunk.pending, (state, action) => {
				const { replace } = action.meta.arg

				if (replace) {
					articlesListAdapter.removeAll(state)
				}

				state.isLoading = true
				state.error = undefined
			})
			.addCase(fetchArticlesThunk.fulfilled, (state, action) => {
				state.isLoading = false
				state.error = undefined

				state.hasMore = action.payload?.length === state.limit

				const { replace } = action.meta.arg

				if (replace) {
					articlesListAdapter.setAll(state, action.payload)
				} else {
					articlesListAdapter.addMany(state, action.payload)
				}
			})
			.addCase(fetchArticlesThunk.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload
			})
	}
})

export const {
	actions: articlesListActions,
	reducer: articlesListReducer,
	useActions: useArticleListActions
} = articlesListSlice
