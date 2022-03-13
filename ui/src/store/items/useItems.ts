import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from ".."
import { fetchAllItems } from "./actions"

const useItems = (fetch = false) => {
    const dispatch = useDispatch()
    const items = useSelector((state: RootState) => state.items)

    useEffect(() => {
        if (fetch) dispatch(fetchAllItems())
    }, [dispatch, fetch])

    return items
}

export default useItems
