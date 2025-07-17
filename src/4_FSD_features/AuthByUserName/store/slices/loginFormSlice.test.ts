import type { DeepPartial } from "@customTypes/global.types"
import { UserRoles, userDataMock } from "@entities/User"
import { loginFormActions, loginFormReducer } from "./loginForm.slice"
import { describe, expect, test } from "@jest/globals"
import type { loginFormStateMap } from "../storeTypes/loginFormState.map"
import { loginByUserNameThunk } from "../thunks/loginByUserName/loginByUserName.thunk"

describe("loginFormSliceTest staticReducer", () => {
	test("Action SetUserName", () => {
		const state: DeepPartial<loginFormStateMap> = {
			data: {
				userName: ""
			}
		}

		const resultState = loginFormReducer(
			state as loginFormStateMap,
			loginFormActions.setUserName("admin")
		)

		expect(resultState).toEqual({
			data: {
				userName: "admin"
			}
		})
	})

	test("Action setPassword", () => {
		const state: DeepPartial<loginFormStateMap> = {
			data: {
				password: ""
			}
		}

		const resultState = loginFormReducer(
			state as loginFormStateMap,
			loginFormActions.setPassword("123")
		)

		expect(resultState).toEqual({
			data: {
				password: "123"
			}
		})
	})

	test("Action resetForm", () => {
		const state: DeepPartial<loginFormStateMap> = {
			data: {
				userName: "admin",
				password: "123"
			},
			error: {
				noUser: true
			}
		}

		const resultState = loginFormReducer(
			state as loginFormStateMap,
			loginFormActions.resetForm()
		)

		expect(resultState).toEqual({
			data: {
				password: "",
				userName: ""
			},
			error: undefined
		})
	})
})

describe("loginFormSliceTest extraReducer", () => {
	test("Action loginByUserNameThunk Pending", () => {
		const state: DeepPartial<loginFormStateMap> = {
			isLoading: false,
			error: { noUser: true }
		}

		const resultState = loginFormReducer(
			state as loginFormStateMap,
			loginByUserNameThunk.pending("", { userName: "", password: "" })
		)

		expect(resultState).toEqual({
			isLoading: true,
			error: undefined
		})
	})

	test("Action loginByUserNameThunk fulFilled", () => {
		const state: DeepPartial<loginFormStateMap> = {
			isLoading: true,
			error: { noUser: true }
		}

		const resultState = loginFormReducer(
			state as loginFormStateMap,
			loginByUserNameThunk.fulfilled(
				userDataMock({ userName: "", id: "", roles: [UserRoles.ADMIN] }),
				"",
				{
					userName: "",
					password: ""
				}
			)
		)

		expect(resultState).toEqual({
			isLoading: false,
			error: undefined
		})
	})

	test("Action loginByUserNameThunk rejected", () => {
		const state: DeepPartial<loginFormStateMap> = {
			isLoading: true,
			error: undefined
		}

		const resultState = loginFormReducer(
			state as loginFormStateMap,
			loginByUserNameThunk.rejected(
				{ name: "", message: "" },
				"",
				{
					userName: "",
					password: ""
				},
				{ noUser: true, otherError: "Undefined Error" }
			)
		)

		expect(resultState).toEqual({
			isLoading: false,
			error: { noUser: true, otherError: "Undefined Error" }
		})
	})
})
