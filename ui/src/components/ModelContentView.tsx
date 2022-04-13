import { Paper } from "@mui/material"
import _ from "lodash"
import { useMemo } from "react"
import styled from "styled-components"
import { ModelContent } from "../store/types"
import { useItemCategories, useItems } from "../store/use"
import Flex from "./reusable/style/Flex"
import Font from "./reusable/style/Font"

const SPaper = styled(Paper)<{ $color: string }>`
    border-left: solid ${({ $color }) => $color} 4px;
`

const ModelContentView = ({ modelContent }: { modelContent: ModelContent }) => {
    const items = useItems()
    const categories = useItemCategories()

    const detail = useMemo(
        () =>
            _.groupBy(
                _.sortBy(
                    Object.entries(modelContent).map(([itemId, itemQ]) => {
                        return {
                            item: items.find((i) => i.id === itemId),
                            quantity: itemQ,
                        }
                    }),
                    "item.name",
                ),
                "item.category",
            ),
        [items, modelContent],
    )

    const sortedCategories = useMemo(
        () => _.sortBy(categories, "name"),
        [categories],
    )

    return (
        <Flex column padding={["4px", true, true, true]} gap>
            {sortedCategories.map((cat) => {
                const category = categories.find((c) => c.id === cat.id)
                const d = detail[cat.id]

                if (!d) return null

                return (
                    <SPaper $color={category?.color ?? "black"}>
                        <Flex column>
                            <Flex padding={[4, 8]}>
                                <Font color={category?.color ?? "black"}>
                                    {category?.name}
                                </Font>
                            </Flex>
                            <Flex column>
                                {d.map(({ item, quantity }) => (
                                    <Flex
                                        gap
                                        childrenFlex={[
                                            "1",
                                            "100px 0 0",
                                            "100px 0 0",
                                        ]}
                                        padding={[4, 8]}
                                    >
                                        <Font>{item?.name}</Font>
                                        <Font>Min : {quantity.min}</Font>
                                        <Font>Initial : {quantity.init}</Font>
                                    </Flex>
                                ))}
                            </Flex>
                        </Flex>
                    </SPaper>
                )
            })}
        </Flex>
    )
}

export default ModelContentView
