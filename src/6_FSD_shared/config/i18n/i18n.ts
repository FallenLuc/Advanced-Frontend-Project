import i18n from "i18next"

import Backend from "i18next-http-backend"
import { initReactI18next } from "react-i18next"

i18n.use(initReactI18next)
	.use(Backend)
	.init({
		debug: true,
		fallbackLng: "en",

		backend: {
			loadPath:
				__IS_DEV__ ?
					"/locales/{{lng}}/{{ns}}.json"
				:	"/Advanced-Frontend-Project/locales/{{lng}}/{{ns}}.json"
		}
	})
	.then()
	.catch()
