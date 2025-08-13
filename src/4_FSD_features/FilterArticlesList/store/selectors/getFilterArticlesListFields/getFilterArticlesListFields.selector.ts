import { getFilterArticlesListSelector } from "../getFilterArticlesList/getFilterArticlesListSelector"
import type { filterArticlesListStateMap } from "../../storeTypes/filterArticlesListState.map"
import { buildCreateSelector } from "@helpers/buildCreateSelector/buildCreateSelector.helper"
import { ArticleSortFieldConstant } from "../../../constants/ArticleSortField.constant"

export const [useGetFilterArticlesListOrderSelector, getFilterArticlesListOrderSelector] =
	buildCreateSelector(
		[getFilterArticlesListSelector],
		(state?: filterArticlesListStateMap) => state?.order || "ASC"
	)

export const [useGetFilterArticlesListSearchSelector, getFilterArticlesListSearchSelector] =
	buildCreateSelector(
		[getFilterArticlesListSelector],
		(state?: filterArticlesListStateMap) => state?.search ?? ""
	)

export const [useGetFilterArticlesListSortFieldSelector, getFilterArticlesListSortFieldSelector] =
	buildCreateSelector(
		[getFilterArticlesListSelector],
		(state?: filterArticlesListStateMap) => state?.sortField || ArticleSortFieldConstant.TITLE
	)

export const [useGetFilterArticlesListTypeTopicSelector, getFilterArticlesListTypeTopicSelector] =
	buildCreateSelector(
		[getFilterArticlesListSelector],
		(state?: filterArticlesListStateMap) => state?.typeTopic || "ALL"
	)
