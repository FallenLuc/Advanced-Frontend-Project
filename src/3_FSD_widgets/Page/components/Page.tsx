import { classNamesHelp } from "@helpers/classNamesHelp/classNamesHelp"
import { useInfinityScroll } from "@hooks/useInfinityScroll.hook"
import { useInitialEffect } from "@hooks/useInitialEffect.hook"
import { useThrottle } from "@hooks/useThrottle.hook"
import type { PropsWithChildren, UIEvent } from "react"
import { memo, useCallback } from "react"
import { useLocation } from "react-router-dom"
import styles from "./Page.module.scss"
import type { testingProps } from "@customTypes/testing.types"
import { useGetScrollPositionByPathSelector, useScrollPositionActions } from "@features/ScrollSave"

type PageProps = {
	className?: string
	onScrollEnd?: () => void
} & PropsWithChildren &
	testingProps

export const Page = memo<PageProps>(props => {
	const { className, children, onScrollEnd } = props

	const [wrapperRef, triggerRef] = useInfinityScroll(onScrollEnd)

	const pathName = useLocation().pathname

	const { setScrollPosition } = useScrollPositionActions()

	const scrollPosition = useGetScrollPositionByPathSelector(pathName)

	useInitialEffect(
		useCallback(() => {
			wrapperRef.current.scrollTop = scrollPosition
		}, [scrollPosition, wrapperRef])
	)

	const onScrollHandler = useThrottle(
		useCallback(
			(event: UIEvent<HTMLDivElement>) => {
				const scrollPosition = {
					[pathName]: event?.currentTarget.scrollTop
				}

				setScrollPosition(scrollPosition)
			},
			[pathName, setScrollPosition]
		),
		400
	)

	return (
		<section
			data-testid={props["data-testid"]}
			onScroll={onScrollHandler}
			ref={wrapperRef}
			className={classNamesHelp(styles.Page, {}, [className])}
		>
			{children}
			<div ref={triggerRef}></div>
		</section>
	)
})
