import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useSavedTournaments } from "../../Context/SavedTournaments";
import { useSavedTournamentsQuery } from "../../gql/gql";

// import { useSavedTournamentsQuery } from "../../gql/gql";

import { truthyFilter } from "../../helper";
import { SavedTournamentsScreenProps } from "../../navTypes";
import { CenterMessage } from "../../Shared";
import { IoniconsThemed } from "../../Shared/IconTheme";
import { CustomText } from "../../Shared/Text";
import { TournamentView } from "./TournamentView";

export function SavedTournamentsPage({ navigation, route }: SavedTournamentsScreenProps) {
    // Tipped off 14, TBH 11, SSC '23, Shine '23
    // const saved = ["511041", "548572", "470565", "540064"];

    // const { data, status } = useSavedTournamentsQuery({ ids: saved });
    const { saved, updateSaved } = useSavedTournaments();
    const { data, status } = useSavedTournamentsQuery({ ids: saved });



    const [selectionMode, setSelectionMode] = useState(false);
    const [selected, setSelected] = useState<string[]>([]);

    if (status === "loading") return <CenterMessage message="Loading..." />
    if (status === "error") return <CenterMessage message="Error loading tournaments" icon={<IoniconsThemed name="alert" />} />

    const tournaments = data.tournaments?.nodes?.filter(truthyFilter) ?? [];

    const navigateToTournament = (tournament: string) => {
        navigation.navigate("Tournament", { id: tournament });
    }
    const toggleMode = () => setSelectionMode(prev => !prev);

    const startSelection = (tournament: string) => {
        toggleMode();
        toggleTournament(tournament);
    }

    const toggleTournament = (tournament: string) => {
        setSelected(prevSelected => {

            if (prevSelected.includes(tournament)) {
                const newState = prevSelected.filter(id => id !== tournament);

                if (newState.length === 0) setSelectionMode(false);

                return newState
            }

            const newState = JSON.parse(JSON.stringify(prevSelected));
            newState.push(tournament);
            return newState;
        })
    }

    return (
        <View>
            <FlatList
                data={tournaments}
                renderItem={({ item }) => {

                    if (!item.id) return null

                    return <TournamentView data={item} height={200}
                        selected={selected.includes(item.id)}
                        onPress={selectionMode ? toggleTournament : navigateToTournament}
                        longPress={selectionMode ? undefined : startSelection} />
                }}
                numColumns={2}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    center: {
        justifyContent: "center",
        alignItems: "center"
    }
})
