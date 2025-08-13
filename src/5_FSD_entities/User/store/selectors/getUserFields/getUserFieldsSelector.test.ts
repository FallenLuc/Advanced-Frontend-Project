import type { mainStateMap } from "@store/storeTypes/mainState.map"
import { userDataMock } from "../../../lib/mocks/userData.mock"
import { UserRoles } from "../../../constants/userRoles.constant"
import {
	getUserAuthDataSelector,
	getUserInitAuthDataSelector,
	getUserSettingsSelector,
	getUserSettingByKeySelector,
	getUserRolesSelector
} from "./getUserFields.selector"
import type { DeepPartial } from "@customTypes/global.types"
import { THEMES } from "@sharedProviders/ThemeProvider"

describe("getUserAuthDataSelectorTest", () => {
	test("with state", () => {
		const state: Partial<mainStateMap> = {
			user: {
				authData: userDataMock({
					userName: "123",
					id: "1",
					roles: [UserRoles.ADMIN]
				}),
				_initAuthData: false
			}
		}
		expect(getUserAuthDataSelector()(state as mainStateMap)).toEqual(
			userDataMock({
				userName: "123",
				id: "1",
				roles: [UserRoles.ADMIN]
			})
		)
	})

	test("withOut state", () => {
		const state: Partial<mainStateMap> = {}
		expect(getUserAuthDataSelector()(state as mainStateMap)).toEqual(undefined)
	})
})

describe("getUserInitAuthDataSelectorTest", () => {
	test("with state", () => {
		const state: Partial<mainStateMap> = {
			user: {
				_initAuthData: false
			}
		}
		expect(getUserInitAuthDataSelector()(state as mainStateMap)).toBe(false)
	})

	test("withOut state", () => {
		const state: Partial<mainStateMap> = {}
		expect(getUserInitAuthDataSelector()(state as mainStateMap)).toEqual(undefined)
	})
})

describe(getUserRolesSelector, () => {
	test("get state", () => {
		const state: DeepPartial<mainStateMap> = {
			user: { authData: { roles: [UserRoles.ADMIN] } }
		}
		expect(getUserRolesSelector()(state as mainStateMap)).toEqual([UserRoles.ADMIN])
	})

	test("get withOut state", () => {
		const state: DeepPartial<mainStateMap> = {}
		expect(getUserRolesSelector()(state as mainStateMap)).toEqual(undefined)
	})
})

describe("getUserSettingsSelector", () => {
	test("get state", () => {
		const state: DeepPartial<mainStateMap> = {
			user: {
				authData: {
					settings: {
						theme: THEMES.GREEN
					}
				}
			}
		}
		expect(getUserSettingsSelector()(state as mainStateMap)).toEqual({
			theme: THEMES.GREEN
		})
	})

	test("get withOut state", () => {
		const state: DeepPartial<mainStateMap> = {}
		expect(getUserSettingsSelector()(state as mainStateMap)).toEqual(undefined)
	})
})

describe("getUserSettingByKeySelector", () => {
	test("get state", () => {
		const state: DeepPartial<mainStateMap> = {
			user: {
				authData: {
					settings: {
						theme: THEMES.GREEN
					}
				}
			}
		}
		expect(getUserSettingByKeySelector("theme")(state as mainStateMap)).toBe(THEMES.GREEN)
	})

	test("get withOut state", () => {
		const state: DeepPartial<mainStateMap> = {}
		expect(getUserSettingByKeySelector("theme")(state as mainStateMap)).toBe(undefined)
	})
})
