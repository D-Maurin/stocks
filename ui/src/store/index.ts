import { configureStore } from "@reduxjs/toolkit"
import connectApi from "./connectApi"
import { Item, ItemCategory, Model } from "./types"

const {
    reducer: itemsReducer,
    useLoad: useLoadItems,
    actions: itemsActions,
} = connectApi<Item>("items")

const {
    reducer: itemCategoriesReducer,
    useLoad: useLoadItemCategories,
    actions: itemCategoriesActions,
} = connectApi<ItemCategory>("item_categories")

const {
    reducer: modelsReducer,
    useLoad: useLoadModels,
    actions: modelsActions,
} = connectApi<Model>("models")

export const store = configureStore({
    reducer: {
        items: itemsReducer,
        itemCategories: itemCategoriesReducer,
        models: modelsReducer,
    },
})

export {
    useLoadItems,
    useLoadItemCategories,
    useLoadModels,
    itemsActions,
    itemCategoriesActions,
    modelsActions,
}

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
