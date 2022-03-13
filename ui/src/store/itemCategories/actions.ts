import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { ItemCategory } from "./type"

export const fetchAllItemCategories = createAsyncThunk(
    "itemCategories/fetchAllItemCategories",
    async () => {
        const response = await axios.get("/api/item_categories")
        return response.data
    },
)

export const createItemCategory = createAsyncThunk(
    "itemCategories/create",
    async (params: Omit<ItemCategory, "id">) => {
        const response = await axios.post("/api/item_categories", params)
        return response.data
    },
)

export const deleteItemCategory = createAsyncThunk(
    "itemCategories/delete",
    async (uuid: string) => {
        await axios.delete(`/api/item_categories/${uuid}`)
        return uuid
    },
)

export const updateItemCategory = createAsyncThunk(
    "itemCategories/update",
    async ({
        uuid,
        data,
    }: {
        uuid: string
        data: Omit<ItemCategory, "id">
    }) => {
        const response = await axios.put(`/api/item_categories/${uuid}`, data)
        return response.data
    },
)
