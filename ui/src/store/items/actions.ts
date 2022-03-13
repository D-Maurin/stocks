import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { Item } from "../items/type"

export const fetchAllItems = createAsyncThunk(
    "items/fetchAllItems",
    async () => {
        const response = await axios.get("/api/items")
        return response.data
    },
)

export const createItem = createAsyncThunk(
    "items/create",
    async (params: Omit<Item, "id">) => {
        const response = await axios.post("/api/items", params)
        return response.data
    },
)

export const deleteItem = createAsyncThunk(
    "items/delete",
    async (uuid: string) => {
        await axios.delete(`/api/items/${uuid}`)
        return uuid
    },
)

export const updateItem = createAsyncThunk(
    "items/update",
    async ({ uuid, data }: { uuid: string; data: Omit<Item, "id"> }) => {
        const response = await axios.put(`/api/items/${uuid}`, data)
        return response.data
    },
)
