export interface DropdownOption {
    label: string,
    value: number
}

export interface AppSettings {
    general: {
        debug: boolean
        mainGame: DropdownOption
        apiKey: string
    },
    theme: {
        baseCol: string
    }
}
