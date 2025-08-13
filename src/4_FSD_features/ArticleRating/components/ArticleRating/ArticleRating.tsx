import { RatingCard } from "@entities/Rating"
import { useAuth } from "@entities/User"
import { Card } from "@ui/Card"
import { Loader } from "@ui/Loader"
import { HStack } from "@ui/Stack"
import { Text, TextAlign, TextSize, TextTheme } from "@ui/Text"
import { memo, useCallback, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { uid } from "uid"
import { useGetArticleRatingQuery } from "../../api/getArticleRating.rtkq"
import type { postArticleRatingParamsType } from "../../api/postArticleRating.rtkq"
import { usePostArticleRatingMutation } from "../../api/postArticleRating.rtkq"

export type ArticleRatingProps = {
	className?: string
	articleId: string
}
const ArticleRating = memo<ArticleRatingProps>(props => {
	const { className, articleId } = props

	const { t } = useTranslation("article")

	const { authData, isAuth } = useAuth()

	const getArticleRatingParams = useMemo(
		() => ({ articleId, userId: authData?.id || "" }),
		[articleId, authData?.id]
	)

	const { data, error, isLoading } = useGetArticleRatingQuery(getArticleRatingParams)
	const [postArticleRating, response] = usePostArticleRatingMutation()

	const onAcceptHandler = useCallback(
		(rating: number, feedback?: string) => {
			const postArticleRatingParams: postArticleRatingParamsType = {
				id: uid(),
				articleId,
				userId: authData?.id || "",
				rate: rating,
				feedback: feedback
			}
			postArticleRating(postArticleRatingParams)
		},
		[articleId, authData?.id, postArticleRating]
	)

	if (error || response.error) {
		return (
			<Card>
				<Text
					title={t("translation:errorWithRequestUniversal")}
					align={TextAlign.CENTER}
					size={TextSize.BIG}
					theme={TextTheme.ERROR}
				/>
			</Card>
		)
	}

	if (isLoading) {
		return (
			<Card>
				<HStack
					align={"center"}
					justify={"center"}
				>
					<Loader />
				</HStack>
			</Card>
		)
	}

	const rating = data?.[0]

	if (isAuth) {
		return (
			<RatingCard
				isFeedback={true}
				isLockedDefault={!isAuth}
				title={t("article:rateThisArticle")}
				titleFeedback={t("article:howDoYouLikeTheArticle")}
				className={className}
				initialRating={rating?.rate}
				isSendLoading={response.isLoading}
				onAccept={onAcceptHandler}
			/>
		)
	}

	return null
})

export default ArticleRating
