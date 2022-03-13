import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from ".."
import { fetchAllItemCategories } from "./actions"

const useItemCategories = (fetch = false) => {
    const dispatch = useDispatch()
    const items = useSelector((state: RootState) => state.itemCategories)

    useEffect(() => {
        if (fetch) dispatch(fetchAllItemCategories())
    }, [dispatch, fetch])

    return items
}

export default useItemCategories
