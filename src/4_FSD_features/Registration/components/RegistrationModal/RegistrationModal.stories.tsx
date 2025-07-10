import { type Meta, type StoryObj } from "@storybook/react"
import { CenterDecorator } from "@decorators/storybook/Center.decorator"
import { RegistrationModal } from "./RegistrationModal"
import preview from "@_storybook/preview"
import { StoreDecorator } from "@decorators/storybook/Store.decorator"
import { registerFormReducer } from "../../store/slices/registerForm.slice"
import { userDataMock } from "@entities/User"

const meta: Meta<typeof RegistrationModal> = {
	title: "features/RegistrationModal",
	component: RegistrationModal,
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

type TypeStory = StoryObj<typeof RegistrationModal>

export const Default: TypeStory = {
	parameters: {
		mockData: [
			{
				url: `${__API_URL__}/signUp`,
				method: "POST",
				status: 200,
				delay: 0,
				response: userDataMock({})
			}
		]
	},
	args: {},
	decorators: [StoreDecorator({}, { registerForm: registerFormReducer })]
}

export const Error: TypeStory = {
	args: {},
	parameters: {
		mockData: [
			{
				url: `${__API_URL__}/signUp`,
				method: "POST",
				status: 500,
				delay: 0,
				response: userDataMock({})
			}
		]
	},
	decorators: [StoreDecorator({}, { registerForm: registerFormReducer })]
}

export default meta
