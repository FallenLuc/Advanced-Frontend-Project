import i18n from "i18next"
import detector from "i18next-browser-languagedetector"

import Backend from "i18next-http-backend"
import { initReactI18next } from "react-i18next"

i18n.use(detector)
	.use(Backend)
	.use(initReactI18next)
	.init({
		debug: true,
		fallbackLng: "en",

		backend: {
			backendOptions: [
				{
					loadPath:
						__IS_DEV__ ?
							"/locales/{{lng}}/{{ns}}.json"
						:	"/Advanced-Frontend-Project/locales/{{lng}}/{{ns}}.json"
				}
			]
		}
	})
	.then()
	.catch()
