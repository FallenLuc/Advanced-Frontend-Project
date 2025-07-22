import type { commentDataType } from "@entities/Comment"
import { createEntityAdapter } from "@reduxjs/toolkit"

export const commentsArticleDetailsAdapter = createEntityAdapter<commentDataType>()
