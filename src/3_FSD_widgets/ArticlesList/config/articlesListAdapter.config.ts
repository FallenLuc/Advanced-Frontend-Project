import type { articleDetailsDataType } from "@entities/Article"
import { createEntityAdapter } from "@reduxjs/toolkit"

export const articlesListAdapter = createEntityAdapter<articleDetailsDataType>()
