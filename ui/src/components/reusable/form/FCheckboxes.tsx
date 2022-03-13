import {
    FormControl,
    FormLabel,
    FormGroup,
    FormControlLabel,
    Checkbox,
    FormHelperText,
} from "@mui/material"
import { useFormContext, useController } from "react-hook-form"

const FCheckboxes = ({
    name,
    label,
    options,
    getOptionLabel = (t: string) => t,
}: {
    name: string
    label: string
    options: string[]
    getOptionLabel?: (t: string) => string
}) => {
    const { control } = useFormContext()

    const {
        field: { value, onChange },
        fieldState: { error },
    } = useController({
        name,
        control,
    })

    return (
        <FormControl component="fieldset" variant="standard">
            <FormLabel component="legend">{label}</FormLabel>
            <FormGroup>
                {options.map((option) => (
                    <FormControlLabel
                        key={option}
                        control={
                            <Checkbox
                                checked={value?.[option]}
                                onChange={(event, checked) =>
                                    onChange({
                                        ...value,
                                        [option]: checked,
                                    })
                                }
                                name={option}
                            />
                        }
                        label={getOptionLabel(option)}
                    />
                ))}
            </FormGroup>
            <FormHelperText>{error?.message}</FormHelperText>
        </FormControl>
    )
}

export default FCheckboxes
