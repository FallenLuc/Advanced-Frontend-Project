import type { DeepPartial } from "@customTypes/global.types"
import { ArticleItemViews } from "@entities/Article"
import { describe, expect, test } from "@jest/globals"
import type { mainStateMap } from "@store/storeTypes/mainState.map"
import { getArticlesListViewSelector } from "./getArticlesListView.selector"

describe("getArticlesListViewSelector", () => {
	test("get state", () => {
		const state: DeepPartial<mainStateMap> = {
			articlesListStateMap: {
				view: ArticleItemViews.DETAILED
			}
		}
		expect(getArticlesListViewSelector(state as mainStateMap)).toBe(ArticleItemViews.DETAILED)
	})

	test("get withOut state", () => {
		const state: DeepPartial<mainStateMap> = {}
		expect(getArticlesListViewSelector(state as mainStateMap)).toBe(ArticleItemViews.PlATES)
	})
})
