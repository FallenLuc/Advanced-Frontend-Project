import type { articleDetailsDataType } from "@entities/Article"
import { CommentList } from "@entities/Comment"
import { AddArticleCommentForm } from "@features/AddArticleComment"
import { classNamesHelp } from "@helpers/classNamesHelp/classNamesHelp"
import { useAppDispatch } from "@hooks/useAppDispatch.hook"
import type { asyncReducersList } from "@hooks/useAsyncReducer.hook"
import { useAsyncReducer } from "@hooks/useAsyncReducer.hook"
import { VStack } from "@ui/Stack"
import { Text, TextSize } from "@ui/Text"
import { memo, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { commentsArticleDetailsReducer } from "../../store/slices/commentsArticleDetails.slice"
import { fetchCommentsByArticleIdThunk } from "../../store/thunks/fetchCommentsByArticleId.thunk"
import { useAuth } from "@entities/User"
import {
	useGetCommentsArticleDetailsIsLoadingSelector,
	useGetCommentsArticleDetailsErrorSelector,
	useGetCommentsArticleDetailsDataSelector
} from "../../store/selectors/getCommentsArticleDetailsFields/getCommentsArticleDetailsFields.selector"

type CommentsArticleDetailsProps = {
	className?: string
	articleId: articleDetailsDataType["id"]
}

const initialReducer: asyncReducersList = {
	commentsArticleDetails: commentsArticleDetailsReducer
}

export const CommentsArticleDetails = memo<CommentsArticleDetailsProps>(props => {
	const { className, articleId } = props

	const { t } = useTranslation()
	const dispatch = useAppDispatch()

	const { isAuth } = useAuth()

	useAsyncReducer(initialReducer)

	useEffect(() => {
		if (__PROJECT__ !== "storybook") {
			dispatch(fetchCommentsByArticleIdThunk(articleId))
		}
	}, [articleId, dispatch])

	const isLoading = useGetCommentsArticleDetailsIsLoadingSelector()
	const error = useGetCommentsArticleDetailsErrorSelector()
	const comments = useGetCommentsArticleDetailsDataSelector()

	if (isAuth) {
		return (
			<VStack
				gap={"gap16"}
				className={classNamesHelp("", {}, [className])}
			>
				<Text
					title={t("article:listOfComments")}
					size={TextSize.BIG}
				/>
				<AddArticleCommentForm id={articleId} />
				<CommentList
					comments={comments}
					isLoading={isLoading}
					error={error}
				/>
			</VStack>
		)
	}

	return isAuth
})
