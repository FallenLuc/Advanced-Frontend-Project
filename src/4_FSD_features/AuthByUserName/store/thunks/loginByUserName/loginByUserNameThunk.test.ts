import type { userDataType } from "@entities/User"
import { userDataMock, userActions } from "@entities/User"
import { UserRoles } from "@entities/User/constants/userRoles.constant"
import { beforeEach, describe, expect, test } from "@jest/globals"
import { AsyncThunkMock } from "@mocks/AsyncThunk.mock"
import type { thunkConfigType } from "@store/storeTypes/thunks.type"
import type { loginByUserNameDataType } from "../../../types/loginByUserNameData.type"
import type { loginByUserNameError } from "../../../types/loginByUserNameError.type"
import { loginFormActions } from "../../slices/loginForm.slice"
import { loginByUserNameThunk } from "./loginByUserName.thunk"

const { setAuthData } = userActions
const { resetForm } = loginFormActions

let thunk: AsyncThunkMock<
	userDataType,
	loginByUserNameDataType,
	thunkConfigType<loginByUserNameError>
>

let userValue: userDataType

let mockedPost: (typeof AsyncThunkMock<
	userDataType,
	loginByUserNameDataType,
	thunkConfigType<loginByUserNameError>
>)["prototype"]["api"]["post"]

describe("loginByUserNameThunkTest", () => {
	beforeEach(() => {
		thunk = new AsyncThunkMock(loginByUserNameThunk)
		mockedPost = thunk.api.post
	})

	test("getting authData fullFilled", async () => {
		userValue = userDataMock({ id: "1", userName: "adminTest", roles: [UserRoles.ADMIN] })

		mockedPost.mockReturnValue(Promise.resolve({ data: userValue }))

		const result = await thunk.callThunk({ userName: "adminTest", password: "123" })

		expect(mockedPost).toHaveBeenCalled()
		expect(result.meta.requestStatus).toBe("fulfilled")
		expect(thunk.dispatch).toHaveBeenCalledTimes(3)
		expect(thunk.dispatch).toHaveBeenCalledWith(setAuthData(userValue))
		expect(result.payload).toEqual(userValue)
	})

	test("getting authData rejected noUser", async () => {
		mockedPost.mockReturnValue(Promise.reject({ response: { status: 403 } }))

		const result = await thunk.callThunk({ userName: "adminTest", password: "password" })

		expect(mockedPost).toHaveBeenCalled()
		expect(result.meta.requestStatus).toBe("rejected")
		expect(thunk.dispatch).toHaveBeenCalledTimes(2)
		expect(thunk.dispatch).not.toHaveBeenCalledWith(setAuthData(userValue))
		expect(thunk.dispatch).not.toHaveBeenCalledWith(resetForm())
		expect(result.payload).toEqual({ noUser: true })
	})

	test("getting authData rejected other error", async () => {
		const errorText = "somethingError"

		mockedPost.mockReturnValue(Promise.reject({ message: errorText }))

		const result = await thunk.callThunk({ userName: "adminTest", password: "" })

		expect(mockedPost).toHaveBeenCalled()
		expect(result.meta.requestStatus).toBe("rejected")
		expect(thunk.dispatch).toHaveBeenCalledTimes(2)
		expect(thunk.dispatch).not.toHaveBeenCalledWith(setAuthData(userValue))
		expect(thunk.dispatch).not.toHaveBeenCalledWith(resetForm())
		expect(result.payload).toEqual({ otherError: errorText })
	})
})
