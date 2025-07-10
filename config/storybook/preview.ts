import { RouterDecorator } from "@decorators/storybook/Router.decorator"
import { StyleDecorator } from "@decorators/storybook/Style.decorator"
import { ThemeDecorator } from "@decorators/storybook/Theme.decorator"
import { THEMES } from "@sharedProviders/ThemeProvider"

import type { Preview } from "@storybook/react"
import i18n from "./i18nextStorybook"

const preview: Preview = {
	globals: {
		locale: "en",
		locales: {
			en: "en",
			ru: "ru"
		}
	},
	parameters: {
		layout: "fullscreen",
		mockAddonConfigs: {
			globalMockData: [],
			disableUsingOriginal: false,
			refreshStoryOnUpdate: true,
			disable: true
		},
		controls: {
			exclude: ["className", "classNames", "data-testid"]
		},
		i18n
	},
	decorators: [
		StyleDecorator,
		ThemeDecorator({
			themes: {
				Dark: THEMES.DARK,
				Light: THEMES.LIGHT,
				Green: THEMES.GREEN
			},
			defaultTheme: "Dark"
		}),
		RouterDecorator
	]
}

export default preview
