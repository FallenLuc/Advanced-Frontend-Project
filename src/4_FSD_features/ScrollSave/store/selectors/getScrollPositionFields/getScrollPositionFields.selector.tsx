import type { scrollPositionState } from "../../../index"
import { getScrollPositionSelector } from "../getScrollPosition/getScrollPosition.selector"
import { buildCreateSelector } from "@helpers/buildCreateSelector/buildCreateSelector.helper"

export const [useGetScrollPositionByPathSelector, getScrollPositionByPathSelector] =
	buildCreateSelector(
		[getScrollPositionSelector],
		(state: scrollPositionState, key: string) => state.scroll[key] ?? 0
	)
