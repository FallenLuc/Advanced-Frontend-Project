export type paramsType<T extends string | number> = Record<string, T>

export function createQueryParams<T extends string | number>(params?: paramsType<T>) {
	const searchParams = new URLSearchParams(window.location.search)

	if (!params) return null

	Object.entries(params).forEach(([paramName, paramValue]) => {
		if (paramValue !== undefined) {
			searchParams.set(paramName, paramValue.toString())
		}
	})

	return `?${searchParams}`
}

/**
 * Adds query parameters to the current URL and updates the browser's history state.
 *
 * @param {paramsType<T>} [params] An optional object containing key-value pairs to be added as query parameters.
 * @param {string} [link] An optional base URL or path to which the query parameters should be appended.
 * @return {void} This method does not return a value.
 */
export function addQueryParams<T extends string | number>(
	params?: paramsType<T>,
	link?: string
): void {
	window.history.pushState({}, "", `#${link || "/"}${createQueryParams(params)}`)
}
