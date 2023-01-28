import { DefaultTheme, DarkTheme, Theme } from "@react-navigation/native";


interface CustomTheme extends Theme{
    colors: Theme['colors'] & {
        secondaryText: string
        link: string,
        card2: string
        // card3: string,
        // card4: string
    }
}

export const customLightTheme: CustomTheme = {
    dark: false,
    colors: {
        ...DefaultTheme.colors,
        secondaryText: "rgb(148, 163, 184)",
        link: 'blue',
        card2: ''
    }
}

export const customDarkTheme: CustomTheme = {
    dark: true,
    colors: {
        ...DarkTheme.colors,
        secondaryText: 'rgb(75, 85, 99)',
        link: '#1e90ff',
        card2: ''
    }
}

declare module '@react-navigation/native' {
    export function useTheme(): CustomTheme
}
