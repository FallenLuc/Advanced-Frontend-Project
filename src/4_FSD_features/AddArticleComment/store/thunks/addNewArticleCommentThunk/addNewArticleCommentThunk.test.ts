import type { DeepPartial } from "@customTypes/global.types"
import { beforeEach, describe, expect, test } from "@jest/globals"
import { AsyncThunkMock } from "@mocks/AsyncThunk.mock"
import type { thunkConfigType } from "@store/storeTypes/thunks.type"
import type { commentBdDataType } from "../../../types/commentBdData.type"
import type { addArticleCommentStateMap } from "../../storeTypes/addArticleCommentState.map"
import { addNewArticleCommentThunk } from "./addNewArticleComment.thunk"

let DataValue: DeepPartial<commentBdDataType>

type AsyncThunkMockType = AsyncThunkMock<
	commentBdDataType,
	commentBdDataType,
	thunkConfigType<addArticleCommentStateMap["error"]>
>

let thunk: AsyncThunkMockType

let mockedRequest: AsyncThunkMockType["api"]["post"]

describe("fetchProfileDataThunkTest", () => {
	beforeEach(() => {
		thunk = new AsyncThunkMock(addNewArticleCommentThunk)
		mockedRequest = thunk.api.post
	})

	test("addCommentArticleThunk fullFilled", async () => {
		DataValue = {
			id: "1",
			articleId: "1"
		}

		mockedRequest.mockReturnValue(Promise.resolve({ data: DataValue }))

		const result = await thunk.callThunk(DataValue as commentBdDataType)

		expect(mockedRequest).toHaveBeenCalled()
		expect(thunk.dispatch).toHaveBeenCalledTimes(3)
		expect(result.meta.requestStatus).toBe("fulfilled")
		expect(result.payload).toEqual(DataValue)
	})

	test("addCommentArticleThunk rejected", async () => {
		mockedRequest.mockReturnValue(Promise.reject({ response: { status: 403 } }))

		DataValue = {
			id: "1",
			articleId: "1"
		}

		const result = await thunk.callThunk(DataValue as commentBdDataType)

		expect(mockedRequest).toHaveBeenCalled()
		expect(thunk.dispatch).toHaveBeenCalledTimes(2)
		expect(result.meta.requestStatus).toBe("rejected")
		expect(result.payload).toBe("error with post comment")
	})
})
