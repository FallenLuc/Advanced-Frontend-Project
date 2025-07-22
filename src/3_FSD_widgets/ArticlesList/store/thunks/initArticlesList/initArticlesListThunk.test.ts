import type { DeepPartial } from "@customTypes/global.types"
import { expect } from "@jest/globals"
import { AsyncThunkMock } from "@mocks/AsyncThunk.mock"
import type { mainStateMap } from "@store/storeTypes/mainState.map"
import type { thunkConfigType } from "@store/storeTypes/thunks.type"
import { articlesListActions } from "../../slices/articlesList.slice"
import { fetchArticlesThunk } from "../fetchArticles/fetchArticles.thunk"
import { initArticlesListThunk } from "./initArticlesList.thunk"

type AsyncThunkMockType = AsyncThunkMock<
	undefined,
	URLSearchParams | undefined,
	thunkConfigType<undefined>
>

let thunk: AsyncThunkMockType

jest.mock("../fetchArticles/fetchArticles.thunk")

describe("fetchProfileDataThunkTest", () => {
	test("before inited", async () => {
		const state: DeepPartial<mainStateMap> = {
			articlesListStateMap: {
				_inited: false,
				pageNumber: 1
			}
		}

		thunk = new AsyncThunkMock(initArticlesListThunk, state)

		await thunk.callThunk(undefined)

		expect(thunk.dispatch).toHaveBeenCalled()
		expect(thunk.dispatch).toHaveBeenCalledTimes(8)
		expect(thunk.getState()).toEqual({
			articlesListStateMap: {
				_inited: false,
				pageNumber: 1
			}
		})
		expect(thunk.dispatch).toHaveBeenCalledWith(articlesListActions.initState())
		expect(thunk.dispatch).toHaveBeenCalledWith(fetchArticlesThunk({}) as any)
	})

	test("after inited", async () => {
		const state: DeepPartial<mainStateMap> = {
			articlesListStateMap: {
				_inited: true,
				pageNumber: 1
			}
		}

		thunk = new AsyncThunkMock(initArticlesListThunk, state)
		await thunk.callThunk(undefined)

		expect(thunk.dispatch).toHaveBeenCalled()
		expect(thunk.dispatch).toHaveBeenCalledTimes(2)
		expect(thunk.getState()).toEqual({
			articlesListStateMap: {
				_inited: true,
				pageNumber: 1
			}
		})
		expect(thunk.dispatch).not.toHaveBeenCalledWith(articlesListActions.initState())
		expect(thunk.dispatch).not.toHaveBeenCalledWith(fetchArticlesThunk({}) as any)
	})
})
