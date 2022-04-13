import { useSelector } from "react-redux"
import { RootState } from "."

export const useItems = () => {
    const items = useSelector((state: RootState) => state.items)
    return items
}

export const useItemCategories = () => {
    const itemCategories = useSelector(
        (state: RootState) => state.itemCategories,
    )
    return itemCategories
}

export const useModels = () => {
    const models = useSelector((state: RootState) => state.models)
    return models
}
