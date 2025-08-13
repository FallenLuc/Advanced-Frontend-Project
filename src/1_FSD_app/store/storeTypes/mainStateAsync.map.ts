import { type articleDetailsStateMap } from "@entities/Article"
import { type addArticleCommentStateMap } from "@features/AddArticleComment"
import { type loginFormStateMap } from "@features/AuthByUserName"
import { type editableProfileStateMap } from "@features/EditableProfileCard"
import { type filterArticlesListStateMap } from "@features/FilterArticlesList"
import { type articlesListStateMap } from "@widgets/ArticlesList"
import { type commentsArticleDetailsMap } from "@widgets/CommentsArticleDetails"
import type { registerFormStateMap } from "@features/Registration"

export type mainStateAsyncMap = {
	editableProfileCard?: editableProfileStateMap
	loginForm?: loginFormStateMap
	registerForm?: registerFormStateMap
	articleDetails?: articleDetailsStateMap
	commentsArticleDetails?: commentsArticleDetailsMap
	addArticleComment?: addArticleCommentStateMap
	articlesListStateMap?: articlesListStateMap
	filterArticlesList?: filterArticlesListStateMap
}

export type mainStateAsyncKeys = keyof mainStateAsyncMap
