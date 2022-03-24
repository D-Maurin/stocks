import { PrimaryButton } from "../style/Buttons"
import Header from "./reusable/Header"
import AddIcon from "@mui/icons-material/Add"
import { useState } from "react"
import AddModelForm from "./AddModelForm"

const ModelsTable = () => {
    const [addModel, setAddModel] = useState<{
        open: boolean
        id: string | undefined
    }>({
        open: false,
        id: undefined,
    })

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
