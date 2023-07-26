import { createContext, useContext, useState } from "react";
import { useMMKV } from "react-native-mmkv";


export type SavedTournaments = string[]

export type SavedTournamentsContextProps = {
    saved: SavedTournaments
    updateSaved: (saved: SavedTournaments) => void
}

type SavedTournamentsProviderProps = {
    children?: React.ReactNode
}


const STORAGE_STRING = "saved.tournaments";
const SavedTournamentsContext = createContext<SavedTournamentsContextProps | null>(null);

export function SavedTournamentsProvider(props: SavedTournamentsProviderProps) {
    const storage = useMMKV();
    const initSaved: SavedTournaments = storage.contains(STORAGE_STRING) ? JSON.parse(storage.getString(STORAGE_STRING)!) : [];
    const [saved, _saved] = useState<SavedTournaments>(initSaved);

    function updateSaved(newSaved: SavedTournaments) {
        _saved(newSaved);

        if (storage.contains(STORAGE_STRING)) {
            storage.delete(STORAGE_STRING);
        }

        storage.set(STORAGE_STRING, JSON.stringify(newSaved));
    }

    return (
        <SavedTournamentsContext.Provider value={{ saved, updateSaved }}>
            {props.children}
        </SavedTournamentsContext.Provider>
    )
}

export function useSavedTournaments() {
    const savedTournaments = useContext(SavedTournamentsContext);

    if (!savedTournaments) throw new Error("Saved Tournaments could not be loaded");

    return savedTournaments
}
