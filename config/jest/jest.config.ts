import { type JestConfigWithTsJest, pathsToModuleNameMapper } from "ts-jest"
import { compilerOptions } from "../../tsconfig.paths.json"

const config: JestConfigWithTsJest = {
	clearMocks: true,
	collectCoverage: false,
	coverageDirectory: "coverage",
	moduleFileExtensions: ["js", "mjs", "cjs", "jsx", "ts", "tsx", "json", "node"],
	coveragePathIgnorePatterns: ["/node_modules/"],
	testEnvironment: "jsdom",
	rootDir: "../../",
	roots: ["<rootDir>"],
	injectGlobals: true,
	setupFilesAfterEnv: ["<rootDir>/config/jest/jest.setup.ts"],
	moduleDirectories: ["node_modules", "<rootDir>"],
	modulePaths: [compilerOptions.baseUrl],
	testMatch: ["<rootDir>src/**/*(*.)@(spec|test).[tj]s?(x)"],
	moduleNameMapper: {
		"\\.svg$": "<rootDir>/config/jest/mocks/jestSvg.mock.tsx",
		"\\.(s?css|less)$": "identity-obj-proxy",
		...pathsToModuleNameMapper(compilerOptions.paths, {
			prefix: "<rootDir>/"
		})
	},
	globals: {
		__IS_DEV__: true,
		__API_URL__: "",
		__PROJECT__: "jest"
	},
	reporters: [
		"default",
		[
			"jest-html-reporters",
			{
				publicPath: "<rootDir>/reports/tests",
				filename: "reportUnitTests.html",
				inlineSource: true,
				openReport: false,
				darkTheme: true
			}
		]
	]
}

export default config
