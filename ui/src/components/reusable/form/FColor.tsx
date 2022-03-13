import QuestionMarkIcon from "@mui/icons-material/QuestionMark"
import { IconButton, Popover, TextField } from "@mui/material"
import { useRef, useState } from "react"
import { HexColorPicker } from "react-colorful"
import { useController, useFormContext } from "react-hook-form"
import styled from "styled-components"

export const isColorValid = (color: string | undefined) =>
    Boolean(color?.match(/^#[0-9a-f]{3}([0-9a-f]|[0-9a-f]{3})$/))

const ColorIndicator = styled.div<{ $color: string }>`
    background-color: ${({ $color }) =>
        isColorValid($color) ? $color : "lightgrey"};
    min-width: 28px;
    max-width: 28px;
    min-height: 28px;
    max-height: 28px;
    border-radius: 14px;
    cursor: pointer;
`

const NoPaddingIconButton = styled(IconButton)`
    padding: 0;
`

const ColorSelector = styled.div`
    & .react-colorful__saturation {
        border-radius: 4px 4px 0 0 !important;
    }
    & .react-colorful__last-control {
        border-radius: 0 0 4px 4px !important;
    }
`

const FColor = ({ name, label }: { name: string; label: string }) => {
    const { control } = useFormContext()

    const {
        field: { value, onChange, ref },
        fieldState: { error },
    } = useController({
        name,
        control,
    })

    const fieldRef = useRef<HTMLDivElement>(null)
    const [open, setOpen] = useState(false)

    return (
        <>
            <TextField
                ref={fieldRef}
                error={Boolean(error)}
                helperText={error?.message}
                value={value ? value : ""}
                onChange={onChange}
                inputRef={ref}
                label={label}
                InputProps={{
                    endAdornment: (
                        <NoPaddingIconButton onClick={() => setOpen(true)}>
                            <ColorIndicator $color={value}>
                                {!isColorValid(value) && (
                                    <QuestionMarkIcon fontSize="small" />
                                )}
                            </ColorIndicator>
                        </NoPaddingIconButton>
                    ),
                }}
            />
            <Popover
                open={open}
                anchorEl={fieldRef.current}
                onClose={() => setOpen(false)}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                PaperProps={{
                    style: {
                        overflow: "visible",
                    },
                }}
            >
                <ColorSelector>
                    <HexColorPicker
                        color={value}
                        onChange={(val) => onChange(val)}
                    />
                </ColorSelector>
            </Popover>
        </>
    )
}

export default FColor
