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

const SavedTournamentsContext = createContext<SavedTournamentsContextProps | null>(null);

export function SavedTournamentsProvider(props: SavedTournamentsProviderProps) {

    const storageString = "saved.tournaments";

    const storage = useMMKV();
    const [saved, _saved] = useState<SavedTournaments>([]);
    // const [saved, updateSaved] = useMMKVObject<SavedTournaments>("saved.tournaments");

    function updateSaved(newSaved: SavedTournaments) {

        _saved(newSaved);

        if (storage.contains(storageString)) {
            storage.delete(storageString);
        }

        storage.set(storageString, JSON.stringify(newSaved));
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
