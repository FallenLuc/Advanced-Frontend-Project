import { buildCreateSelector } from "@helpers/buildCreateSelector/buildCreateSelector.helper"
import { getEditableProfileCardSelector } from "../getEditableProfileCard/getEditableProfileCard.selector"
import type { editableProfileStateMap } from "../../storeTypes/editableProfileState.map"

export const [useGetEditableProfileCardFormDataSelector, getEditableProfileCardFormDataSelector] =
	buildCreateSelector(
		[getEditableProfileCardSelector],
		(state?: editableProfileStateMap) => state?.formData
	)

export const [useGetEditableProfileCardIsLoadingSelector, getEditableProfileCardIsLoadingSelector] =
	buildCreateSelector(
		[getEditableProfileCardSelector],
		(state?: editableProfileStateMap) => state?.isLoading || false
	)

export const [useGetEditableProfileCardErrorSelector, getEditableProfileCardErrorSelector] =
	buildCreateSelector(
		[getEditableProfileCardSelector],
		(state?: editableProfileStateMap) => state?.errors
	)

export const [useGetEditableProfileCardReadOnlySelector, getEditableProfileCardReadOnlySelector] =
	buildCreateSelector(
		[getEditableProfileCardSelector],
		(state?: editableProfileStateMap) => state?.readOnly || false
	)
