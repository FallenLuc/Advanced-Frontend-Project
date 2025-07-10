import { classNamesHelp } from "@helpers/classNamesHelp/classNamesHelp"
import { VStack } from "@ui/Stack"
import { Text, TextSize, TextTheme } from "@ui/Text"
import type { ReactNode } from "react"
import { memo, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { useGetNotificationQuery } from "../../api/fetchNotifications.rtkq"
import { NotificationItem } from "../NotificationItem/NotificationItem"
import styles from "./NotificationList.module.scss"
import { useAuth } from "../../../User"

type NotificationListProps = {
	className?: string
}
export const NotificationList = memo<NotificationListProps>(props => {
	const { className } = props

	const { t } = useTranslation()

	const { authData } = useAuth()

	const { isLoading, error, data } = useGetNotificationQuery(
		authData?.id,
		useMemo(
			() => ({
				pollingInterval: 20000
			}),
			[]
		)
	)

	let content: ReactNode = <></>

	if (error) {
		return (
			<Text
				theme={TextTheme.ERROR}
				size={TextSize.BIG}
				title={t("getNotificationError")}
			/>
		)
	}

	if (data) {
		content = data.map(nt => (
			<NotificationItem
				key={nt.id}
				data={nt}
			/>
		))
	}

	if (isLoading) {
		content = (
			<>
				<NotificationItem isLoading={isLoading} />
				<NotificationItem isLoading={isLoading} />
				<NotificationItem isLoading={isLoading} />
			</>
		)
	}

	return (
		<VStack
			gap={"gap8"}
			className={classNamesHelp(styles.NotificationList, {}, [className])}
		>
			{content}
		</VStack>
	)
})
