import type { StorybookConfig } from "@storybook/react-webpack5"
import { webpackStorybookConfig } from "./webpackStorybook.config"

const config: StorybookConfig = {
	stories: ["../../**/*.stories.@(js|jsx|mjs|ts|tsx)"],
	addons: [
		"@storybook/addon-webpack5-compiler-swc",
		"@storybook/addon-links",
		{
			name: "@storybook/addon-essentials",
			options: {
				backgrounds: false
			}
		},
		"@chromatic-com/storybook",
		"@storybook/addon-themes",
		"storybook-react-i18next",
		"@chromatic-com/storybook",
		"storybook-addon-mock"
	],
	framework: {
		name: "@storybook/react-webpack5",
		options: {}
	},
	swc: () => ({
		jsc: {
			transform: {
				react: {
					runtime: "automatic"
				}
			}
		}
	}),
	docs: {
		autodocs: "tag"
	},
	webpackFinal: async config => webpackStorybookConfig(config)
}
export default config
