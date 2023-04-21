import { APIVariables, StorageVariables } from "./types";

export function convertAPITimeToDate(date: number): Date {
    return new Date(date * 1000);
}

export function convertDateToString(date: number): string {
    const given_date = convertAPITimeToDate(date);

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

export function convertStorageToAPI(params: StorageVariables): APIVariables {

    const final: APIVariables = {
        name: params.name,
        afterDate: params.afterDate ? convertDateToUnixSeconds(params.afterDate) : undefined,
        beforeDate: params.beforeDate ? convertDateToUnixSeconds(params.beforeDate) : undefined,
        location: params.location,
        page: params.page,
        perPage: params.perPage
    }

    return final
};

export function getNumberOrdinal(num: number | null): string {

    if (num === null) return ""

    let tens = num % 10;
    let hundreds = num % 100;

    if (tens == 1 && hundreds != 11) {
        return num + "st";
    }
    if (tens == 2 && hundreds != 12) {
        return num + "nd";
    }
    if (tens == 3 && hundreds != 13) {
        return num + "rd";
    }
    return num + "th";
}

export function truthyFilter<T>(x: T | null | undefined): x is T {
    return !!x
}

type IDType = {
    id: string | null
}

export function checkID<T extends IDType>(x: T | null | undefined): x is T & { id: string } {
    return !!x?.id;
}
