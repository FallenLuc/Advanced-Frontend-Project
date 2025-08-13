import { DetailedView, PlateView } from "@assets/index"
import { ArticleItemViews } from "@entities/Article"
import { classNamesHelp } from "@helpers/classNamesHelp/classNamesHelp"
import { Button, ButtonTheme } from "@ui/Button"
import { memo } from "react"
import { useGetArticlesListViewSelector } from "../store/selectors/getArticlesListView/getArticlesListView.selector"
import styles from "./ChangeViewArticlesList.module.scss"

type ChangeViewArticlesListProps = {
	onChangeView: (view: ArticleItemViews) => void
	className?: string
}
export const ChangeViewArticlesList = memo<ChangeViewArticlesListProps>(props => {
	const { className, onChangeView } = props

	const view = useGetArticlesListViewSelector()

	const onChangeViewHandler = (newView: ArticleItemViews) => () => {
		onChangeView(newView)
	}

	return (
		<div className={classNamesHelp(styles.ChangeViewArticlesList, {}, [className])}>
			<Button
				theme={ButtonTheme.CLEAR}
				className={classNamesHelp(
					styles.button,
					{ [styles.active]: view === ArticleItemViews.PlATES },
					[]
				)}
				onClick={onChangeViewHandler(ArticleItemViews.PlATES)}
			>
				<PlateView />
			</Button>
			<Button
				theme={ButtonTheme.CLEAR}
				className={classNamesHelp(
					styles.button,
					{ [styles.active]: view === ArticleItemViews.DETAILED },
					[]
				)}
				onClick={onChangeViewHandler(ArticleItemViews.DETAILED)}
			>
				<DetailedView />
			</Button>
		</div>
	)
})
