import type { PayloadAction } from "@reduxjs/toolkit"
import type { loginFormStateMap } from "../storeTypes/loginFormState.map"
import { loginByUserNameThunk } from "../thunks/loginByUserName/loginByUserName.thunk"
import { buildSlice } from "@helpers/buildSlice/buildSlice.helper"

const initialState: loginFormStateMap = {
	data: {
		userName: "",
		password: ""
	},
	isLoading: false
}

const loginFormSlice = buildSlice({
	name: "loginForm",
	initialState,
	reducers: {
		setUserName: (
			state: loginFormStateMap,
			action: PayloadAction<loginFormStateMap["data"]["userName"]>
		) => {
			state.data.userName = action.payload
		},
		setPassword: (
			state: loginFormStateMap,
			action: PayloadAction<loginFormStateMap["data"]["password"]>
		) => {
			state.data.password = action.payload
		},
		resetForm: (state: loginFormStateMap) => {
			state.error = undefined
			state.data.password = ""
			state.data.userName = ""
		}
	},
	extraReducers: builder => {
		builder
			.addCase(loginByUserNameThunk.pending, state => {
				state.isLoading = true
				state.error = undefined
			})
			.addCase(loginByUserNameThunk.fulfilled, state => {
				state.isLoading = false
				state.error = undefined
			})
			.addCase(loginByUserNameThunk.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload
			})
	}
})

export const {
	actions: loginFormActions,
	reducer: loginFormReducer,
	useActions: useLoginFormActions
} = loginFormSlice
