import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useRef, useState } from "react";
import { ViewProps } from "react-native";
import { AppSettings } from "../Settings/types";

type SettingsContextProps = {
    settings: AppSettings,
    setSettings: React.Dispatch<React.SetStateAction<AppSettings>>
}

export const SettingsContext = createContext<SettingsContextProps>(null);

const APP_SETTINGS: AppSettings = {
    debug: false,
    mainGame: null
}


export function SettingsProvider(props?: ViewProps) {
    const [settings, setSettings] = useState<AppSettings>(APP_SETTINGS);
    const mounted = useRef(false);

    useEffect(() => {
        AsyncStorage.getItem("settings").then((settingsString) => {
            if (settingsString === null) {
                return
            }
            const settingsObject: AppSettings = JSON.parse(settingsString);
            setSettings(settingsObject);
        }).catch((e) => {
            console.error(e)
        }).finally(() => {
            mounted.current = true
        })
    }, [])

    useEffect(() => {
        if (!mounted.current) {
            return
        }
        AsyncStorage.setItem("settings", JSON.stringify(settings));
    }, [settings])

    return (
        <SettingsContext.Provider value={{settings, setSettings}}>
            {props.children}
        </SettingsContext.Provider>
    )
}
