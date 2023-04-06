import { useMMKV, useMMKVBoolean, useMMKVObject, useMMKVString } from "react-native-mmkv";
import { AppSettings, DropdownOption } from "./types";

export default function useSettings() {

    // General settings
    const [debug, _debug] = useMMKVBoolean("general.debug");
    const [mainGame, _mainGame] = useMMKVObject<DropdownOption>("general.mainGame");
    const [apiKey, _apiKey] = useMMKVString("general.apiKey");

    const settingsObject: AppSettings = {
        general: {
            debug: debug ?? false,
            mainGame: mainGame ?? null,
            apiKey: apiKey ?? ""
        },
        theme: {
            baseCol: ""
        }
    }

    return settingsObject
}
