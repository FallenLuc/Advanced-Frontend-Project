import { UserRoles } from "../../constants/userRoles.constant"
import type { userDataType } from "../../types/userData.type"
import type { DeepPartial } from "@customTypes/global.types"
import { THEMES } from "@sharedProviders/ThemeProvider"
import { setFeatureFlags } from "@config/featureFlags"

export const userDataMock: (params: DeepPartial<userDataType>) => userDataType = (
	params: DeepPartial<userDataType>
) => {
	const userData = {
		id: params?.id ?? "1",
		roles: (params?.roles ?? [UserRoles.USER, UserRoles.ADMIN]) as UserRoles[],
		features: params.features ?? { isFeatureRating: true, isFeatureComments: true },
		avatar:
			params?.avatar ??
			"https://i.pinimg.com/originals/f0/f8/fe/f0f8fe0e76824fd544a9154b995fb01d.jpg",
		userName: params?.userName ?? "Lucifer",
		settings: { theme: THEMES.DARK }
	}

	if (__PROJECT__ !== "frontend") {
		setFeatureFlags(userData.features)
	}

	return userData
}
