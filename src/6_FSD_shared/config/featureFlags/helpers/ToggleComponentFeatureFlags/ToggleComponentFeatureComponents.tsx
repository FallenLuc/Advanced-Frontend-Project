import type { ReactNode } from "react"
import { memo } from "react"
import type { featureFlagsKeysType } from "../../types/featureFlags.type"
import { getFeatureFlag } from "../../config/featureFlags.config"

type ToggleComponentFeatureFlagsProps = {
	name: featureFlagsKeysType
	on: ReactNode
	off?: ReactNode
}

export const ToggleComponentFeatureFlags = memo<ToggleComponentFeatureFlagsProps>(props => {
	const { name, on, off } = props

	if (getFeatureFlag(name)) {
		return on
	}
	return off || undefined
})

// ToDo тесты
