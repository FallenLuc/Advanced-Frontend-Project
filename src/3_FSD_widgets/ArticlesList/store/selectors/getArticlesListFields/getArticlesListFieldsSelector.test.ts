import type { DeepPartial } from "@customTypes/global.types"
import type { mainStateMap } from "@store/storeTypes/mainState.map"
import {
	getArticlesListDataSelector,
	getArticlesListErrorSelector,
	getArticlesListHasMoreSelector,
	getArticlesListInitedSelector,
	getArticlesListIsLoadingSelector,
	getArticlesListLimitSelector,
	getArticlesListPageNumberSelector
} from "./getArticlesListFields.selector"

describe("getArticlesListDataSelector", () => {
	test("get state", () => {
		const state: DeepPartial<mainStateMap> = {
			articlesListStateMap: {
				entities: {
					"1": {
						id: "1"
					}
				},
				ids: ["1"]
			}
		}
		expect(getArticlesListDataSelector(state as mainStateMap)).toEqual([
			{
				id: "1"
			}
		])
	})

	test("get withOut state", () => {
		const state: DeepPartial<mainStateMap> = {}
		expect(getArticlesListDataSelector(state as mainStateMap)).toEqual([])
	})
})

describe("getArticlesListErrorSelector", () => {
	test("get state", () => {
		const state: DeepPartial<mainStateMap> = {
			articlesListStateMap: {
				error: "error string"
			}
		}
		expect(getArticlesListErrorSelector()(state as mainStateMap)).toBe("error string")
	})

	test("get withOut state", () => {
		const state: DeepPartial<mainStateMap> = {}
		expect(getArticlesListErrorSelector()(state as mainStateMap)).toBe(undefined)
	})
})

describe("getArticlesListHasMoreSelector", () => {
	test("get state", () => {
		const state: DeepPartial<mainStateMap> = {
			articlesListStateMap: { hasMore: false }
		}
		expect(getArticlesListHasMoreSelector()(state as mainStateMap)).toBe(false)
	})

	test("get withOut state", () => {
		const state: DeepPartial<mainStateMap> = {}
		expect(getArticlesListHasMoreSelector()(state as mainStateMap)).toBe(true)
	})
})

describe("getArticlesListInitedSelector", () => {
	test("get state", () => {
		const state: DeepPartial<mainStateMap> = {
			articlesListStateMap: { _inited: true }
		}
		expect(getArticlesListInitedSelector()(state as mainStateMap)).toBe(true)
	})

	test("get withOut state", () => {
		const state: DeepPartial<mainStateMap> = {}
		expect(getArticlesListInitedSelector()(state as mainStateMap)).toBe(false)
	})
})

describe("getArticlesListIsLoadingSelector", () => {
	test("get state", () => {
		const state: DeepPartial<mainStateMap> = {
			articlesListStateMap: {
				isLoading: true
			}
		}
		expect(getArticlesListIsLoadingSelector()(state as mainStateMap)).toBe(true)
	})

	test("get withOut state", () => {
		const state: DeepPartial<mainStateMap> = {}
		expect(getArticlesListIsLoadingSelector()(state as mainStateMap)).toBe(false)
	})
})

describe("getArticlesListLimitSelector", () => {
	test("get state", () => {
		const state: DeepPartial<mainStateMap> = {
			articlesListStateMap: { limit: 8 }
		}
		expect(getArticlesListLimitSelector()(state as mainStateMap)).toBe(8)
	})

	test("get withOut state", () => {
		const state: DeepPartial<mainStateMap> = {}
		expect(getArticlesListLimitSelector()(state as mainStateMap)).toBe(9)
	})
})

describe("getArticlesListPageNumberSelector", () => {
	test("get state", () => {
		const state: DeepPartial<mainStateMap> = {
			articlesListStateMap: { pageNumber: 2 }
		}
		expect(getArticlesListPageNumberSelector()(state as mainStateMap)).toBe(2)
	})

	test("get withOut state", () => {
		const state: DeepPartial<mainStateMap> = {}
		expect(getArticlesListPageNumberSelector()(state as mainStateMap)).toBe(1)
	})
})
