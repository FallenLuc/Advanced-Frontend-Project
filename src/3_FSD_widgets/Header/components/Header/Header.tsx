import { useAuth } from "@entities/User"
import { LoginModal } from "@features/AuthByUserName"
import { AvatarDropdown } from "@features/AvatarDropdown"
import { NotificationButton } from "@features/NotifiacationButton"
import { classNamesHelp } from "@helpers/classNamesHelp/classNamesHelp"
import { AppLink, AppLinkTheme } from "@ui/AppLink"
import { Button, ButtonTheme } from "@ui/Button"
import { Portal } from "@ui/Portal"
import { HStack } from "@ui/Stack"
import { Text, TextSize } from "@ui/Text"
import { memo, type PropsWithChildren, useCallback, useState } from "react"
import { useTranslation } from "react-i18next"
import styles from "./Header.module.scss"
import { RoutePaths } from "@config/router/constants/routePath.constant"
import { RegistrationModal } from "@features/Registration"

type HeaderProps = {
	classNames?: string
	isMobileTest?: false
} & PropsWithChildren

export const Header = memo<HeaderProps>(props => {
	const { classNames, children, isMobileTest } = props

	const { t } = useTranslation()

	const { authData, isAdmin } = useAuth()

	const [isAuthModal, setIsAuthModal] = useState(false)
	const [isRegisterModal, setIsRegisterModal] = useState(false)

	const loginModalShow = useCallback(() => {
		setIsAuthModal(true)
	}, [])
	const loginModalClose = useCallback(() => {
		setIsAuthModal(false)
	}, [])

	const registerModalShow = useCallback(() => {
		setIsRegisterModal(true)
	}, [])
	const registerModalClose = useCallback(() => {
		setIsRegisterModal(false)
	}, [])

	const loginWidget = (
		<HStack
			widthMax={false}
			gap={"gap16"}
		>
			<Button
				theme={ButtonTheme.CLEAR}
				inverted
				onClick={registerModalShow}
			>
				{t("translation:registration")}
			</Button>

			<Button
				theme={ButtonTheme.CLEAR}
				inverted
				onClick={loginModalShow}
			>
				{t("translation:login")}
			</Button>
		</HStack>
	)

	const btnLogOut = (
		<HStack
			align={"center"}
			gap={"gap16"}
			widthMax={false}
		>
			<NotificationButton
				className={styles.btnNotification}
				isMobileTest={isMobileTest}
			/>
			<AvatarDropdown />
		</HStack>
	)

	return (
		<HStack
			role={"heading"}
			align={"center"}
			className={classNamesHelp(styles.Header, {}, [classNames])}
		>
			{children}
			<HStack
				align={"center"}
				justify={"spaceBetween"}
			>
				<HStack
					align={"center"}
					gap={"gap16"}
				>
					<Text
						title={t("translation:welcomeToHell")}
						size={TextSize.BIG}
						inverted={true}
					/>

					{isAdmin ?
						<AppLink
							theme={AppLinkTheme.OUTLINE}
							className={styles.createLink}
							to={RoutePaths.ARTICLE_DETAILS_CREATE}
							inverted={true}
						>
							{t("translation:createArticle")}
						</AppLink>
					:	null}
				</HStack>
				{authData ? btnLogOut : loginWidget}
			</HStack>
			<Portal>
				<LoginModal
					onClose={loginModalClose}
					isOpen={isAuthModal}
					lazy
				/>
			</Portal>
			<Portal>
				<RegistrationModal
					onClose={registerModalClose}
					isOpen={isRegisterModal}
					lazy
				/>
			</Portal>
		</HStack>
	)
})
