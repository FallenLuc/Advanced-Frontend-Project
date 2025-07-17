import preview from "@_storybook/preview"
import { CenterDecorator } from "@decorators/storybook/Center.decorator"
import { StoreDecorator } from "@decorators/storybook/Store.decorator"
import { type Meta, type StoryObj } from "@storybook/react"
import { loginFormReducer } from "../../store/slices/loginForm.slice"
import { LoginModal } from "./LoginModal"

const meta: Meta<typeof LoginModal> = {
	title: "features/LoginModal",
	component: LoginModal,
	args: {
		isOpen: true
	},
	parameters: {
		controls: {
			exclude: [...(preview.parameters?.controls?.exclude || []), "isOpen", "onClose", "lazy"]
		}
	},
	decorators: [CenterDecorator]
}

export default meta

type TypeStory = StoryObj<typeof LoginModal>

export const Default: TypeStory = {
	decorators: [
		StoreDecorator(
			{
				loginForm: { isLoading: false, data: { userName: "admin", password: "123" } }
			},
			{ loginForm: loginFormReducer }
		)
	]
}

export const Loading: TypeStory = {
	decorators: [
		StoreDecorator(
			{
				loginForm: { isLoading: true, data: { userName: "admin", password: "123" } }
			},
			{ loginForm: loginFormReducer }
		)
	]
}

export const ErrorNoUser: TypeStory = {
	decorators: [
		StoreDecorator(
			{
				loginForm: { error: { noUser: true }, data: { userName: "adm", password: "123" } }
			},
			{ loginForm: loginFormReducer }
		)
	]
}

export const ErrorOtherError: TypeStory = {
	decorators: [
		StoreDecorator(
			{
				loginForm: {
					error: { otherError: "other error" },
					data: { userName: "admin", password: "123" }
				}
			},
			{ loginForm: loginFormReducer }
		)
	]
}
