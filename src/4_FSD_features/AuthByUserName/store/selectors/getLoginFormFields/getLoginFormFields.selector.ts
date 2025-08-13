import { getLoginFormSelector } from "../getLoginForm/getLoginForm.selector"
import type { loginFormStateMap } from "../../storeTypes/loginFormState.map"
import { buildCreateSelector } from "@helpers/buildCreateSelector/buildCreateSelector.helper"
import type { loginByUserNameDataType } from "../../../types/loginByUserNameData.type"

export const [useGetLoginFormDataSelector, getLoginFormDataSelector] = buildCreateSelector(
	[getLoginFormSelector],
	(state?: loginFormStateMap) => state?.data
)

export const [useGetLoginFormErrorSelector, getLoginFormErrorSelector] = buildCreateSelector(
	[getLoginFormSelector],
	(state?: loginFormStateMap) => state?.error
)

export const [useGetLoginFormIsLoadingSelector, getLoginFormIsLoadingSelector] =
	buildCreateSelector(
		[getLoginFormSelector],
		(state?: loginFormStateMap) => state?.isLoading || false
	)

export const [useGetLoginFormPasswordSelector, getLoginFormPasswordSelector] = buildCreateSelector(
	[getLoginFormDataSelector()],
	(state?: loginByUserNameDataType) => state?.password || ""
)

export const [useGetLoginFormUserNameSelector, getLoginFormUserNameSelector] = buildCreateSelector(
	[getLoginFormDataSelector()],
	(state?: loginByUserNameDataType) => state?.userName || ""
)
