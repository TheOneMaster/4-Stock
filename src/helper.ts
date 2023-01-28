import { NativeModules, Platform } from "react-native";
import { APIVariables, StorageVariables } from "./types";

export function convertDateToString(date: number): string {
    const given_date = new Date(date * 1000);

    // Unnecessary for now. Might need this later if localeDateString stops working. Previously stopped working because
    // React-Native uses a very old version of JavascriptCore. Fixed by changing to the Hermes engine.
    // 
    // Issue: https://github.com/facebook/react-native/issues/15717
    // Fix: https://docs.expo.dev/guides/using-hermes/
    // 
    // const locale: string = (Platform.OS === 'ios') ?
    //     NativeModules.SettingsManager.settings.AppleLanguages[0] || NativeModules.SettingsManager.settings.AppleLocale :
    //     NativeModules.I18nManager.localeIdentifier;

    return given_date.toLocaleDateString();
}

export function convertDateToUnixSeconds(date: Date): number {
    return Math.floor(date.getTime() / 1000)
}

export function convertStorageToAPI(params: Partial<StorageVariables>): Partial<APIVariables> {

    const final: APIVariables = {};

    for (const variable in params) {
        const value = params[variable];
        if (value instanceof Date) {
            final[variable] = convertDateToUnixSeconds(value);
            continue;
        }
        final[variable] = value;
    }

    return final
}
