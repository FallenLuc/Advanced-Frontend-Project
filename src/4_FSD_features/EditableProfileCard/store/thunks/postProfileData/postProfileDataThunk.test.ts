import { Country } from "@entities/Country"
import { Currency } from "@entities/Currency"
import type { profileCardDataType, profileDataType, profileStateMap } from "@entities/Profile"
import { ServerErrors, ValidateErrorsConstant } from "@entities/Profile"
import { describe, expect, test } from "@jest/globals"
import { AsyncThunkMock } from "@mocks/AsyncThunk.mock"
import type { thunkConfigType } from "@store/storeTypes/thunks.type"
import { postProfileDataThunk } from "./postProfileData.thunk"

let thunk: AsyncThunkMock<
	profileDataType,
	profileDataType["id"],
	thunkConfigType<profileStateMap["errors"]>
>

const profileCardDataValue: profileCardDataType = {
	avatar: "https://i.pinimg.com/originals/0d/cb/1f/0dcb1f45db2d5a624e5da74b74f3ddb9.png",
	firstName: "Lucifer",
	lastName: "Morningstar",
	age: 25,
	currency: Currency.EUR,
	country: Country.Belarus,
	city: "Fryazino",
	userName: "Lucifer"
}

const profileDataValue: profileDataType = {
	id: "1",
	avatar: "https://i.pinimg.com/originals/0d/cb/1f/0dcb1f45db2d5a624e5da74b74f3ddb9.png",
	firstName: "Lucifer",
	lastName: "Morningstar",
	age: 25,
	currency: Currency.EUR,
	country: Country.Belarus,
	city: "Fryazino",
	userName: "Lucifer"
}

let mockedPut: (typeof AsyncThunkMock<
	profileDataType,
	profileDataType["id"],
	thunkConfigType<profileStateMap["errors"]>
>)["prototype"]["api"]["put"]

describe("postProfileDataThunkTest", () => {
	test("getting updateDate fulfilled", async () => {
		thunk = new AsyncThunkMock(postProfileDataThunk, {
			editableProfileCard: { formData: profileCardDataValue }
		})

		mockedPut = thunk.api.put

		mockedPut.mockReturnValue(Promise.resolve({ data: profileDataValue }))

		const result = await thunk.callThunk("1")

		expect(mockedPut).toHaveBeenCalled()
		expect(result.meta.requestStatus).toBe("fulfilled")
		expect(result.payload).toEqual(profileDataValue)
	})

	test("getting updateDate rejected error server", async () => {
		thunk = new AsyncThunkMock(postProfileDataThunk, {
			editableProfileCard: { formData: profileCardDataValue }
		})

		mockedPut = thunk.api.put

		mockedPut.mockReturnValue(Promise.reject({ response: { status: 403 } }))

		const result = await thunk.callThunk("1")

		expect(mockedPut).toHaveBeenCalled()
		expect(result.meta.requestStatus).toBe("rejected")
		expect(result.payload).toEqual([ServerErrors.SERVER_NOT_FOUND])
	})

	test("getting updateDate rejected error validate", async () => {
		thunk = new AsyncThunkMock(postProfileDataThunk, {
			editableProfileCard: { formData: { ...profileCardDataValue, firstName: "" } }
		})

		mockedPut = thunk.api.put

		const result = await thunk.callThunk("1")

		expect(mockedPut).not.toHaveBeenCalled()
		expect(result.meta.requestStatus).toBe("rejected")
		expect(result.payload).toEqual([ValidateErrorsConstant.FIRST_NAME])
	})
})
