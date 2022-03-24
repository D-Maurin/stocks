import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { Model } from "./type"

export const fetchAllModels = createAsyncThunk(
    "models/fetchAllModels",
    async () => {
        const response = await axios.get("/api/models")
        return response.data
    },
)

export const createModel = createAsyncThunk(
    "models/create",
    async (params: Omit<Model, "id">) => {
        const response = await axios.post("/api/models", params)
        return response.data
    },
)

export const deleteModel = createAsyncThunk(
    "models/delete",
    async (uuid: string) => {
        await axios.delete(`/api/models/${uuid}`)
        return uuid
    },
)

export const updateModel = createAsyncThunk(
    "models/update",
    async ({ uuid, data }: { uuid: string; data: Omit<Model, "id"> }) => {
        const response = await axios.put(`/api/models/${uuid}`, data)
        return response.data
    },
)
