export type ItemCategory = {
    id: string
    name: string
    color: string
}

export const flags = {
    perishable: "Périssable",
    useonce: "Usage unique",
    electronic: "Électronique",
}

export type Item = {
    id: string
    name: string
    category: string
    flags: {
        [key in keyof typeof flags]?: boolean
    }
}

export type ModelContent = {
    [key: string]: {
        min: number
        init: number
    }
}

export type Model = {
    id: string
    name: string
    content: ModelContent
}
