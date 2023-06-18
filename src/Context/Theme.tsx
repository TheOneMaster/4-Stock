import React, { createContext, useState } from "react";
import { ColorValue } from "react-native";

export interface UIThemeOptions {
    baseColor: ColorValue
    secondaryColor: ColorValue
    backgroundColor: ColorValue
}

interface ThemeContextProps {
    theme: UIThemeOptions
    changeTheme: (newTheme: UIThemeOptions) => void
}

interface ThemeProviderProps {
    children: React.ReactNode
}

const ThemeContext = createContext<ThemeContextProps | null>(null);


export function ThemeProvider(props: ThemeProviderProps) {
    const [theme, setTheme] = useState<UIThemeOptions>({
        baseColor: "#7DF9FF",
        secondaryColor: "gold",
        backgroundColor: "black"
    });

    return (
        <ThemeContext.Provider value={{ theme, changeTheme: setTheme }}>
            {props.children}
        </ThemeContext.Provider>
    )
}
