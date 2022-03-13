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
