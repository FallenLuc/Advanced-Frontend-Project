import type { articleDetailsDataType } from "@entities/Article"
import {
	getFilterArticlesListOrderSelector,
	getFilterArticlesListSearchSelector,
	getFilterArticlesListSortFieldSelector,
	getFilterArticlesListTypeTopicSelector
} from "@features/FilterArticlesList"
import { addQueryParams } from "@helpers/addQueryParams/addQueryParams.helper"
import { createAsyncThunk } from "@reduxjs/toolkit"
import type { thunkConfigType } from "@store/storeTypes/thunks.type"
import { getArticlesListLimitSelector } from "../../selectors/getArticlesListLimit/getArticlesListLimit.selector"
import { getArticlesListPageNumberSelector } from "../../selectors/getArticlesListPageNumber/getArticlesListPageNumber.selector"
import type { articlesListStateMap } from "../../storeTypes/articlesListState.map"
import { RoutePaths } from "@config/router"

export type fetchArticlesThunkProps = {
	replace?: boolean
}

export const fetchArticlesThunk = createAsyncThunk<
	articleDetailsDataType[],
	fetchArticlesThunkProps,
	thunkConfigType<articlesListStateMap["error"]>
>("articlesList/fetchArticlesThunk", async (props, thunkAPI) => {
	const { extra, rejectWithValue, getState } = thunkAPI

	const limit = getArticlesListLimitSelector(getState())
	const pageNumber = getArticlesListPageNumberSelector(getState())
	const order = getFilterArticlesListOrderSelector(getState())
	const sortField = getFilterArticlesListSortFieldSelector(getState())
	const search = getFilterArticlesListSearchSelector(getState())
	const typeTopic = getFilterArticlesListTypeTopicSelector(getState())

	const params: Record<string, any> = {
		_sort: sortField,
		_order: order,
		type: typeTopic,
		search
	}

	try {
		addQueryParams(params, RoutePaths.ARTICLES)
		const response = await extra.api.get("/articles", {
			params: {
				_page: pageNumber,
				_limit: limit,
				_expand: "user",
				_sort: sortField,
				_order: order,
				type: typeTopic === "ALL" ? undefined : typeTopic,
				q: search
			}
		})

		return response.data
	} catch {
		return rejectWithValue("error with request articles")
	}
})
