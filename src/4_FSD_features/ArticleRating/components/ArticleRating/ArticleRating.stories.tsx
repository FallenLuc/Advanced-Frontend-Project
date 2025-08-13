import { CenterDecorator } from "@decorators/storybook/Center.decorator"
import { StoreDecorator } from "@decorators/storybook/Store.decorator"
import { ratingDataMock } from "@entities/Rating/lib/mocks/ratingData.mock"
import { type Meta, type StoryObj } from "@storybook/react"
import ArticleRating from "./ArticleRating"
import type { ComponentPropsWithAuth } from "@customTypes/global.types"

type ArticleRatingCustomProps = ComponentPropsWithAuth<typeof ArticleRating>

const meta: Meta<ArticleRatingCustomProps> = {
	title: "features/ArticleRating",
	component: ArticleRating,
	parameters: {
		controls: {
			exclude: ["articleId", "auth"]
		}
	},
	decorators: [StoreDecorator({}), CenterDecorator]
}

export default meta

type TypeStory = StoryObj<ArticleRatingCustomProps>

export const Default: TypeStory = {
	parameters: {
		mockData: [
			{
				url: `${__API_URL__}/article-ratings?articleId=1&userId=1`,
				method: "GET",
				status: 200,
				delay: 0,
				response: ratingDataMock
			}
		]
	},
	args: {
		articleId: "1",
		auth: true
	}
}

export const Loading: TypeStory = {
	parameters: {
		mockData: [
			{
				url: `${__API_URL__}/article-ratings?articleId=1&userId=1`,
				method: "GET",
				status: 200,
				delay: 60000,
				response: ratingDataMock
			}
		]
	},
	args: {
		articleId: "1",
		auth: true
	}
}

export const Error: TypeStory = {
	parameters: {
		mockData: [
			{
				url: `${__API_URL__}/article-ratings?articleId=1&userId=1`,
				method: "GET",
				status: 503,
				delay: 0,
				response: ratingDataMock
			}
		]
	},
	args: {
		articleId: "1",
		auth: true
	}
}

export const WithOutRating: TypeStory = {
	parameters: {
		mockData: [
			{
				url: `${__API_URL__}/article-ratings?articleId=1&userId=1`,
				method: "GET",
				status: 200,
				delay: 0,
				response: []
			},
			{
				url: `${__API_URL__}/article-ratings`,
				method: "POST",
				status: 200,
				delay: 1000,
				response: []
			}
		]
	},
	args: {
		auth: true,
		articleId: "1"
	}
}

export const WithOutRatingError: TypeStory = {
	parameters: {
		mockData: [
			{
				url: `${__API_URL__}/article-ratings?articleId=1&userId=1`,
				method: "GET",
				status: 200,
				delay: 0,
				response: []
			},
			{
				url: `${__API_URL__}/article-ratings`,
				method: "POST",
				status: 503,
				delay: 1000,
				response: []
			}
		]
	},
	args: {
		auth: true,
		articleId: "1"
	}
}
