import App from "@app/App"
import { StoreProvider } from "@providers/StoreProvider"
import { Suspense } from "react"
import { HashRouter } from "react-router-dom"

//eslint-disable-next-line
export const RootComponent = () => {
	return (
		<HashRouter>
			<StoreProvider>
				<Suspense fallback={""}>
					<App />
				</Suspense>
			</StoreProvider>
		</HashRouter>
	)
}
