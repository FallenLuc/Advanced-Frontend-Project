import { Hello } from "@widgets/Hello"
import { Page } from "@widgets/Page"
import { memo } from "react"
import { useTranslation } from "react-i18next"

const MainPage = memo(() => {
	const { t } = useTranslation("mainPage")

	return (
		<Page data-testid={"mainPage"}>
			<h1 className="page-header">{t("pageTitle")}</h1>
			<Hello>{t("mainPage:helloContent")}</Hello>
		</Page>
	)
})

export default MainPage
