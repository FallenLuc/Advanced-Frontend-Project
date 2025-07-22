import type { DeepPartial } from "@customTypes/global.types"
import type { mainStateMap } from "@store/storeTypes/mainState.map"
import {
	getFilterArticlesListOrderSelector,
	getFilterArticlesListSearchSelector,
	getFilterArticlesListSortFieldSelector,
	getFilterArticlesListTypeTopicSelector
} from "./getFilterArticlesListFields.selector"
import { ArticleSortFieldConstant } from "../../../constants/ArticleSortField.constant"
import { ArticleTypeConstant } from "@entities/Article/constants/Article.constant"

describe(getFilterArticlesListOrderSelector, () => {
	test("get state", () => {
		const state: DeepPartial<mainStateMap> = {
			filterArticlesList: {
				order: "DESC"
			}
		}
		expect(getFilterArticlesListOrderSelector()(state as mainStateMap)).toBe("DESC")
	})

	test("get withOut state", () => {
		const state: DeepPartial<mainStateMap> = {}
		expect(getFilterArticlesListOrderSelector()(state as mainStateMap)).toBe("ASC")
	})
})

describe(getFilterArticlesListSearchSelector, () => {
	test("get state", () => {
		const state: DeepPartial<mainStateMap> = {
			filterArticlesList: { search: "test" }
		}
		expect(getFilterArticlesListSearchSelector()(state as mainStateMap)).toBe("test")
	})

	test("get withOut state", () => {
		const state: DeepPartial<mainStateMap> = {}
		expect(getFilterArticlesListSearchSelector()(state as mainStateMap)).toBe("")
	})
})

describe(getFilterArticlesListSortFieldSelector, () => {
	test("get state", () => {
		const state: DeepPartial<mainStateMap> = {
			filterArticlesList: {
				sortField: ArticleSortFieldConstant.DATE
			}
		}
		expect(getFilterArticlesListSortFieldSelector()(state as mainStateMap)).toBe(
			ArticleSortFieldConstant.DATE
		)
	})

	test("get withOut state", () => {
		const state: DeepPartial<mainStateMap> = {}
		expect(getFilterArticlesListSortFieldSelector()(state as mainStateMap)).toBe(
			ArticleSortFieldConstant.TITLE
		)
	})
})

describe(getFilterArticlesListTypeTopicSelector, () => {
	test("get state", () => {
		const state: DeepPartial<mainStateMap> = {
			filterArticlesList: { typeTopic: ArticleTypeConstant.IT }
		}
		expect(getFilterArticlesListTypeTopicSelector()(state as mainStateMap)).toBe("IT")
	})

	test("get withOut state", () => {
		const state: DeepPartial<mainStateMap> = {}
		expect(getFilterArticlesListTypeTopicSelector()(state as mainStateMap)).toBe("ALL")
	})
})
