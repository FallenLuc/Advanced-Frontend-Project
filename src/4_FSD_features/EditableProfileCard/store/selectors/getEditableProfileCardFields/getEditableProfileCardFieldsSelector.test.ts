import type { DeepPartial } from "@customTypes/global.types"
import type { mainStateMap } from "@store/storeTypes/mainState.map"
import { ServerErrors } from "@entities/Profile"
import {
	getEditableProfileCardErrorSelector,
	getEditableProfileCardFormDataSelector,
	getEditableProfileCardIsLoadingSelector,
	getEditableProfileCardReadOnlySelector
} from "./getEditableProfileCardFields.selector"

describe("getEditableProfileCardErrorSelector", () => {
	test("get state", () => {
		const state: DeepPartial<mainStateMap> = {
			editableProfileCard: {
				errors: [ServerErrors.SERVER_NOT_FOUND]
			}
		}
		expect(getEditableProfileCardErrorSelector()(state as mainStateMap)).toEqual([
			ServerErrors.SERVER_NOT_FOUND
		])
	})

	test("get withOut state", () => {
		const state: DeepPartial<mainStateMap> = {}
		expect(getEditableProfileCardErrorSelector()(state as mainStateMap)).toEqual(undefined)
	})
})

describe("getEditableProfileCardFormDataSelector", () => {
	test("get state", () => {
		const state: DeepPartial<mainStateMap> = {
			editableProfileCard: {
				formData: {
					userName: "Test"
				}
			}
		}
		expect(getEditableProfileCardFormDataSelector()(state as mainStateMap)).toEqual({
			userName: "Test"
		})
	})

	test("get withOut state", () => {
		const state: DeepPartial<mainStateMap> = {}
		expect(getEditableProfileCardFormDataSelector()(state as mainStateMap)).toEqual(undefined)
	})
})

describe("getEditableProfileCardIsLoadingSelector", () => {
	test("get state", () => {
		const state: DeepPartial<mainStateMap> = {
			editableProfileCard: {
				isLoading: true
			}
		}
		expect(getEditableProfileCardIsLoadingSelector()(state as mainStateMap)).toBe(true)
	})

	test("get withOut state", () => {
		const state: DeepPartial<mainStateMap> = {}
		expect(getEditableProfileCardIsLoadingSelector()(state as mainStateMap)).toBe(false)
	})
})

describe("getEditableProfileCardIsLoadingSelector", () => {
	test("get state", () => {
		const state: DeepPartial<mainStateMap> = {
			editableProfileCard: {
				readOnly: true
			}
		}
		expect(getEditableProfileCardReadOnlySelector()(state as mainStateMap)).toBe(true)
	})

	test("get withOut state", () => {
		const state: DeepPartial<mainStateMap> = {}
		expect(getEditableProfileCardReadOnlySelector()(state as mainStateMap)).toBe(false)
	})
})
