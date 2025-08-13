import { describe, expect, test } from "@jest/globals"
import type { toggleFeatureFlagsParams } from "./toggleFeatureFlags"
import { toggleFeatureFlags } from "./toggleFeatureFlags"
import { setFeatureFlags } from "../../config/featureFlags.config"

const mockToggle: toggleFeatureFlagsParams<number> = {
	name: "isFeatureRating",
	on: () => 1,
	off: () => 2
}

describe("toggleFeatureFlagsTest", () => {
	test("off feature Flag", () => {
		setFeatureFlags({ isFeatureRating: true })

		expect(toggleFeatureFlags(mockToggle)).toBe(1)
	})

	test("on feature Flag", () => {
		setFeatureFlags({ isFeatureRating: false })

		expect(toggleFeatureFlags(mockToggle)).toBe(2)
	})
})
