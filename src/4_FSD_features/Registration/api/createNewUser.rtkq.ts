import { rtkBaseApi } from "@api/instances/rtkBase.api"
import type { userDataType } from "@entities/User"

export type createNewUserParamsType = {
	userName: string
	password: string
}

const createNewUserRtkq = rtkBaseApi.injectEndpoints({
	endpoints: build => ({
		createNewUser: build.mutation<userDataType, createNewUserParamsType>({
			query: body => ({
				url: "/signUp",
				method: "POST",
				body: body
			})
		})
	}),
	overrideExisting: false
})

export const { useCreateNewUserMutation } = createNewUserRtkq
