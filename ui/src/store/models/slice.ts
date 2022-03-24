import { createSlice } from "@reduxjs/toolkit"
import {
    createModel,
    deleteModel,
    fetchAllModels,
    updateModel,
} from "./actions"
import { Model } from "./type"

const initialState = [] as Model[]

const modelsSlice = createSlice({
    name: "models",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllModels.fulfilled, (state, action) => {
                return action.payload
            })
            .addCase(createModel.fulfilled, (state, action) => {
                state.push(action.payload)
            })
            .addCase(deleteModel.fulfilled, (state, action) => {
                return state.filter((model) => model.id !== action.payload)
            })
            .addCase(updateModel.fulfilled, (state, action) => {
                return state.map((model) =>
                    model.id === action.payload.id ? action.payload : model,
                )
            })
    },
})

export default modelsSlice.reducer
