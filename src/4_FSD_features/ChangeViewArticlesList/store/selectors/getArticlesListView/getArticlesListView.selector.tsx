import { ArticleItemViews } from "@entities/Article"
import type { mainStateMap } from "@store/storeTypes/mainState.map"
import { buildSelector } from "@helpers/buildSelector/buildSelector.helper"

export const [useGetArticlesListViewSelector, getArticlesListViewSelector] = buildSelector(
	(state: mainStateMap) => state?.articlesListStateMap?.view || ArticleItemViews.PlATES
)
