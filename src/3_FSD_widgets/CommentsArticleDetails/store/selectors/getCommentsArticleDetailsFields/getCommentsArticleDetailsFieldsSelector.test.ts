import type { DeepPartial } from "@customTypes/global.types"
import type { mainStateMap } from "@store/storeTypes/mainState.map"
import {
	getCommentsArticleDetailsDataSelector,
	getCommentsArticleDetailsErrorSelector,
	getCommentsArticleDetailsIsLoadingSelector
} from "./getCommentsArticleDetailsFields.selector"

describe("getCommentsArticleDetailsDataSelector", () => {
	test("get state", () => {
		const state: DeepPartial<mainStateMap> = {
			commentsArticleDetails: {
				entities: {
					"1": {
						id: "1",
						text: "test1"
					},
					"2": {
						id: "2",
						text: "test2"
					}
				},
				ids: ["1", "2"]
			}
		}
		expect(getCommentsArticleDetailsDataSelector(state as mainStateMap)).toEqual([
			{
				id: "1",
				text: "test1"
			},
			{
				id: "2",
				text: "test2"
			}
		])
	})

	test("get withOut state", () => {
		const state: DeepPartial<mainStateMap> = {}

		expect(getCommentsArticleDetailsDataSelector(state as mainStateMap)).toEqual([])
	})
})

describe("getCommentsArticleDetailsErrorSelector", () => {
	test("get state", () => {
		const state: DeepPartial<mainStateMap> = {
			commentsArticleDetails: { error: "error" }
		}
		expect(getCommentsArticleDetailsErrorSelector()(state as mainStateMap)).toBe("error")
	})

	test("get withOut state", () => {
		const state: DeepPartial<mainStateMap> = {}
		expect(getCommentsArticleDetailsErrorSelector()(state as mainStateMap)).toBe("")
	})
})

describe("getCommentsArticleDetailsIsLoadingSelector", () => {
	test("get state", () => {
		const state: DeepPartial<mainStateMap> = {
			commentsArticleDetails: {
				isLoading: true
			}
		}
		expect(getCommentsArticleDetailsIsLoadingSelector()(state as mainStateMap)).toBe(true)
	})

	test("get withOut state", () => {
		const state: DeepPartial<mainStateMap> = {}
		expect(getCommentsArticleDetailsIsLoadingSelector()(state as mainStateMap)).toBe(false)
	})
})
