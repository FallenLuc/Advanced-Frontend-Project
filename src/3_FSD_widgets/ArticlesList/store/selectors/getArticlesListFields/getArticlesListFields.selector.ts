import type { mainStateMap } from "@store/storeTypes/mainState.map"
import { buildSelector } from "@helpers/buildSelector/buildSelector.helper"
import { getArticlesListSelector } from "../getArticlesList/getArticlesList.selector"
import type { articlesListStateMap } from "../../storeTypes/articlesListState.map"
import { buildCreateSelector } from "@helpers/buildCreateSelector/buildCreateSelector.helper"
import { articlesListAdapter } from "../../../config/articlesListAdapter.config"

const initialState = articlesListAdapter.getInitialState()

const { selectAll } = articlesListAdapter.getSelectors<mainStateMap>(
	state => state?.articlesListStateMap || initialState
)

export const [useGetArticlesListDataSelector, getArticlesListDataSelector] =
	buildSelector(selectAll)

export const [useGetArticlesListErrorSelector, getArticlesListErrorSelector] = buildCreateSelector(
	[getArticlesListSelector],
	(state?: articlesListStateMap) => state?.error || undefined
)

export const [useGetArticlesListHasMoreSelector, getArticlesListHasMoreSelector] =
	buildCreateSelector([getArticlesListSelector], (state?: articlesListStateMap) =>
		state?.hasMore === undefined ? true : state?.hasMore
	)

export const [useGetArticlesListInitedSelector, getArticlesListInitedSelector] =
	buildCreateSelector(
		[getArticlesListSelector],
		(state?: articlesListStateMap) => state?._inited || false
	)

export const [useGetArticlesListIsLoadingSelector, getArticlesListIsLoadingSelector] =
	buildCreateSelector(
		[getArticlesListSelector],
		(state?: articlesListStateMap) => state?.isLoading || false
	)

export const [useGetArticlesListLimitSelector, getArticlesListLimitSelector] = buildCreateSelector(
	[getArticlesListSelector],
	(state?: articlesListStateMap) => state?.limit || 9
)

export const [useGetArticlesListPageNumberSelector, getArticlesListPageNumberSelector] =
	buildCreateSelector(
		[getArticlesListSelector],
		(state?: articlesListStateMap) => state?.pageNumber || 1
	)
