import { useCallback } from "react"
import { UserRoles } from "../../constants/userRoles.constant"
import { useUserActions } from "../../store/slices/user.slice"
import { fetchUserDataThunk } from "../../store/thunks/fetchUserData/fetchUserData.thunk"

import { useAppDispatch } from "@hooks/useAppDispatch.hook"
import type { THEMES } from "@sharedProviders/ThemeProvider"
import { saveUserSettingsThunk } from "../../store/thunks/saveUserSettings/saveUserSettings.thunk"
import {
	useGetUserAuthDataSelector,
	useGetUserInitAuthDataSelector,
	useGetUserRolesSelector,
	useGetUserSettingByKey,
	useGetUserSettings
} from "../../store/selectors/getUserFields/getUserFields.selector"

export const useAuth = () => {
	const authData = useGetUserAuthDataSelector()
	const _isInitAuthData = useGetUserInitAuthDataSelector()
	const userRoles = useGetUserRolesSelector()
	const userTheme = useGetUserSettingByKey("theme")
	const userSettings = useGetUserSettings()
	const { logOut, setAuthData } = useUserActions()
	const fetchUserData = fetchUserDataThunk

	const dispatch = useAppDispatch()

	const saveUserTheme = useCallback(
		(theme: THEMES) => {
			dispatch(saveUserSettingsThunk({ ...userSettings, theme }))
		},
		[dispatch, userSettings]
	)

	const isAdmin = userRoles?.includes(UserRoles.ADMIN)
	const isManager = userRoles?.includes(UserRoles.MANAGER)

	const isAuth = authData ? true : false

	return {
		isAuth,
		_isInitAuthData,
		authData,
		userTheme,
		saveUserTheme,
		logOut,
		setAuthData,
		fetchUserData,
		isAdmin,
		isManager,
		userRoles
	}
}
