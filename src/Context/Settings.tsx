import { createContext, useContext, useState } from "react"
import { useMMKV } from "react-native-mmkv"
import { DropdownOption } from "../Shared/types"

export interface Settings {
    apiKey: string
    debug: boolean
    mainGame: DropdownOption | null
}

interface SettingsContextProps {
    settings: Settings
    updateSetting: <K extends keyof Settings>(setting: K, value: Settings[K]) => void
}

interface SettingsProviderProps {
    children?: React.ReactNode
}

const DEFAULT_SETTINGS: Settings = {
    apiKey: "",
    debug: false,
    mainGame: null,
}


const SettingsContext = createContext<SettingsContextProps | null>(null);

export function SettingsProvider(props: SettingsProviderProps) {

    const storage = useMMKV();
    const mainGameString = storage.getString("settings.mainGame");

    const [settings, setSettings] = useState<Settings>({
        apiKey: storage.getString("settings.apiKey") ?? DEFAULT_SETTINGS.apiKey,
        debug: storage.getBoolean("settings.debug") ?? DEFAULT_SETTINGS.debug,
        mainGame: mainGameString ? JSON.parse(mainGameString) : DEFAULT_SETTINGS.mainGame,
    });

    function updateSetting<K extends keyof Settings>(setting: K, value: Settings[K]) {
        setSettings(prev => {
            const newSettings = Object.assign({}, prev);
            newSettings[setting] = value;
            return newSettings
        });

        const storageString = `settings.${setting}`;

        if (storage.contains(storageString)) {
            storage.delete(storageString);
        }

        if (typeof value === "object") {
            storage.set(storageString, JSON.stringify(value));
        } else {
            storage.set(storageString, value)
        }
    }

    return (
        <SettingsContext.Provider value={{ settings, updateSetting }}>
            {props.children}
        </SettingsContext.Provider>
    )
}

export function useSettings() {
    const settings = useContext(SettingsContext);

    if (!settings) throw new Error("Settings not provided")

    return settings
}
