import { classNamesHelp } from "@helpers/classNamesHelp/classNamesHelp"
import { Card } from "@ui/Card"
import { RatingStars } from "@ui/RatingStars"
import { VStack } from "@ui/Stack"
import { Text, TextSize } from "@ui/Text"
import { memo, useCallback, useState } from "react"
import { useTranslation } from "react-i18next"
import { FeedbackModal } from "../FeedbackModal/FeedbackModal"
import styles from "./RatingCard.module.scss"

type RatingCardProps = {
	className?: string
	title?: string
	initialRating?: number
	isFeedback: boolean
	titleFeedback?: string
	isSendLoading?: boolean
	isLockedDefault?: boolean
	onAccept?: (rating: number, feedback?: string) => void
	onCancel?: () => void
}
export const RatingCard = memo<RatingCardProps>(props => {
	const {
		className,
		title,
		initialRating,
		onAccept,
		onCancel,
		isFeedback,
		titleFeedback,
		isLockedDefault = false,
		isSendLoading = false
	} = props

	const [isOpenFeedback, setIsOpenFeedback] = useState(false)
	const [selectedRating, setSelectedRating] = useState(initialRating || 0)
	const [isLocked, setIsLocked] = useState(Boolean(selectedRating))

	const { t } = useTranslation()

	const onSelectHandler = useCallback(
		(rating: number) => {
			if (isFeedback) {
				setIsOpenFeedback(true)
				setSelectedRating(rating)
			} else {
				setSelectedRating(rating)
				onAccept?.(rating)
			}
		},
		[isFeedback, onAccept]
	)

	const onAcceptHandler = useCallback(
		(rating: number, feedback: string) => {
			setIsOpenFeedback(false)
			setIsLocked(true)
			onAccept?.(rating, feedback)
		},
		[onAccept]
	)

	const onCancelHandler = useCallback(() => {
		setIsOpenFeedback(false)
		setSelectedRating(initialRating || 0)
		onCancel?.()
	}, [initialRating, onCancel])

	return (
		<Card>
			<VStack
				gap={"gap16"}
				align={"center"}
				className={classNamesHelp("", {}, [className])}
			>
				<Text
					title={selectedRating ? t("translation:thanksForYouRate") : title}
					size={TextSize.BIG}
				/>
				<RatingStars
					className={styles.ratingStars}
					isLocked={isLocked || isLockedDefault}
					rating={selectedRating}
					onChangeRating={onSelectHandler}
				/>
				<FeedbackModal
					isLoading={isSendLoading}
					rating={selectedRating}
					isOpen={isOpenFeedback}
					titleFeedback={titleFeedback}
					onAccept={onAcceptHandler}
					onCancel={onCancelHandler}
				/>
			</VStack>
		</Card>
	)
})
