import styled, { css } from "styled-components"
import { Dim, getDim } from "./Flex"

type FontProps = { fontSize?: number; color?: string }

const Font = styled.span<FontProps>`
    ${({ fontSize }) =>
        fontSize &&
        css`
            font-size: ${fontSize}em;
        `};
    ${({ color }) =>
        color &&
        css`
            color: ${color};
        `};
`

export default Font
