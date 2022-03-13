import { createSlice } from "@reduxjs/toolkit"
import { createItem, deleteItem, fetchAllItems, updateItem } from "./actions"
import { Item } from "./type"

const initialState = [] as Item[]

const itemsSlice = createSlice({
    name: "items",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllItems.fulfilled, (state, action) => {
                return action.payload
            })
            .addCase(createItem.fulfilled, (state, action) => {
                state.push(action.payload)
            })
            .addCase(deleteItem.fulfilled, (state, action) => {
                return state.filter((item) => item.id !== action.payload)
            })
            .addCase(updateItem.fulfilled, (state, action) => {
                return state.map((item) =>
                    item.id === action.payload.id ? action.payload : item,
                )
            })
    },
})

export default itemsSlice.reducer
