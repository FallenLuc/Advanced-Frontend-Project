import { getArticleSelector } from "../getArticle/getArticleSelector"
import type { articleDetailsStateMap } from "../../storeTypes/articleDetailsState.map"
import { buildCreateSelector } from "@helpers/buildCreateSelector/buildCreateSelector.helper"

export const [useGetArticleDataSelector, getArticleDataSelector] = buildCreateSelector(
	[getArticleSelector],
	(state?: articleDetailsStateMap) => state?.data
)

export const [useGetArticleErrorSelector, getArticleErrorSelector] = buildCreateSelector(
	[getArticleSelector],
	(state?: articleDetailsStateMap) => state?.error || ""
)

export const [useGetArticleIsLoadingSelector, getArticleIsLoadingSelector] = buildCreateSelector(
	[getArticleSelector],
	(state?: articleDetailsStateMap) => state?.isLoading || false
)
