import type { profileDataType, profileStateMap } from "@entities/Profile"
import { ServerErrors } from "@entities/Profile"
import { validateErrors } from "@entities/Profile/lib/helpers/validateErrors/validateErrors"
import { createAsyncThunk } from "@reduxjs/toolkit"
import type { thunkConfigType } from "@store/storeTypes/thunks.type"
import { getEditableProfileCardFormDataSelector } from "../../selectors/getEditableProfileCardFields/getEditableProfileCardFields.selector"

export const postProfileDataThunk = createAsyncThunk<
	profileDataType,
	profileDataType["id"],
	thunkConfigType<profileStateMap["errors"]>
>("profile/postProfileData", async (id, thunkAPI) => {
	const { extra, rejectWithValue, getState } = thunkAPI
	try {
		const formData = getEditableProfileCardFormDataSelector()(getState())

		const errors = validateErrors(formData)

		if (errors.length > 0) {
			return rejectWithValue(errors)
		}

		const data: profileDataType = { ...formData, id }

		const response = await extra.api.put<profileDataType>(`/profile/${id}`, data)

		return response.data
	} catch {
		return rejectWithValue([ServerErrors.SERVER_NOT_FOUND])
	}
})
