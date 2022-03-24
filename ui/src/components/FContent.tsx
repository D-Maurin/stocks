import { useFormContext, useController } from "react-hook-form"
import useItems from "../store/items/useItems"
import { ModelContent } from "../store/models/type"
import { PrimaryButton } from "../style/Buttons"

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

    return (
        <>
            {(value as ModelContent).map((i) => {
                return <div>{items.find((item) => item.id === i.id)?.name}</div>
            })}

            <PrimaryButton
                onClick={() =>
                    onChange([...value, { id: items[0].id, min: 3, init: 4 }])
                }
            >
                test
            </PrimaryButton>
        </>
    )
}

export default FContent
