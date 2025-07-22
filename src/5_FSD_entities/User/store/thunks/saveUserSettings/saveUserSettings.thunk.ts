import { createAsyncThunk } from "@reduxjs/toolkit"
import type { thunkConfigType } from "@store/storeTypes/thunks.type"
import { saveUserSettingsRtkq } from "../../../api/user.rtkq"
import type { userSettingsData } from "../../../types/userSettingsData.type"
import { getUserAuthDataSelector } from "../../selectors/getUserFields/getUserFields.selector"

export const saveUserSettingsThunk = createAsyncThunk<
	userSettingsData,
	userSettingsData,
	thunkConfigType<undefined>
>("user/saveUserSettings", async (settings, thunkAPI) => {
	const { dispatch, rejectWithValue, getState } = thunkAPI
	try {
		const authData = getUserAuthDataSelector()(getState())

		if (!authData) {
			return rejectWithValue(undefined)
		}

		const response = await dispatch(
			saveUserSettingsRtkq({ settings: settings, id: authData.id })
		).unwrap()

		return response.settings
	} catch {
		return rejectWithValue(undefined)
	}
})
