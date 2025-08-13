import { buildCreateSelector } from "@helpers/buildCreateSelector/buildCreateSelector.helper"
import { getAddArticleCommentSelector } from "../getAddArticleComment/getAddArticleComment.selector"
import type { addArticleCommentStateMap } from "../../storeTypes/addArticleCommentState.map"

export const [useGetAddArticleCommentErrorSelector, getAddArticleCommentErrorSelector] =
	buildCreateSelector(
		[getAddArticleCommentSelector],
		(state?: addArticleCommentStateMap) => state?.error
	)

export const [useGetAddArticleCommentIsLoadingSelector, getAddArticleCommentIsLoadingSelector] =
	buildCreateSelector(
		[getAddArticleCommentSelector],
		(state?: addArticleCommentStateMap) => state?.isLoading || false
	)

export const [useGetAddArticleCommentTextSelector, getAddArticleCommentTextSelector] =
	buildCreateSelector(
		[getAddArticleCommentSelector],
		(state?: addArticleCommentStateMap) => state?.text ?? ""
	)
