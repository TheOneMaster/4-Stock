import { createContext, useContext, useState } from "react"
import { useMMKV } from "react-native-mmkv"
import { DropdownOption } from "../Shared/types"

interface Settings {
    apiKey: string
    debug: boolean
    mainGame: DropdownOption[]
}

interface SettingsContextProps {
    settings: Settings
    updateSetting: <K extends keyof Settings>(setting: K, value: Settings[K]) => void
}

interface SettingsProviderProps {
    children?: React.ReactNode
}

const SettingsContext = createContext<SettingsContextProps | null>(null);

export function SettingsProvider(props: SettingsProviderProps) {

    const [settings, setSettings] = useState<Settings>({
        apiKey: "",
        debug: false,
        mainGame: []
    });

    const storage = useMMKV();

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
