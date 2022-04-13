import { PrimaryButton } from "../style/Buttons"
import Header from "./reusable/Header"
import AddIcon from "@mui/icons-material/Add"
import { useState } from "react"
import AddModelForm from "./AddModelForm"
import Flex from "./reusable/style/Flex"
import { Collapse, IconButton, Paper } from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import Font from "./reusable/style/Font"
import DeleteIcon from "@mui/icons-material/Delete"
import { useDispatch } from "react-redux"
import ModelContentView from "./ModelContentView"
import { modelsActions } from "../store"
import { useModels } from "../store/use"

const ModelsTable = () => {
    const [addModel, setAddModel] = useState<{
        open: boolean
        id: string | undefined
    }>({
        open: false,
        id: undefined,
    })

    const dispatch = useDispatch()

    const models = useModels()

    const [open, setOpen] = useState<string>()

    return (
        <>
            <Header
                title="Modèles"
                buttons={
                    <>
                        <PrimaryButton
                            startIcon={<AddIcon />}
                            onClick={() =>
                                setAddModel({ open: true, id: undefined })
                            }
                        >
                            Ajouter un modèle
                        </PrimaryButton>
                    </>
                }
            />
            <Flex column gap={10} padding>
                {models.map((model) => {
                    return (
                        <Paper>
                            <Flex column>
                                <Flex
                                    align="center"
                                    childrenFlex={["1"]}
                                    padding={[8, 8, 8, 16]}
                                    onClick={() =>
                                        setOpen(
                                            model.id === open
                                                ? undefined
                                                : model.id,
                                        )
                                    }
                                >
                                    <Font fontSize={1.2}>{model.name}</Font>
                                    <IconButton
                                        onClick={(ev) => {
                                            ev.stopPropagation()
                                            setAddModel({
                                                open: true,
                                                id: model.id,
                                            })
                                        }}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        onClick={() =>
                                            dispatch(
                                                modelsActions.delete(model.id),
                                            )
                                        }
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Flex>
                                <Collapse in={open === model.id}>
                                    <ModelContentView
                                        modelContent={model.content}
                                    />
                                </Collapse>
                            </Flex>
                        </Paper>
                    )
                })}
            </Flex>
            <AddModelForm
                id={addModel.id}
                open={addModel.open}
                onClose={() =>
                    setAddModel({
                        open: false,
                        id: addModel.id,
                    })
                }
            />
        </>
    )
}

export default ModelsTable
