import { buildSelector } from "@helpers/buildSelector/buildSelector.helper"
import type { mainStateMap } from "@store/storeTypes/mainState.map"

export const [useGetRegisterFormSelector, getRegisterFormSelector] = buildSelector(
	(state: mainStateMap) => state?.registerForm
)
