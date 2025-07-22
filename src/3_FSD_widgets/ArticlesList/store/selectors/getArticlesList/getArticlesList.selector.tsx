import type { mainStateMap } from "@store/storeTypes/mainState.map"
import { buildSelector } from "@helpers/buildSelector/buildSelector.helper"

export const [_, getArticlesListSelector] = buildSelector(
	(state: mainStateMap) => state.articlesListStateMap
)
