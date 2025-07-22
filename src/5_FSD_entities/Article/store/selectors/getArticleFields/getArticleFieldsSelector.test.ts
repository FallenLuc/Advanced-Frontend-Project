import type { DeepPartial } from "@customTypes/global.types"
import type { mainStateMap } from "@store/storeTypes/mainState.map"
import {
	getArticleDataSelector,
	getArticleErrorSelector,
	getArticleIsLoadingSelector
} from "./getArticleFields.selector"

describe(getArticleDataSelector, () => {
	test("get state", () => {
		const state: DeepPartial<mainStateMap> = {
			articleDetails: { data: { id: "1" } }
		}
		expect(getArticleDataSelector()(state as mainStateMap)).toEqual(state.articleDetails?.data)
	})

	test("get withOut state", () => {
		const state: DeepPartial<mainStateMap> = {}
		expect(getArticleDataSelector()(state as mainStateMap)).toEqual(undefined)
	})
})

describe(getArticleErrorSelector, () => {
	test("get state", () => {
		const state: DeepPartial<mainStateMap> = {
			articleDetails: { error: "tests error" }
		}
		expect(getArticleErrorSelector()(state as mainStateMap)).toBe(state.articleDetails?.error)
	})

	test("get withOut state", () => {
		const state: DeepPartial<mainStateMap> = {}
		expect(getArticleErrorSelector()(state as mainStateMap)).toBe("")
	})
})

describe(getArticleIsLoadingSelector, () => {
	test("get state", () => {
		const state: DeepPartial<mainStateMap> = {
			articleDetails: { isLoading: true }
		}
		expect(getArticleIsLoadingSelector()(state as mainStateMap)).toBe(true)
	})

	test("get withOut state", () => {
		const state: DeepPartial<mainStateMap> = {}
		expect(getArticleIsLoadingSelector()(state as mainStateMap)).toBe(false)
	})
})
