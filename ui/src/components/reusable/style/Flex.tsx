import styled, { css } from "styled-components"

export type Dim = string | boolean | number | undefined

type FlexProps = {
    column?: boolean
    reverse?: boolean
    gap?: Dim
    padding?: Dim | Dim[]
    childrenFlex?: string[]
    align?: "center"
}

export const getDim = (d: Dim, defaultDim: string) => {
    switch (typeof d) {
        case "string":
            return d
        case "number":
            return `${d}px`
        case "boolean":
            return d ? defaultDim : "0"
    }
    return "0"
}

const Flex = styled.div<FlexProps>`
    display: flex;

    flex-direction: ${({ column = false, reverse = false }) =>
        column
            ? reverse
                ? "column-reverse"
                : "column"
            : reverse
            ? "row-reverse"
            : "row"};

    gap: ${({ gap }) => getDim(gap, "1rem")};

    padding: ${({ padding }) =>
        Array.isArray(padding)
            ? padding.map((p) => getDim(p, "1rem")).join(" ")
            : getDim(padding, "1rem")};

    ${({ childrenFlex }) =>
        childrenFlex &&
        childrenFlex.map(
            (val, index) => css`
                & > *:nth-child(${index + 1}) {
                    flex: ${val};
                }
            `,
        )}

    ${({ align }) =>
        align &&
        css`
            align-items: ${align};
        `}
    
    ${({ onClick }) =>
        onClick &&
        css`
            cursor: pointer;
        `}
`

export default Flex
