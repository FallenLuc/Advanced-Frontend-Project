import { classNamesHelp } from "@helpers/classNamesHelp/classNamesHelp"
import type { AppLinkProps } from "@ui/AppLink"
import { AppLink } from "@ui/AppLink"
import { HStack } from "@ui/Stack"
import type { FC, SVGProps } from "react"
import { memo } from "react"
import { useTranslation } from "react-i18next"
import styles from "./ApplinkWithIcon.module.scss"

type AppLinkWithIconProps = {
	classNames?: string
	collapsed: boolean
	name: string
	Icon: FC<SVGProps<SVGSVGElement>>
} & Omit<AppLinkProps, "className">
export const AppLinkWithIcon = memo<AppLinkWithIconProps>(props => {
	const { classNames, collapsed, to, theme, Icon, name, inverted } = props

	const { t } = useTranslation()

	return (
		<AppLink
			to={to}
			theme={theme}
			inverted={inverted}
			className={classNamesHelp("", {}, [classNames])}
		>
			<HStack
				justify={"center"}
				gap={"gap16"}
				align={"center"}
			>
				<Icon className={collapsed ? styles.linkIconCollapsed : styles.linkIcon} />
				{collapsed ?
					<></>
				:	t(name.toLowerCase())}
			</HStack>
		</AppLink>
	)
})
