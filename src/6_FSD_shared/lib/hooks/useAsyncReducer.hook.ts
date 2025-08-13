import type { Reducer } from "@reduxjs/toolkit"
import type { mainStateAsyncKeys, mainStateAsyncMap } from "@store/storeTypes/mainStateAsync.map"
import { useEffect } from "react"
import { useAppDispatch } from "./useAppDispatch.hook"
import { useAppStore } from "./useAppStore.hook"

export type asyncReducersList = {
	[name in mainStateAsyncKeys]?: Reducer<NonNullable<mainStateAsyncMap[name]>>
}
type asyncReducersEntries = [mainStateAsyncKeys, Reducer<mainStateAsyncMap[mainStateAsyncKeys]>][]

export const useAsyncReducer = (asyncReducers: asyncReducersList, removeAfterUnmount = true) => {
	const storeApp = useAppStore()
	const dispatch = useAppDispatch()

	useEffect(() => {
		const entries = Object.entries(asyncReducers) as unknown as asyncReducersEntries

		entries.forEach(([key, value]) => {
			if (!storeApp.reducerManager.getReducerMap()[key]) {
				storeApp.reducerManager.add(key as mainStateAsyncKeys, value)
				dispatch({ type: `@INIT ${key}` })
			}
		})

		return () => {
			entries.forEach(([key, value]) => {
				if (removeAfterUnmount && __PROJECT__ !== "storybook") {
					storeApp.reducerManager.remove(key as mainStateAsyncKeys, value)
					dispatch({ type: `@DESTROY ${key}` })
				}
			})
		}
	}, [asyncReducers, dispatch, removeAfterUnmount, storeApp.reducerManager])
}
