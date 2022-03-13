import { Button } from "@mui/material"
import styled from "styled-components"

export const PrimaryButton = styled(Button).attrs((props) => ({
    variant: "contained",
}))`
    background-color: var(--primary) !important;
    text-transform: none !important;
    font-size: 1em !important;
`

export const SecondaryButton = styled(Button).attrs((props) => ({
    variant: "outlined",
}))`
    color: var(--primary) !important;
    border-color: var(--primary) !important;
    text-transform: none !important;
    font-size: 1em !important;
`

export const TextButton = styled(Button)`
    color: var(--primary) !important;
    text-transform: none !important;
    font-size: 1em !important;
`
