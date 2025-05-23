import { CenterDecorator } from "@decorators/storybook/Center.decorator"
import { ContainerDecorator } from "@decorators/storybook/Container.decorator"
import { type Meta, type StoryObj } from "@storybook/react"
import type { ComponentProps } from "react"
import { CommentCard } from "./CommentCard"
import { userDataMock, UserRoles } from "../../../User"

type CommentCardCustomProps = ComponentProps<typeof CommentCard> & {
	userName: string
	text: string
}

const meta: Meta<CommentCardCustomProps> = {
	title: "entities/Comment/CommentCard",
	component: CommentCard,
	decorators: [ContainerDecorator, CenterDecorator],
	parameters: {
		controls: {
			exclude: ["isLoading", "user"]
		}
	}
}

export default meta

type TypeStory = StoryObj<CommentCardCustomProps>

export const Loading: TypeStory = {
	args: {
		isLoading: true
	}
}

export const Default: TypeStory = {
	render: ({ userName, text, ...args }) => {
		return (
			<CommentCard
				comment={{
					user: userDataMock({ id: "1", userName, roles: [UserRoles.ADMIN] }),
					text,
					id: "1"
				}}
				{...args}
			/>
		)
	},
	args: {
		text: "Your request body JSON should be object enclosed",
		userName: "Admin 1"
	}
}
