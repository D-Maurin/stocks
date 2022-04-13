import CloseIcon from "@mui/icons-material/Close"
import DoneIcon from "@mui/icons-material/Done"
import { IconButton } from "@mui/material"
import _ from "lodash"
import { useMemo } from "react"
import {
    FormProvider,
    useController,
    useForm,
    useFormContext,
} from "react-hook-form"
import { ModelContent } from "../store/types"
import { useItems } from "../store/use"
import FItem from "./reusable/form/FItem"
import FText from "./reusable/form/FText"
import Flex from "./reusable/style/Flex"
import Font from "./reusable/style/Font"

const FContent = ({ name, label }: { name: string; label: string }) => {
    const { control } = useFormContext()

    const {
        field: { value, onChange, ref },
        fieldState: { error },
    } = useController({
        name,
        control,
    })

    const items = useItems()
    console.log(items)

    const methods = useForm()

    const onSubmit = (values: any) => {
        onChange({
            ...value,
            [values.item.id]: {
                min: values.min,
                init: values.init,
            },
        })
    }

    const sortedContent = useMemo(() => {
        return Object.entries(value as ModelContent)
    }, [value])

    return (
        <>
            {sortedContent.map(([itemId, itemQ]) => {
                return (
                    <Flex
                        align="center"
                        gap={5}
                        childrenFlex={["1", "70px 0 0", "70px 0 0"]}
                    >
                        <Font>
                            {items.find((item) => item.id === itemId)?.name}
                        </Font>
                        <FText
                            name={`${name}.${itemId}.min`}
                            label="Min"
                            small
                        />
                        <FText
                            name={`${name}.${itemId}.init`}
                            label="Initial"
                            small
                        />
                        <IconButton
                            onClick={() => onChange(_.omit(value, [itemId]))}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Flex>
                )
            })}

            <FormProvider {...methods}>
                <Flex
                    align="center"
                    gap={5}
                    childrenFlex={["1", "70px 0 0", "70px 0 0"]}
                >
                    <FItem name="item" label="Article" small />
                    <FText name="min" label="Min" small />
                    <FText name="init" label="Initial" small />
                    <IconButton onClick={methods.handleSubmit(onSubmit)}>
                        <DoneIcon />
                    </IconButton>
                </Flex>
            </FormProvider>
        </>
    )
}

export default FContent
