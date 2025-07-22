import { CountrySelect } from "@entities/Country"
import { CurrencySelect } from "@entities/Currency"
import type { profileDataType } from "@entities/Profile"
import { fetchProfileDataThunk, ProfileCard } from "@entities/Profile"
import { useAuth } from "@entities/User"
import type { asyncReducersList } from "@hooks/useAsyncReducer.hook"
import { useAsyncReducer } from "@hooks/useAsyncReducer.hook"
import { memo, useCallback, useEffect, useMemo } from "react"
import {
	editableProfileCardReducer,
	useEditableProfileCardActions
} from "../../store/slices/editableProfileCard.slice"
import { CancelButton } from "../CancelButton/CancelButton"
import { EditButton } from "../EditButton/EditButton"
import { ReFetchButton } from "../ReFetchButton/ReFetchButton"
import { SaveButton } from "../SaveButton/SaveButton"
import {
	useGetEditableProfileCardFormDataSelector,
	useGetEditableProfileCardIsLoadingSelector,
	useGetEditableProfileCardErrorSelector,
	useGetEditableProfileCardReadOnlySelector
} from "../../store/selectors/getEditableProfileCardFields/getEditableProfileCardFields.selector"
import { useAppDispatch } from "@hooks/useAppDispatch.hook"

type EditableProfileCardProps = {
	className?: string
	id: profileDataType["id"]
}

const initialReducers: asyncReducersList = {
	editableProfileCard: editableProfileCardReducer
}

export const EditableProfileCard = memo<EditableProfileCardProps>(props => {
	const { className, id } = props

	useAsyncReducer(initialReducers)

	const { authData } = useAuth()

	const dispatch = useAppDispatch()

	const formData = useGetEditableProfileCardFormDataSelector()
	const isLoading = useGetEditableProfileCardIsLoadingSelector()
	const errors = useGetEditableProfileCardErrorSelector()
	const readOnly = useGetEditableProfileCardReadOnlySelector()

	useEffect(() => {
		dispatch(fetchProfileDataThunk(id))
	}, [dispatch, id])

	const { updateForm } = useEditableProfileCardActions()

	const onChangeUserNameHandler = useCallback(
		(value: profileDataType["userName"]) => {
			updateForm({ userName: value })
		},
		[updateForm]
	)

	const onChangeAvatarHandler = useCallback(
		(value: profileDataType["avatar"]) => {
			updateForm({ avatar: value })
		},
		[updateForm]
	)

	const onChangeFirstNameHandler = useCallback(
		(value: profileDataType["firstName"]) => {
			updateForm({ firstName: value })
		},
		[updateForm]
	)

	const onChangeLastNameHandler = useCallback(
		(value: profileDataType["lastName"]) => {
			updateForm({ lastName: value })
		},
		[updateForm]
	)

	const onChangeAgeHandler = useCallback(
		(value: string | number) => {
			if (!/\D/.test(value as string)) {
				updateForm({ age: Number(value) })
			}
		},
		[updateForm]
	)
	const onChangeCityHandler = useCallback(
		(value: profileDataType["city"]) => {
			updateForm({ city: value })
		},
		[updateForm]
	)

	const onChangeCurrencyHandler = useCallback(
		(value: profileDataType["currency"]) => {
			updateForm({ currency: value })
		},
		[updateForm]
	)

	const onChangeCountryHandler = useCallback(
		(value: profileDataType["country"]) => {
			updateForm({ country: value })
		},
		[updateForm]
	)

	const editButton = useMemo(() => <EditButton />, [])
	const saveButton = useMemo(() => <SaveButton id={id} />, [id])
	const cancelButton = useMemo(() => <CancelButton />, [])
	const reloadButton = useMemo(() => <ReFetchButton id={id} />, [id])
	const selectCurrency = useMemo(
		() => (
			<CurrencySelect
				data-testid={"EditableProfileCard.CurrencySelect"}
				onChange={onChangeCurrencyHandler}
				disabled={readOnly}
				value={formData?.currency}
			/>
		),
		[formData?.currency, onChangeCurrencyHandler, readOnly]
	)
	const selectCountry = useMemo(
		() => (
			<CountrySelect
				data-testid={"EditableProfileCard.CountrySelect"}
				onChange={onChangeCountryHandler}
				disabled={readOnly}
				value={formData?.country}
			/>
		),
		[formData?.country, onChangeCountryHandler, readOnly]
	)
	return (
		<ProfileCard
			data-testid={"EditableProfileCard"}
			classNames={className}
			editButton={editButton}
			saveButton={saveButton}
			cancelButton={cancelButton}
			reloadButton={reloadButton}
			selectCurrency={selectCurrency}
			selectCountry={selectCountry}
			isLoading={isLoading}
			editAllow={authData?.id === id}
			errors={errors}
			readOnly={readOnly}
			data={formData}
			onChangeUserName={onChangeUserNameHandler}
			onChangeAvatar={onChangeAvatarHandler}
			onChangeFirstName={onChangeFirstNameHandler}
			onChangeLastName={onChangeLastNameHandler}
			onChangeCity={onChangeCityHandler}
			onChangeAge={onChangeAgeHandler}
		/>
	)
})
