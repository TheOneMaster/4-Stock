import { Rubik_400Regular, Rubik_700Bold } from "@expo-google-fonts/rubik";
import { DefaultTheme, DarkTheme, Theme } from "@react-navigation/native";
import { useFonts } from "expo-font";

import Anuphan from "../assets/fonts/Anuphan.ttf"

interface CustomTheme extends Theme {
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
        card2: '#FFF'
    }
}

export const customDarkTheme: CustomTheme = {
    dark: true,
    colors: {
        ...DarkTheme.colors,
        secondaryText: 'rgb(75, 85, 99)',
        link: '#1e90ff',
        card2: '#242424'
    }
}

declare module '@react-navigation/native' {
    export function useTheme(): CustomTheme
}

const fontMap = {
    "Rubik": Rubik_400Regular,
    "Rubik_bold": Rubik_700Bold,
    "Anuphan": Anuphan
}

export function useApplicationFonts() {
    const [fontsLoaded] = useFonts(fontMap)
    return fontsLoaded
}

export type FontFamily = keyof typeof fontMap | "monospace" | "serif" | "sans-serif"
