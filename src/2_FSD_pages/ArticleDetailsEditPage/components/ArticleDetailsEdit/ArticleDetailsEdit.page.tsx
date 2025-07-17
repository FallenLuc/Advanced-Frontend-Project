import type { articleDetailsDataType } from "@entities/Article"
import { getArticleDataSelector } from "@entities/Article"
import { useAuth } from "@entities/User"
import { classNamesHelp } from "@helpers/classNamesHelp/classNamesHelp"
import { AppLink } from "@ui/AppLink"
import { Page } from "@widgets/Page"
import { memo } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { useParams } from "react-router"
import { Navigate } from "react-router-dom"
import { RoutePaths } from "@config/router/constants/routePath.constant"
import { getRouteArticleDetails } from "@config/router"

type ArticleDetailsEditPageProps = {
	className?: string
	testId?: string
}
const ArticleDetailsEditPage = memo<ArticleDetailsEditPageProps>(props => {
	const { className, testId } = props

	const { t } = useTranslation("article")
	const { id } = useParams<{ id: articleDetailsDataType["id"] }>()
	const data = useSelector(getArticleDataSelector)
	const { authData } = useAuth()

	if (id && authData?.id !== data?.user.id) {
		return <Navigate to={RoutePaths.MAIN} />
	}

	return (
		<Page className={classNamesHelp("", {}, [className])}>
			{id || testId ?
				<>
					<h1 className="page-header">{t("article:articleEdit")}</h1>
					<AppLink to={getRouteArticleDetails(id)}>{t("article:backToArticle")}</AppLink>
				</>
			:	<h1 className="page-header">{t("article:articleCreate")}</h1>}
		</Page>
	)
})

export default ArticleDetailsEditPage
