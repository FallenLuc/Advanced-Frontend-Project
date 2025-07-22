import type { filterArticlesListStateMap } from "@features/FilterArticlesList"
import { ArticleSortFieldConstant, filterArticlesListActions } from "@features/FilterArticlesList"
import { createAsyncThunk } from "@reduxjs/toolkit"
import type { thunkConfigType } from "@store/storeTypes/thunks.type"
import { articlesListActions } from "../../slices/articlesList.slice"
import { fetchArticlesThunk } from "../fetchArticles/fetchArticles.thunk"
import { getArticlesListInitedSelector } from "../../selectors/getArticlesListFields/getArticlesListFields.selector"

export const initArticlesListThunk = createAsyncThunk<
	undefined,
	URLSearchParams | undefined,
	thunkConfigType<undefined>
>("articlesList/initArticlesListThunk", (searchParams, thunkAPI) => {
	const { dispatch, getState } = thunkAPI
	const inited = getArticlesListInitedSelector()(getState())

	if (!inited) {
		const order = searchParams?.get("_order") as filterArticlesListStateMap["order"]
		const sort = searchParams?.get("_sort") as filterArticlesListStateMap["sortField"]
		const type = searchParams?.get("type") as filterArticlesListStateMap["typeTopic"]
		const search = searchParams?.get("search") as filterArticlesListStateMap["search"]

		const { setOrder, setSearch, setSortField, setType } = filterArticlesListActions

		dispatch(setOrder(order ?? "ASC"))
		dispatch(setSortField(sort ?? ArticleSortFieldConstant.TITLE))
		dispatch(setType(type ?? "ALL"))
		dispatch(setSearch(search ?? ""))

		dispatch(articlesListActions.initState())
		dispatch(fetchArticlesThunk({}))
	}

	return undefined
})
