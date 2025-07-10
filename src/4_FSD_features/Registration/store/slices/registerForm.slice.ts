import type { PayloadAction } from "@reduxjs/toolkit"
import type { registerFormStateMap } from "../storeTypes/registerFormState.map"
import { buildSlice } from "@helpers/buildSlice/buildSlice.helper"

const initialState: registerFormStateMap = { userName: "", password: "" }

const registerFormSlice = buildSlice({
	name: "registerForm",
	initialState,
	reducers: {
		updateUserName: (state, action: PayloadAction<string>) => {
			state.userName = action.payload
		},
		updatePassword: (state, action: PayloadAction<string>) => {
			state.password = action.payload
		},
		resetForm: state => {
			state.userName = ""
			state.password = ""
		}
	}
})

export const {
	actions: registerFormActions,
	reducer: registerFormReducer,
	useActions: useRegisterFormReducer
} = registerFormSlice
