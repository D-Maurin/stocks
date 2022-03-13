import { yupResolver } from "@hookform/resolvers/yup"
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material"
import { useEffect } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import {
    createItemCategory,
    updateItemCategory,
} from "../store/itemCategories/actions"
import { ItemCategory } from "../store/itemCategories/type"
import useItemCategories from "../store/itemCategories/useItemsCategories"
import { PrimaryButton, TextButton } from "../style/Buttons"
import Yup from "../utils/yup"
import FColor, { isColorValid } from "./reusable/form/FColor"
import FText from "./reusable/form/FText"
import FormDialogContent from "./reusable/style/FormDialogContent"

const schema = Yup.object({
    name: Yup.string().required().default(""),
    color: Yup.string()
        .required()
        .test("is-color", "La couleur n'est pas valide", isColorValid)
        .default(""),
})

const defaultValues = schema.getDefault()

const AddCategoryForm = ({
    open,
    onClose,
    id,
}: {
    open: boolean
    onClose: () => void
    id: string | undefined
}) => {
    const methods = useForm<Omit<ItemCategory, "id">>({
        defaultValues,
        resolver: yupResolver(schema),
    })
    const dispatch = useDispatch()

    const onSubmit = (values: Omit<ItemCategory, "id">) => {
        if (id) {
            dispatch(
                updateItemCategory({
                    uuid: id,
                    data: values,
                }),
            )
        } else {
            dispatch(createItemCategory(values))
        }
        onClose()
    }

    const categories = useItemCategories()

    useEffect(() => {
        if (!open) return
        const category = id ? categories.find((i) => i.id === id) : undefined
        if (category) methods.reset(category)
        else methods.reset(defaultValues)
    }, [methods, open, categories, id])

    return (
        <FormProvider {...methods}>
            <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
                <DialogTitle>
                    {id ? "Modifier" : "Ajouter"} une catégorie
                </DialogTitle>
                <FormDialogContent dividers>
                    <FText name="name" label="Nom" />
                    <FColor name="color" label="Couleur" />
                </FormDialogContent>
                <DialogActions>
                    <TextButton variant="text" onClick={onClose}>
                        Annuler
                    </TextButton>
                    <PrimaryButton
                        variant="contained"
                        onClick={methods.handleSubmit(onSubmit)}
                    >
                        {id ? "Modifier" : "Ajouter"}
                    </PrimaryButton>
                </DialogActions>
            </Dialog>
        </FormProvider>
    )
}

export default AddCategoryForm
