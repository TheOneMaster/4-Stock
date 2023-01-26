import { DefaultTheme, DarkTheme, Theme } from "@react-navigation/native";


interface CustomTheme extends Theme{
    colors: Theme['colors'] & {
        secondaryText: string
        link: string,
    }
}

export const customLightTheme: CustomTheme = {
    dark: false,
    colors: {
        ...DefaultTheme.colors,
        secondaryText: "",
        link: 'blue'
    }
}

export const customDarkTheme: CustomTheme = {
    dark: true,
    colors: {
        ...DarkTheme.colors,
        secondaryText: '',
        link: '#1e90ff',
    }
}

declare module '@react-navigation/native' {
    export function useTheme(): CustomTheme
}
