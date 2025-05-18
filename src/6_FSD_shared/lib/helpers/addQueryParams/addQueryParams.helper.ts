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
 * Обновляет адрес страницы, добавляя поля переданного объекта в качестве url параметров.
 * @param {paramsType<T>} params - объект поля которого станут url парамeтрами
 * @param {string} link - базовая ссылка
 */

export function addQueryParams<T extends string | number>(params?: paramsType<T>, link?: string) {
	window.history.pushState({}, "", `#${link || "/"}${createQueryParams(params)}`)
}
