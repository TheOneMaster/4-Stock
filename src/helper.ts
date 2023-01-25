import { NativeModules, Platform } from "react-native";

export function convertDateToString(date: number): string {

    const options = {
        year: "numeric",
        month: 'long',
        day: 'numeric'
    } as const;

    const given_date = new Date(date * 1000);

    const locale: string = (Platform.OS === 'ios') ?
        NativeModules.SettingsManager.settings.AppleLanguages[0] || NativeModules.SettingsManager.settings.AppleLocale :
        NativeModules.I18nManager.localeIdentifier;

    return given_date.toLocaleDateString(locale, options);
}
