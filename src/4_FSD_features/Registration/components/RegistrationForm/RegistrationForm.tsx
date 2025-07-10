import styles from "./RegistrationForm.module.scss"
import type { testingProps } from "@customTypes/testing.types"
import { TypedMemo } from "@sharedProviders/TypedMemo"
import { useTranslation } from "react-i18next"
import { classNamesHelp } from "@helpers/classNamesHelp/classNamesHelp"
import { Button, ButtonTheme } from "@ui/Button"
import type { asyncReducersList } from "@hooks/useAsyncReducer.hook"
import { useAsyncReducer } from "@hooks/useAsyncReducer.hook"
import { registerFormReducer, useRegisterFormReducer } from "../../store/slices/registerForm.slice"
import { useCallback, type FormEvent } from "react"
import { useGetRegisterFormSelector } from "../../store/selectors/getRegisterForm/getRegisterForm.selector"
import { useCreateNewUserMutation } from "../../api/createNewUser.rtkq"
import { Text, TextTheme } from "@ui/Text"
import { Input } from "@ui/Input"
import { useAuth } from "@entities/User"

export type RegistrationFormProps = {
	className?: string
	onSuccess?: () => void
} & testingProps

const asyncReducer: asyncReducersList = {
	registerForm: registerFormReducer
}

const RegistrationForm = TypedMemo((props: RegistrationFormProps) => {
	const { className, onSuccess } = props

	useAsyncReducer(asyncReducer)
	const { setAuthData } = useAuth()

	const { t } = useTranslation()

	const [createUser, { isError, isLoading, data, isSuccess }] = useCreateNewUserMutation()

	const registrationForm = useGetRegisterFormSelector()
	const { updateUserName, updatePassword, resetForm } = useRegisterFormReducer()

	const onSubmit = useCallback(
		async (event: FormEvent<HTMLFormElement>) => {
			event.preventDefault()

			if (registrationForm) {
				await createUser(registrationForm)
			}

			if (__PROJECT__ !== "storybook") {
				if (isSuccess) {
					setAuthData(data)
					onSuccess?.()
				}
			}

			resetForm()
		},
		[createUser, data, isSuccess, onSuccess, registrationForm, resetForm, setAuthData]
	)

	const onChangeUserName = useCallback(
		(value: string) => {
			updateUserName(value)
		},
		[updateUserName]
	)

	const onChangePassword = useCallback(
		(value: string) => {
			updatePassword(value)
		},
		[updatePassword]
	)

	return (
		<form
			onSubmit={onSubmit}
			className={classNamesHelp(styles.RegistrationForm, {}, [className])}
		>
			<Text title={t("translation:nameRegistrationForm")} />

			{isError ?
				<Text
					theme={TextTheme.ERROR}
					text={t("translation:errorRegistration")}
					className={styles.error}
				/>
			:	<></>}
			<Input
				classNamesLabel={styles.label}
				label={t("translation:userName")}
				autoFocus
				onChange={onChangeUserName}
				readOnly={isLoading}
				value={registrationForm?.userName}
			/>

			<Input
				classNamesLabel={styles.label}
				label={t("translation:password")}
				onChange={onChangePassword}
				readOnly={isLoading}
				value={registrationForm?.password}
			/>
			<Button
				type="submit"
				theme={ButtonTheme.OUTLINE}
				className={styles.submitBtn}
				disabled={isLoading}
			>
				{t("translation:registration")}
			</Button>
		</form>
	)
})

export default RegistrationForm
