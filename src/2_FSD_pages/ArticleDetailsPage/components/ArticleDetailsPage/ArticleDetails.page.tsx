import type { articleDetailsDataType } from "@entities/Article"
import { ArticleDetails, getArticleDataSelector } from "@entities/Article"
import { useAuth } from "@entities/User"
import { ArticleRating } from "@features/ArticleRating"
import { ArticlesRecommendation } from "@features/ArticlesRecommendation"
import { classNamesHelp } from "@helpers/classNamesHelp/classNamesHelp"
import { AppLink, AppLinkTheme } from "@ui/AppLink"
import { VStack } from "@ui/Stack"
import { Text, TextAlign, TextSize, TextTheme } from "@ui/Text"
import { CommentsArticleDetails } from "@widgets/CommentsArticleDetails"
import { Page } from "@widgets/Page"
import type { ReactNode } from "react"
import { memo } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { useParams } from "react-router"
import styles from "./ArticleDetailsPage.module.scss"
import { getRouteArticleDetailsEdit } from "@config/router"
import { toggleFeatureFlags } from "@config/featureFlags"
import { ToggleComponentFeatureFlags } from "@config/featureFlags/helpers/ToggleComponentFeatureFlags/ToggleComponentFeatureComponents"

type ArticleDetailsPageProps = {
	className?: string
	testId?: articleDetailsDataType["id"]
}
const ArticleDetailsPage = memo<ArticleDetailsPageProps>(props => {
	const { className, testId = "1" } = props

	const { t } = useTranslation("article")
	const { id } = useParams<{ id: articleDetailsDataType["id"] }>()
	const { authData } = useAuth()
	const articleData = useSelector(getArticleDataSelector)

	let element: ReactNode

	const toArticleEdit = getRouteArticleDetailsEdit(id)

	const rating = toggleFeatureFlags({
		name: "isFeatureRating",
		on: () => <ArticleRating articleId={id || testId} />,
		off: () => <></>
	})

	if (!id && __PROJECT__ !== "storybook") {
		element = (
			<Text
				title={t("article:articleNotFound")}
				theme={TextTheme.ERROR}
				align={TextAlign.CENTER}
				size={TextSize.BIG}
			/>
		)
	} else if (id || testId) {
		element = (
			<VStack gap={"gap24"}>
				{authData?.id === articleData?.user.id && authData?.id !== undefined ?
					<AppLink
						className={styles.header}
						to={toArticleEdit}
						theme={AppLinkTheme.OUTLINE}
					>
						{t("article:edit")}
					</AppLink>
				:	null}
				<ArticleDetails id={id || testId} />
				{rating}
				<ArticlesRecommendation />
				<ToggleComponentFeatureFlags
					name={"isFeatureComments"}
					on={<CommentsArticleDetails articleId={id || testId} />}
				/>
			</VStack>
		)
	} else {
		element = <></>
	}

	return <Page className={classNamesHelp("", {}, [className])}>{element}</Page>
})

export default ArticleDetailsPage
