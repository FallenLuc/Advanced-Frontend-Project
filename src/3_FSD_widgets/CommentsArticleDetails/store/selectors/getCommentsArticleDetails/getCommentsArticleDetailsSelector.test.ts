import type { DeepPartial } from "@customTypes/global.types"
import { describe, expect, test } from "@jest/globals"
import type { mainStateMap } from "@store/storeTypes/mainState.map"
import { getCommentsArticleDetailsSelector } from "./getCommentsArticleDetails.selector"

describe("getCommentsArticleDetailsSelector", () => {
	test("get state", () => {
		const state: DeepPartial<mainStateMap> = {
			commentsArticleDetails: {
				isLoading: false
			}
		}
		expect(getCommentsArticleDetailsSelector(state as mainStateMap)).toEqual({
			isLoading: false
		})
	})

	test("get withOut state", () => {
		const state: DeepPartial<mainStateMap> = {}
		expect(getCommentsArticleDetailsSelector(state as mainStateMap)).toEqual(undefined)
	})
})
