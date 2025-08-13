import { mappingErrors } from "@entities/Profile"
import { classNamesHelp } from "@helpers/classNamesHelp/classNamesHelp"
import { Button, ButtonTheme } from "@ui/Button"
import { memo, useCallback, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { useEditableProfileCardActions } from "../../store/slices/editableProfileCard.slice"

import styles from "./EditButton.module.scss"
import {
	useGetEditableProfileCardErrorSelector,
	useGetEditableProfileCardIsLoadingSelector
} from "../../store/selectors/getEditableProfileCardFields/getEditableProfileCardFields.selector"

type EditButtonProps = {
	classNames?: string
}
export const EditButton = memo<EditButtonProps>(props => {
	const { classNames } = props
	const { t } = useTranslation("profile")

	const { setReadOnly } = useEditableProfileCardActions()

	const errors = useGetEditableProfileCardErrorSelector()
	const isLoading = useGetEditableProfileCardIsLoadingSelector()

	const { isServerErrors } = useMemo(() => mappingErrors(errors), [errors])

	const setReadonlyHandler = useCallback(() => {
		setReadOnly(false)
	}, [setReadOnly])

	return (
		<Button
			data-testid={"EditableProfileCard.EditButton"}
			className={classNamesHelp(styles.EditButton, {}, [classNames])}
			theme={ButtonTheme.OUTLINE}
			onClick={setReadonlyHandler}
			disabled={isServerErrors || isLoading ? true : false}
		>
			{t("profile:edit")}
		</Button>
	)
})
