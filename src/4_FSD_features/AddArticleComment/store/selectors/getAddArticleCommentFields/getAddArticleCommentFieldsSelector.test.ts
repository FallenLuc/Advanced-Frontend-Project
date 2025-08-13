import type { DeepPartial } from "@customTypes/global.types"
import type { mainStateMap } from "@store/storeTypes/mainState.map"
import {
	getAddArticleCommentErrorSelector,
	getAddArticleCommentIsLoadingSelector,
	getAddArticleCommentTextSelector
} from "./getAddArticleCommentFields.selector"

describe("getAddArticleCommentErrorSelector", () => {
	test("get state", () => {
		const state: DeepPartial<mainStateMap> = {
			addArticleComment: { error: "test" }
		}
		expect(getAddArticleCommentErrorSelector()(state as mainStateMap)).toBe("test")
	})

	test("get withOut state", () => {
		const state: DeepPartial<mainStateMap> = {}
		expect(getAddArticleCommentErrorSelector()(state as mainStateMap)).toEqual(undefined)
	})
})

describe("getAddArticleCommentIsLoadingSelector", () => {
	test("get state", () => {
		const state: DeepPartial<mainStateMap> = {
			addArticleComment: { text: "1", isLoading: true }
		}
		expect(getAddArticleCommentIsLoadingSelector()(state as mainStateMap)).toBe(true)
	})

	test("get withOut state", () => {
		const state: DeepPartial<mainStateMap> = {}
		expect(getAddArticleCommentIsLoadingSelector()(state as mainStateMap)).toEqual(false)
	})
})

describe("getAddArticleCommentTextSelector", () => {
	test("get state", () => {
		const state: DeepPartial<mainStateMap> = {
			addArticleComment: { text: "txt" }
		}
		expect(getAddArticleCommentTextSelector()(state as mainStateMap)).toBe("txt")
	})

	test("get withOut state", () => {
		const state: DeepPartial<mainStateMap> = {}
		expect(getAddArticleCommentTextSelector()(state as mainStateMap)).toBe("")
	})
})
