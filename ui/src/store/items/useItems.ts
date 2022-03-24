import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from ".."
import { fetchAllItems } from "./actions"

const useItems = () => {
    const items = useSelector((state: RootState) => state.items)
    return items
}

export const useLoadItems = () => {
    const [ready, setReady] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        const load = async () => {
            await dispatch(fetchAllItems())
            setReady(true)
        }
        load()
    }, [dispatch])

    return ready
}

export default useItems
