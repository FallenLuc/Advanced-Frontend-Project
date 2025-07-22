import type { DeepPartial } from "@customTypes/global.types"
import { describe, expect, test } from "@jest/globals"
import type { mainStateMap } from "@store/storeTypes/mainState.map"
import { getArticleSelector } from "./getArticleSelector"

describe("getArticleSelector", () => {
	test("get state", () => {
		const state: DeepPartial<mainStateMap> = {
			articleDetails: { isLoading: true }
		}
		expect(getArticleSelector(state as mainStateMap)).toEqual(state.articleDetails)
	})

	test("get withOut state", () => {
		const state: DeepPartial<mainStateMap> = {}
		expect(getArticleSelector(state as mainStateMap)).toEqual(undefined)
	})
})
