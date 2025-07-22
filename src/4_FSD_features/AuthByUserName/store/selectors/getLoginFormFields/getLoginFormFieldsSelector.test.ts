import type { mainStateMap } from "@store/storeTypes/mainState.map"
import {
	getLoginFormDataSelector,
	getLoginFormErrorSelector,
	getLoginFormIsLoadingSelector,
	getLoginFormPasswordSelector,
	getLoginFormUserNameSelector
} from "./getLoginFormFields.selector"

describe("getLoginFormDataSelectorTest", () => {
	test("Getting loginFormData from mainState", () => {
		const state: Partial<mainStateMap> = {
			loginForm: {
				isLoading: true,
				data: {
					userName: "",
					password: ""
				},
				error: {
					noUser: true,
					otherError: ""
				}
			}
		}
		expect(getLoginFormDataSelector()(state as mainStateMap)).toEqual({
			userName: "",
			password: ""
		})
	})

	test("WithOut State", () => {
		const state: Partial<mainStateMap> = {}
		expect(getLoginFormDataSelector()(state as mainStateMap)).toEqual(undefined)
	})
})

describe("getLoginFormErrorSelectorTest", () => {
	test("Getting loginFormError from mainStat", () => {
		const state: Partial<mainStateMap> = {
			loginForm: {
				isLoading: true,
				data: {
					userName: "",
					password: ""
				},
				error: {
					noUser: true,
					otherError: ""
				}
			}
		}
		expect(getLoginFormErrorSelector()(state as mainStateMap)).toEqual({
			noUser: true,
			otherError: ""
		})
	})

	test("WithOut State", () => {
		const state: Partial<mainStateMap> = {}

		expect(getLoginFormErrorSelector()(state as mainStateMap)).toEqual(undefined)
	})
})

describe("getLoginFormIsLoadingSelectorTest", () => {
	test("Getting loginFormIsLoading from mainStat", () => {
		const state: Partial<mainStateMap> = {
			loginForm: {
				isLoading: true,
				data: {
					userName: "",
					password: ""
				},
				error: {
					noUser: true,
					otherError: ""
				}
			}
		}
		expect(getLoginFormIsLoadingSelector()(state as mainStateMap)).toBe(true)
	})

	test("Without State", () => {
		const state: Partial<mainStateMap> = {}

		expect(getLoginFormIsLoadingSelector()(state as mainStateMap)).toBe(false)
	})
})

describe("getLoginFormPasswordSelectorTest", () => {
	test("Getting loginFormDataPassword from mainStat", () => {
		const state: Partial<mainStateMap> = {
			loginForm: {
				isLoading: true,
				data: {
					userName: "",
					password: ""
				},
				error: {
					noUser: true,
					otherError: ""
				}
			}
		}
		expect(getLoginFormPasswordSelector()(state as mainStateMap)).toBe("")
	})

	test("Without state", () => {
		const state: Partial<mainStateMap> = {}

		expect(getLoginFormPasswordSelector()(state as mainStateMap)).toBe("")
	})
})

describe("getLoginFormUserNameSelectorTest", () => {
	test("Getting loginFormDataUserName from mainStat", () => {
		const state: Partial<mainStateMap> = {
			loginForm: {
				isLoading: true,
				data: {
					userName: "",
					password: ""
				},
				error: {
					noUser: true,
					otherError: ""
				}
			}
		}
		expect(getLoginFormUserNameSelector()(state as mainStateMap)).toBe("")
	})

	test("Without State", () => {
		const state: Partial<mainStateMap> = {}

		expect(getLoginFormUserNameSelector()(state as mainStateMap)).toBe("")
	})
})
