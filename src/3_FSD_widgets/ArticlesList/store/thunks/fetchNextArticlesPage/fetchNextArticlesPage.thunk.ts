import { createAsyncThunk } from "@reduxjs/toolkit"
import type { thunkConfigType } from "@store/storeTypes/thunks.type"

import { articlesListActions } from "../../slices/articlesList.slice"
import { fetchArticlesThunk } from "../fetchArticles/fetchArticles.thunk"
import {
	getArticlesListIsLoadingSelector,
	getArticlesListHasMoreSelector
} from "../../selectors/getArticlesListFields/getArticlesListFields.selector"

export const fetchNextArticlesPageThunk = createAsyncThunk<
	undefined,
	undefined,
	thunkConfigType<undefined>
>("articlesList/fetchNextArticlesPage", (_, thunkAPI) => {
	const { dispatch, getState } = thunkAPI
	const articlesIsLoading = getArticlesListIsLoadingSelector()(getState())
	const hasMore = getArticlesListHasMoreSelector()(getState())

	if (!articlesIsLoading && hasMore) {
		dispatch(articlesListActions.setPage())

		dispatch(fetchArticlesThunk({}))
	}

	return undefined
})
