import type { DeepPartial } from "@customTypes/global.types"
import { describe, expect, test } from "@jest/globals"
import type { mainStateMap } from "@store/storeTypes/mainState.map"
import { getScrollPositionByPathSelector } from "./getScrollPositionFields.selector"

describe(getScrollPositionByPathSelector, () => {
	test("get state", () => {
		const state: DeepPartial<mainStateMap> = {
			scrollPosition: {
				scroll: { ["/articles"]: 20 }
			}
		}

		expect(getScrollPositionByPathSelector("/articles")(state as mainStateMap)).toBe(20)
	})

	test("get withOut state", () => {
		const state: DeepPartial<mainStateMap> = {
			scrollPosition: {
				scroll: {}
			}
		}

		expect(getScrollPositionByPathSelector("/articles")(state as mainStateMap)).toBe(0)
	})
})
