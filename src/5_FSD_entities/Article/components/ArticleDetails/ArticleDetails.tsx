import { CalendarIcon, EyeIcon } from "@assets/index"
import { classNamesHelp } from "@helpers/classNamesHelp/classNamesHelp"
import { useAppDispatch } from "@hooks/useAppDispatch.hook"
import type { asyncReducersList } from "@hooks/useAsyncReducer.hook"
import { useAsyncReducer } from "@hooks/useAsyncReducer.hook"
import { VStack } from "@ui/Stack"
import { Text, TextSize } from "@ui/Text"
import type { ReactNode } from "react"
import { memo, useCallback, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { ArticleBlockTypeConstant } from "../../constants/ArticleBlock.constant"
import { articleReducer } from "../../store/slices/article.slice"
import { fetchArticleDataByIdThunk } from "../../store/thunks/fetchArticleDataByIdThunk/fetchArticleDataById.thunk"
import type { articleBlockDataType } from "../../types/articleBlockData.type"
import { ArticleBlockCode } from "./ui/ArticleBlockCode/ArticleBlockCode"
import { ArticleBlockImage } from "./ui/ArticleBlockImage/ArticleBlockImage"
import { ArticleBlockText } from "./ui/ArticleBlockText/ArticleBlockText"
import { ArticleDetailsError } from "./ui/ArticleDetailsError/ArticleDetailsError"
import { ArticlesDetailsSkeleton } from "./ui/ArticleDetailsSkeleton/ArticlesDetailsSkeleton"
import { TextWithIcon } from "./ui/TextWithIcon/TextWithIcon"
import { AppImage } from "@ui/AppImage"
import styles from "./ArticleDetails.module.scss"
import {
	useGetArticleIsLoadingSelector,
	useGetArticleErrorSelector,
	useGetArticleDataSelector
} from "../../store/selectors/getArticleFields/getArticleFields.selector"

type ArticleDetailsProps = {
	id: string | number
	className?: string
}

const initReducers: asyncReducersList = {
	articleDetails: articleReducer
}
export const ArticleDetails = memo<ArticleDetailsProps>(props => {
	const { className, id } = props

	useAsyncReducer(initReducers, false)

	const dispatch = useAppDispatch()

	const { t } = useTranslation("article")

	useEffect(() => {
		if (__PROJECT__ !== "storybook") {
			dispatch(fetchArticleDataByIdThunk(id.toString()))
		}
	}, [dispatch, id])

	const isLoading = useGetArticleIsLoadingSelector()
	const error = useGetArticleErrorSelector()
	const data = useGetArticleDataSelector()

	const renderBlock = useCallback((block: articleBlockDataType) => {
		switch (block.type) {
			case ArticleBlockTypeConstant.TEXT:
				return (
					<ArticleBlockText
						key={block.id}
						paragraphs={block.paragraphs}
						title={block.title}
					/>
				)
			case ArticleBlockTypeConstant.CODE:
				return (
					<ArticleBlockCode
						key={block.id}
						text={block.code}
						title={block.title}
					/>
				)
			case ArticleBlockTypeConstant.IMAGE:
				return (
					<ArticleBlockImage
						key={block.id}
						src={block.src}
						title={block.title}
					/>
				)
			default:
				return null
		}
	}, [])

	let content: ReactNode

	content = (
		<>
			<AppImage
				className={styles.avatar}
				src={data?.img || ""}
				alt={data?.title || ""}
			/>

			<VStack gap={"gap24"}>
				<div>
					<VStack gap={"gap16"}>
						<Text
							title={data?.title || t("article:title")}
							size={TextSize.BIG}
						/>

						<VStack gap={"gap8"}>
							<Text
								text={data?.subtitle || t("article:subtitle")}
								size={TextSize.BIG}
							/>

							<TextWithIcon
								Icon={EyeIcon}
								text={data?.views.toString() || "0"}
							/>
							<TextWithIcon
								Icon={CalendarIcon}
								text={data?.createdAt || "01.01.2000"}
							/>
						</VStack>
					</VStack>
				</div>
				<VStack gap={"gap24"}>{data?.blocks.map(block => renderBlock(block))}</VStack>
			</VStack>
		</>
	)

	if (isLoading) {
		content = <ArticlesDetailsSkeleton />
	}

	if (error) {
		content = <ArticleDetailsError />
	}

	return (
		<VStack
			gap={"gap16"}
			align={"center"}
			className={classNamesHelp("", {}, [className])}
		>
			{content}
		</VStack>
	)
})
