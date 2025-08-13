import { useAuth } from "@entities/User"
import { Avatar, AvatarSize, AvatarTheme } from "@ui/Avatar"
import { Dropdown } from "@ui/Dropdown"
import { memo, useCallback, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { RoutePaths } from "@config/router/constants/routePath.constant"
import { getRouteProfile } from "@config/router"

type AvatarDropdownProps = {
	className?: string
}
export const AvatarDropdown = memo<AvatarDropdownProps>(props => {
	const { className } = props

	const { t } = useTranslation()

	const { logOut, authData, isAdmin, isManager } = useAuth()

	const logOutHandler = useCallback(() => {
		if (__PROJECT__ !== "storybook") {
			logOut()
		}
	}, [logOut])

	const profileAvatar = useMemo(
		() => (
			<Avatar
				theme={AvatarTheme.CIRCLE}
				size={AvatarSize.SMALL}
				src={authData?.avatar || ""}
				inverted={true}
				alt={t("translation:avatar")}
			/>
		),
		[authData?.avatar, t]
	)

	const itemsDropDown = useMemo(
		() => [
			...(isManager || isAdmin ?
				[
					{
						content: t("translation:admin"),
						href: `${RoutePaths.ADMIN_PANEL}`
					}
				]
			:	[]),
			{
				content: t("translation:profile"),
				href: getRouteProfile(authData?.id)
			},
			{
				content: t("translation:logout"),
				onClick: logOutHandler
			}
		],
		[authData?.id, isAdmin, isManager, logOutHandler, t]
	)

	return (
		<Dropdown
			triggerNode={profileAvatar}
			items={itemsDropDown}
			className={className}
		/>
	)
})
