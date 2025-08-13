import type { ComponentPropsWithAuth, DeepPartial } from "@customTypes/global.types"
import { CenterDecorator } from "@decorators/storybook/Center.decorator"
import { ContainerDecorator } from "@decorators/storybook/Container.decorator"
import { StoreDecorator } from "@decorators/storybook/Store.decorator"
import type { addArticleCommentStateMap } from "@features/AddArticleComment"
import type { mainStateMap } from "@store/storeTypes/mainState.map"
import { type Meta, type StoryObj } from "@storybook/react"
import { CommentsArticleDetails } from "../CommentsArticleDetails"
import commentsEntities from "./comments.data.json"

const meta: Meta<ComponentPropsWithAuth<typeof CommentsArticleDetails>> = {
	title: "widgets/CommentsArticleDetails",
	component: CommentsArticleDetails,
	parameters: {
		controls: {
			exclude: ["articleId", "auth"]
		}
	},
	decorators: [ContainerDecorator, CenterDecorator]
}

export default meta

type TypeStory = StoryObj<ComponentPropsWithAuth<typeof CommentsArticleDetails>>

const commentsState = {
	entities: commentsEntities,
	ids: ["1", "2", "3"],
	error: undefined,
	isLoading: false
}

const addArticleCommentState: DeepPartial<addArticleCommentStateMap> = {
	text: "",
	isLoading: false,
	error: undefined
}

const state: DeepPartial<mainStateMap> = {
	commentsArticleDetails: commentsState,
	addArticleComment: addArticleCommentState
}

export const Loading: TypeStory = {
	args: {
		auth: true
	},
	decorators: [
		StoreDecorator({
			...state,
			commentsArticleDetails: { ...commentsState, isLoading: true }
		})
	]
}

export const Error: TypeStory = {
	args: {
		auth: true
	},
	decorators: [
		StoreDecorator({
			...state,
			commentsArticleDetails: { ...commentsState, error: "no data" }
		})
	]
}

export const Default: TypeStory = {
	args: {
		auth: true
	},
	decorators: [StoreDecorator(state)]
}
