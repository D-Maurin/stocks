import { yupResolver } from "@hookform/resolvers/yup"
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material"
import { useEffect, useMemo } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { itemsActions } from "../store"
import { flags, Item } from "../store/types"
import { useItems } from "../store/use"
import { PrimaryButton, TextButton } from "../style/Buttons"
import Yup from "../utils/yup"
import FCategory from "./reusable/form/FCategory"
import FCheckboxes from "./reusable/form/FCheckboxes"
import FText from "./reusable/form/FText"
import FormDialogContent from "./reusable/style/FormDialogContent"

const schema = Yup.object({
    name: Yup.string().required().default(""),
    category: Yup.string().uuid().default(""),
    flags: Yup.object().default({}),
})

const defaultValues = schema.getDefault()

const AddItemForm = ({
    open,
    onClose,
    id,
}: {
    open: boolean
    onClose: () => void
    id: string | undefined
}) => {
    const methods = useForm<Omit<Item, "id">>({
        defaultValues,
        resolver: yupResolver(schema),
    })
    const dispatch = useDispatch()

    const onSubmit = (values: Omit<Item, "id">) => {
        if (id) {
            dispatch(
                itemsActions.update({
                    uuid: id,
                    data: values,
                }),
            )
        } else {
            dispatch(itemsActions.create(values))
        }
        onClose()
    }

    const items = useItems()

    useEffect(() => {
        if (!open) return
        const item = id ? items.find((i) => i.id === id) : undefined
        if (item) methods.reset(item)
        else methods.reset(defaultValues)
    }, [methods, open, items, id])

    const options = useMemo(() => Object.keys(flags), [])

    return (
        <FormProvider {...methods}>
            <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
                <DialogTitle>{id ? "Modifier" : "Ajouter"} un item</DialogTitle>
                <FormDialogContent dividers>
                    <FText name="name" label="Nom" />
                    <FCategory name="category" label="Catégorie" />
                    <FCheckboxes
                        name="flags"
                        label="Attributs"
                        options={options}
                        getOptionLabel={(opt) =>
                            (flags as { [key: string]: string })[opt]
                        }
                    />
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

export default AddItemForm
