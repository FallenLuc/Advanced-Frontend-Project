import { describe, expect, test } from "@jest/globals"
import type { registerFormStateMap } from "../storeTypes/registerFormState.map"
import { registerFormReducer, registerFormActions } from "./registerForm.slice"

describe("registerFormSliceTest", () => {
	test("updateUserName", () => {
		const state: registerFormStateMap = {
			userName: "",
			password: ""
		}
		const action = registerFormActions.updateUserName("Alice")

		const newState = registerFormReducer(state, action)

		expect(newState).toEqual({ userName: "Alice", password: "" })
	})

	test("updatePassword", () => {
		const state: registerFormStateMap = {
			userName: "Alice",
			password: ""
		}
		const action = registerFormActions.updatePassword("123")

		const newState = registerFormReducer(state, action)

		expect(newState).toEqual({ userName: "Alice", password: "123" })
	})

	test("resetForm", () => {
		const state: registerFormStateMap = {
			userName: "Alice",
			password: "123"
		}
		const action = registerFormActions.resetForm()

		const newState = registerFormReducer(state, action)

		expect(newState).toEqual({ userName: "", password: "" })
	})
})
