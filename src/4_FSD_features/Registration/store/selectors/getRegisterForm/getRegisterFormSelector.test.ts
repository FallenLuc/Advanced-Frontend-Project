import { describe, expect, test } from "@jest/globals"
import { getRegisterFormSelector } from "./getRegisterForm.selector"
import type { mainStateMap } from "@store/storeTypes/mainState.map"
import type { DeepPartial } from "@customTypes/global.types"

describe("getRegisterFormSelector", () => {
	test("get state", () => {
		const state: DeepPartial<mainStateMap> = {
			registerForm: {
				password: "123",
				userName: "Alic"
			}
		}
		expect(getRegisterFormSelector(state as mainStateMap)).toEqual({
			password: "123",
			userName: "Alic"
		})
	})

	test("get withOut state", () => {
		const state: DeepPartial<mainStateMap> = {}
		expect(getRegisterFormSelector(state as mainStateMap)).toEqual(undefined)
	})
})
