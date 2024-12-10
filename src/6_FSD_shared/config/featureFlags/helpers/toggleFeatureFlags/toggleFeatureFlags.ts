import { type featureFlagsKeysType } from "../../types/featureFlags.type"
import { getFeatureFlag } from "../../config/featureFlags.config"

type toggleFeatureFlagsParams<T> = {
	name: featureFlagsKeysType
	on: () => T
	off: () => T
}

export function toggleFeatureFlags<T>(params: toggleFeatureFlagsParams<T>) {
	if (getFeatureFlag(params.name)) {
		return params.on()
	}

	return params.off()
}

// ToDo Тесты
