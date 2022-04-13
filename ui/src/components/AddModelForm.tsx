import { yupResolver } from "@hookform/resolvers/yup"
import { Dialog, DialogActions, DialogTitle } from "@mui/material"
import { useEffect } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { modelsActions } from "../store"
import { Model } from "../store/types"
import { useModels } from "../store/use"
import { PrimaryButton, TextButton } from "../style/Buttons"
import Yup from "../utils/yup"
import FContent from "./FContent"
import FText from "./reusable/form/FText"
import FormDialogContent from "./reusable/style/FormDialogContent"

const schema = Yup.object({
    name: Yup.string().required().default(""),
    content: Yup.object().default({}),
})

const defaultValues = schema.getDefault()

const AddModelForm = ({
    open,
    onClose,
    id,
}: {
    open: boolean
    onClose: () => void
    id: string | undefined
}) => {
    const methods = useForm<Omit<Model, "id">>({
        defaultValues,
        resolver: yupResolver(schema),
    })
    const dispatch = useDispatch()

    const onSubmit = (values: Omit<Model, "id">) => {
        if (id) {
            dispatch(
                modelsActions.update({
                    uuid: id,
                    data: values,
                }),
            )
        } else {
            dispatch(modelsActions.create(values))
        }
        onClose()
    }

    const models = useModels()

    useEffect(() => {
        if (!open) return
        const model = id ? models.find((i) => i.id === id) : undefined
        if (model) methods.reset(model)
        else methods.reset(defaultValues)
    }, [methods, open, models, id])

    return (
        <FormProvider {...methods}>
            <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
                <DialogTitle>
                    {id ? "Modifier" : "Ajouter"} un modèle
                </DialogTitle>
                <FormDialogContent dividers>
                    <FText name="name" label="Nom" />
                    <FContent name="content" label="Contenu" />
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

export default AddModelForm
