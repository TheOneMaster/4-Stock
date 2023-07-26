import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useSavedTournaments } from "../../Context/SavedTournaments";
import { useSavedTournamentsQuery } from "../../gql/gql";

import { TournamentView } from "./TournamentView";
import { truthyFilter } from "../../helper";
import { SavedTournamentsScreenProps } from "../../navTypes";
import { CenterMessage } from "../../Shared";
import { IoniconsThemed } from "../../Shared/IconTheme";

export function SavedTournamentsPage({ navigation, route }: SavedTournamentsScreenProps) {
    const { saved } = useSavedTournaments();
    const { data, status } = useSavedTournamentsQuery({ ids: saved });

    if (status === "loading") return <CenterMessage message="Loading..." />
    if (status === "error") return <CenterMessage message="Error loading tournaments" icon={<IoniconsThemed name="alert" />} />

    const tournaments = data.tournaments?.nodes?.filter(truthyFilter) ?? [];

    const navigateToTournament = (tournament: string) => {
        navigation.navigate("Tournament", { id: tournament });
    }

    return (
        <View>
            <FlatList
                data={tournaments}
                renderItem={({ item }) => {

                    if (!item.id) return null

                    return <TournamentView data={item} height={200} onPress={navigateToTournament} />
                }}
                numColumns={2}
            />
        </View>
    )
}
