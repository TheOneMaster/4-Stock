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
};

export function addMonthsToDate(date: Date, months=1) {
    const dateTemp = new Date();
    dateTemp.setMonth(date.getMonth() + months);
    return dateTemp;
}

export function cleanObject<T extends Object>(obj: T): Partial<T> {
    return Object.keys(obj).reduce((prev, cur) => {
        const valueUndefined = obj[cur] === undefined;
        const valueEmptyObject = typeof obj[cur] === 'object' && Object.keys(obj[cur]).length === 0;

        if (valueUndefined || valueEmptyObject) {
            return prev
        }
        prev[cur] = obj[cur];
        return prev
    }, {});
}

export function getNumberOrdinal(num: number) {
    var j = num % 10,
        k = num % 100;
    if (j == 1 && k != 11) {
        return num + "st";
    }
    if (j == 2 && k != 12) {
        return num + "nd";
    }
    if (j == 3 && k != 13) {
        return num + "rd";
    }
    return num + "th";
}
