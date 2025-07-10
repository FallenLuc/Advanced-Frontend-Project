import { rtkBaseApi } from "@api/instances/rtkBase.api"
import type { notificationData } from "../types/notificationData.type"

const fetchNotificationsRtkq = rtkBaseApi.injectEndpoints({
	endpoints: build => ({
		getNotification: build.query<notificationData[], string | undefined>({
			query: (userId?: string) => {
				return {
					url: "/notifications",
					params: {
						userId,
						_expand: "user"
					}
				}
			}
		})
	}),
	overrideExisting: false
})

export const { useGetNotificationQuery } = fetchNotificationsRtkq
