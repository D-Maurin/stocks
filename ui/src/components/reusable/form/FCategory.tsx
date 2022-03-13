import { Autocomplete, TextField } from "@mui/material"
import { useMemo } from "react"
import { useController, useFormContext } from "react-hook-form"
import useItemCategories from "../../../store/itemCategories/useItemsCategories"

const FCategory = ({ name, label }: { name: string; label: string }) => {
    const { control } = useFormContext()

    const {
        field: { value, onChange, ref },
        fieldState: { error },
    } = useController({
        name,
        control,
    })

    const categories = useItemCategories()
    const options = useMemo(() => categories.map((cat) => cat.id), [categories])

    return (
        <Autocomplete
            value={value}
            onChange={(event, newValue) => onChange(newValue)}
            options={options}
            renderInput={(params) => (
                <TextField
                    {...params}
                    inputRef={ref}
                    label={label}
                    error={Boolean(error)}
                    helperText={error?.message}
                />
            )}
            getOptionLabel={(option) =>
                categories.find((cat) => cat.id === option)?.name ?? ""
            }
        />
    )
}

export default FCategory
