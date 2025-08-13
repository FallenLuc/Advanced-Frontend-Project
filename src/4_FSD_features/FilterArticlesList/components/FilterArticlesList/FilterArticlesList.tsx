import type { sortOrder } from "@customTypes/productGlobal.types"
import { ArticleTypeConstant } from "@entities/Article/constants/Article.constant"
import { classNamesHelp } from "@helpers/classNamesHelp/classNamesHelp"
import type { asyncReducersList } from "@hooks/useAsyncReducer.hook"
import { useAsyncReducer } from "@hooks/useAsyncReducer.hook"
import { useDebounce } from "@hooks/useDebounce.hook"
import { Input } from "@ui/Input"
import { InputTheme } from "@ui/Input/constants/Input.constant"
import type { OptionType } from "@ui/Select"
import { Select } from "@ui/Select"
import type { TabsItemType } from "@ui/Tabs"
import { Tabs } from "@ui/Tabs"
import { memo, useCallback, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { ArticleSortFieldConstant } from "../../constants/ArticleSortField.constant"
import {
	filterArticlesListReducer,
	useFilterArticlesListActions
} from "../../store/slices/filterArticlesList.slice"
import styles from "./FilterArticlesList.module.scss"
import {
	useGetFilterArticlesListOrderSelector,
	useGetFilterArticlesListSortFieldSelector,
	useGetFilterArticlesListSearchSelector,
	useGetFilterArticlesListTypeTopicSelector
} from "../../store/selectors/getFilterArticlesListFields/getFilterArticlesListFields.selector"

type FilterArticlesListProps = {
	className?: string
	callback: () => void
}

const initReducer: asyncReducersList = {
	filterArticlesList: filterArticlesListReducer
}

export const FilterArticlesList = memo<FilterArticlesListProps>(props => {
	const { className, callback } = props

	const { t } = useTranslation("article")

	useAsyncReducer(initReducer, false)

	const { setOrder, setSortField, setSearch, setType } = useFilterArticlesListActions()

	const order = useGetFilterArticlesListOrderSelector()
	const sortField = useGetFilterArticlesListSortFieldSelector()
	const search = useGetFilterArticlesListSearchSelector()
	const typeTopic = useGetFilterArticlesListTypeTopicSelector()

	const optionsOrder = useMemo<OptionType<sortOrder>[]>(
		() => [
			{ value: "ASC", content: t("article:asc") },
			{ value: "DESC", content: t("article:desc") }
		],
		[t]
	)

	const optionsSortField = useMemo<OptionType<ArticleSortFieldConstant>[]>(
		() => [
			{ value: ArticleSortFieldConstant.TITLE, content: t("article:byTitle") },
			{ value: ArticleSortFieldConstant.DATE, content: t("article:byDate") },
			{ value: ArticleSortFieldConstant.VIEW, content: t("article:byViews") }
		],
		[t]
	)

	const onChangeOrderHandler = useCallback(
		(value: sortOrder) => {
			setOrder(value)
			callback()
		},
		[callback, setOrder]
	)

	const onChangeSortFieldHandler = useCallback(
		(value: ArticleSortFieldConstant) => {
			setSortField(value)
			callback()
		},
		[callback, setSortField]
	)

	const debounceCallback = useDebounce(
		useCallback(() => callback(), [callback]),
		400
	)

	const onChangeSearch = useCallback(
		(value: string) => {
			setSearch(value)

			debounceCallback()
		},
		[setSearch, debounceCallback]
	)

	const tabs = useMemo<TabsItemType<ArticleTypeConstant | "ALL">[]>(
		() => [
			{
				content: t("article:ALL"),
				value: "ALL"
			},
			{
				content: t(ArticleTypeConstant.IT),
				value: ArticleTypeConstant.IT
			},
			{
				content: t(ArticleTypeConstant.DESIGN),
				value: ArticleTypeConstant.DESIGN
			},
			{
				content: t(ArticleTypeConstant.POLITICS),
				value: ArticleTypeConstant.POLITICS
			}
		],
		[t]
	)

	const onChangeTypeTopic = useCallback(
		(tab: TabsItemType<ArticleTypeConstant | "ALL">) => {
			setType(tab.value)
			debounceCallback()
		},
		[debounceCallback, setType]
	)

	return (
		<div className={classNamesHelp(styles.FilterArticlesList, {}, [className])}>
			<div className={styles.sort}>
				<Select
					options={optionsOrder}
					onChange={onChangeOrderHandler}
					value={order}
				/>
				<Select
					className={styles.selectOrder}
					options={optionsSortField}
					onChange={onChangeSortFieldHandler}
					value={sortField}
				/>
			</div>
			<Input
				className={styles.search}
				theme={InputTheme.OUTLINE}
				onChange={onChangeSearch}
				value={search}
			/>
			<Tabs
				tabs={tabs}
				value={typeTopic}
				onTabClick={onChangeTypeTopic}
			/>
		</div>
	)
})
