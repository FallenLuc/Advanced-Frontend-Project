import { commentsArticleDetailsAdapter } from "../../../configs/commentsArticleDetailsAdapter.config"
import { buildSelector } from "@helpers/buildSelector/buildSelector.helper"
import type { mainStateMap } from "@store/storeTypes/mainState.map"
import { getCommentsArticleDetailsSelector } from "../getCommentsArticleDetails/getCommentsArticleDetails.selector"
import type { commentsArticleDetailsMap } from "../../storeTypes/commentsArticleDetails.map"
import { buildCreateSelector } from "@helpers/buildCreateSelector/buildCreateSelector.helper"

const initialState = commentsArticleDetailsAdapter.getInitialState()

export const [useGetCommentsArticleDetailsDataSelector, getCommentsArticleDetailsDataSelector] =
	buildSelector(
		commentsArticleDetailsAdapter.getSelectors<mainStateMap>(
			state => state?.commentsArticleDetails || initialState
		).selectAll
	)

export const [useGetCommentsArticleDetailsErrorSelector, getCommentsArticleDetailsErrorSelector] =
	buildCreateSelector(
		[getCommentsArticleDetailsSelector],
		(state?: commentsArticleDetailsMap) => state?.error || ""
	)

export const [
	useGetCommentsArticleDetailsIsLoadingSelector,
	getCommentsArticleDetailsIsLoadingSelector
] = buildCreateSelector(
	[getCommentsArticleDetailsSelector],
	(state?: commentsArticleDetailsMap) => state?.isLoading || false
)
