import { classNamesHelp } from "@helpers/classNamesHelp/classNamesHelp"
import { useAppDispatch } from "@hooks/useAppDispatch.hook"
import type { asyncReducersList } from "@hooks/useAsyncReducer.hook"
import { useAsyncReducer } from "@hooks/useAsyncReducer.hook"
import { Button, ButtonTheme } from "@ui/Button"
import { Input } from "@ui/Input"
import { Text, TextTheme } from "@ui/Text"
import type { FormEvent } from "react"
import { memo, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { loginFormReducer, useLoginFormActions } from "../../store/slices/loginForm.slice"
import { loginByUserNameThunk } from "../../store/thunks/loginByUserName/loginByUserName.thunk"

import styles from "./LoginForm.module.scss"
import {
	useGetLoginFormUserNameSelector,
	useGetLoginFormIsLoadingSelector,
	useGetLoginFormErrorSelector,
	useGetLoginFormPasswordSelector
} from "../../store/selectors/getLoginFormFields/getLoginFormFields.selector"

export type LoginFormProps = {
	classNames?: string
	onSuccess?: () => void
}

const asyncReducers: asyncReducersList = {
	loginForm: loginFormReducer
}
const LoginForm = memo<LoginFormProps>(props => {
	const { classNames, onSuccess } = props

	const { t } = useTranslation()

	const dispatch = useAppDispatch()
	const { setUserName, setPassword, resetForm } = useLoginFormActions()

	const userName = useGetLoginFormUserNameSelector()
	const password = useGetLoginFormPasswordSelector()
	const isLoading = useGetLoginFormIsLoadingSelector()
	const error = useGetLoginFormErrorSelector()

	useAsyncReducer(asyncReducers)

	const errorText =
		error?.noUser ? t("translation:errorTextNoUser") : t("translation:errorTextOtherError")

	const onChangeUserName = useCallback(
		(value: string) => {
			setUserName(value)
		},
		[setUserName]
	)

	const onChangePassword = useCallback(
		(value: string) => {
			setPassword(value)
		},
		[setPassword]
	)

	const onLogin = useCallback(
		async (event: FormEvent<HTMLFormElement>) => {
			event.preventDefault()

			if (__PROJECT__ !== "storybook") {
				const result = await dispatch(loginByUserNameThunk({ userName, password }))

				if (result.meta.requestStatus === "fulfilled") {
					onSuccess?.()
					resetForm()
				}
			}
		},
		[dispatch, onSuccess, password, resetForm, userName]
	)

	return (
		<form
			onSubmit={onLogin}
			className={classNamesHelp(styles.LoginForm, {}, [classNames])}
		>
			<Text title={t("translation:nameLoginForm")} />

			{error ?
				<Text
					theme={TextTheme.ERROR}
					text={errorText}
					className={styles.error}
				/>
			:	<></>}
			<Input
				classNamesLabel={styles.label}
				label={t("translation:userName")}
				autoFocus
				onChange={onChangeUserName}
				readOnly={isLoading}
				value={userName}
			/>

			<Input
				classNamesLabel={styles.label}
				label={t("translation:password")}
				onChange={onChangePassword}
				readOnly={isLoading}
				value={password}
			/>
			<Button
				type="submit"
				theme={ButtonTheme.OUTLINE}
				className={styles.submitBtn}
				disabled={isLoading}
			>
				{t("translation:login")}
			</Button>
		</form>
	)
})

export default LoginForm
