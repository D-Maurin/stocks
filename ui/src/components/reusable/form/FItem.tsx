import { Autocomplete, TextField } from "@mui/material"
import _ from "lodash"
import { useMemo } from "react"
import { useFormContext, useController } from "react-hook-form"
import { useItems, useItemCategories } from "../../../store/use"

const FItem = ({
    name,
    label,
    small,
}: {
    name: string
    label: string
    small?: boolean
}) => {
    const items = useItems()
    const itemCategories = useItemCategories()

    const allItems = useMemo(
        () => _.sortBy(_.sortBy(items, "name"), "category"),
        [items],
    )

    const { control } = useFormContext()

    const {
        field: { value, onChange, ref },
        fieldState: { error },
    } = useController({
        name,
        control,
    })

    return (
        <Autocomplete
            size={small ? "small" : undefined}
            fullWidth
            value={value}
            onChange={(event, newValue) => onChange(newValue)}
            options={allItems}
            groupBy={(item) =>
                itemCategories.find((c) => c.id === item.category)?.name ?? ""
            }
            getOptionLabel={(item) => item.name}
            renderInput={(params) => (
                <TextField
                    {...params}
                    inputRef={ref}
                    label={label}
                    error={Boolean(error)}
                    helperText={error?.message}
                />
            )}
        />
    )
}

export default FItem
