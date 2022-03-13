import { createSlice } from "@reduxjs/toolkit"
import {
    fetchAllItemCategories,
    createItemCategory,
    deleteItemCategory,
    updateItemCategory,
} from "./actions"
import { ItemCategory } from "./type"

const initialState = [] as ItemCategory[]

const itemCategoriesSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllItemCategories.fulfilled, (state, action) => {
                return action.payload
            })
            .addCase(createItemCategory.fulfilled, (state, action) => {
                state.push(action.payload)
            })
            .addCase(deleteItemCategory.fulfilled, (state, action) => {
                return state.filter((cat) => cat.id !== action.payload)
            })
            .addCase(updateItemCategory.fulfilled, (state, action) => {
                return state.map((cat) =>
                    cat.id === action.payload.id ? action.payload : cat,
                )
            })
    },
})

export default itemCategoriesSlice.reducer
