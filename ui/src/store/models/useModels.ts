import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from ".."
import { fetchAllModels } from "./actions"

const useModels = (fetch = false) => {
    const dispatch = useDispatch()
    const models = useSelector((state: RootState) => state.models)

    useEffect(() => {
        if (fetch) dispatch(fetchAllModels())
    }, [dispatch, fetch])

    return models
}

export default useModels
