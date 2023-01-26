import { NativeModules, Platform } from "react-native";

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
