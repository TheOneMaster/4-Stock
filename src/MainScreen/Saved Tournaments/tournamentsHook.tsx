import { useMMKVObject } from "react-native-mmkv";

export function useSavedTournaments() {
    const [saved, setSaved] = useMMKVObject<number[]>("saved.tournaments");
    const returnArr = [saved ?? [], setSaved] as const;
    return returnArr
}
