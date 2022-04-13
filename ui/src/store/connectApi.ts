import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

const connectApi = <T extends { id: string }>(name: string) => {
    const actions = {
        fetch: createAsyncThunk(`${name}/fetch`, async () => {
            const response = await axios.get(`/api/${name}`)
            return response.data
        }),
        create: createAsyncThunk(
            `${name}/create`,
            async (params: Omit<T, "id">) => {
                const response = await axios.post(`api/${name}`, params)
                return response.data
            },
        ),
        delete: createAsyncThunk(`${name}/delete`, async (uuid: string) => {
            await axios.delete(`/api/${name}/${uuid}`)
            return uuid
        }),
        update: createAsyncThunk(
            `${name}/update`,
            async ({ uuid, data }: { uuid: string; data: Omit<T, "id"> }) => {
                const response = await axios.put(`/api/${name}/${uuid}`, data)
                return response.data
            },
        ),
    }

    const slice = createSlice({
        name: "items",
        initialState: [] as T[],
        reducers: {},
        extraReducers: (builder) => {
            builder
                .addCase(actions.fetch.fulfilled, (state, action) => {
                    return action.payload
                })
                .addCase(actions.create.fulfilled, (state, action) => {
                    state.push(action.payload)
                })
                .addCase(actions.delete.fulfilled, (state, action) => {
                    return state.filter((item) => item.id !== action.payload)
                })
                .addCase(actions.update.fulfilled, (state, action) => {
                    return state.map((item) =>
                        item.id === action.payload.id ? action.payload : item,
                    )
                })
        },
    })

    const useLoad = () => {
        const [ready, setReady] = useState(false)
        const dispatch = useDispatch()

        useEffect(() => {
            const load = async () => {
                await dispatch(actions.fetch())
                setReady(true)
            }
            load()
        }, [dispatch])

        return ready
    }

    return { actions, reducer: slice.reducer, useLoad }
}

export default connectApi
