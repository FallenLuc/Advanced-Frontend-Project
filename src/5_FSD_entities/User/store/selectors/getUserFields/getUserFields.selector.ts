import { buildCreateSelector } from "@helpers/buildCreateSelector/buildCreateSelector.helper"
import { getUserSelector } from "../getUser/getUser.selector"
import type { userStateMap } from "../../storeTypes/userState.map"
import type { userSettingsData } from "../../../types/userSettingsData.type"

export const [useGetUserAuthDataSelector, getUserAuthDataSelector] = buildCreateSelector(
	[getUserSelector],
	(state: userStateMap) => state?.authData
)

export const [useGetUserInitAuthDataSelector, getUserInitAuthDataSelector] = buildCreateSelector(
	[getUserSelector],
	(state: userStateMap) => state?._initAuthData
)

export const [useGetUserRolesSelector, getUserRolesSelector] = buildCreateSelector(
	[getUserSelector],
	(state: userStateMap) => state?.authData?.roles
)

export const [useGetUserSettings, getUserSettingsSelector] = buildCreateSelector(
	[getUserSelector],
	(state: userStateMap) => state?.authData?.settings
)

export const [useGetUserSettingByKey, getUserSettingByKeySelector] = buildCreateSelector(
	[getUserSelector],
	(state: userStateMap, key: keyof userSettingsData) => state?.authData?.settings?.[key]
)
