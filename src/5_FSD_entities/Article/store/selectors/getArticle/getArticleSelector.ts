import type { mainStateMap } from "@store/storeTypes/mainState.map"
import { buildSelector } from "@helpers/buildSelector/buildSelector.helper"

export const [_, getArticleSelector] = buildSelector((state: mainStateMap) => state.articleDetails)
