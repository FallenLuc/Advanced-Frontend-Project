import type { DeepPartial } from "@customTypes/global.types"
import { describe, expect, test } from "@jest/globals"
import type { mainStateMap } from "@store/storeTypes/mainState.map"
import { getArticlesListSelector } from "./getArticlesList.selector"

describe(getArticlesListSelector, () => {
	test("get state", () => {
		const state: DeepPartial<mainStateMap> = {
			articlesListStateMap: {
				isLoading: true
			}
		}
		expect(getArticlesListSelector(state as mainStateMap)).toEqual({ isLoading: true })
	})

	test("get withOut state", () => {
		const state: DeepPartial<mainStateMap> = {}
		expect(getArticlesListSelector(state as mainStateMap)).toEqual(undefined)
	})
})
