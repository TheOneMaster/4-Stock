import { StyleSheet, View } from "react-native";
import { SavedTournamentsScreenProps } from "../../navTypes";
import { useSavedTournaments } from "./tournamentsHook";
import { useSavedTournamentsQuery } from "../../gql/gql";
import { CustomText } from "../../Shared/Text";
import { FlatList } from "react-native-gesture-handler";
import { IoniconsThemed } from "../../Shared/IconTheme";
import { truthyFilter } from "../../helper";
import { TournamentView } from "./TournamentView";

export function SavedTournamentsPage({navigation, route}: SavedTournamentsScreenProps) {
    // const [saved, setSaved] = useSavedTournaments();

    const saved = ["511041", "548572", "470565", "540064"];

    const {data, status} = useSavedTournamentsQuery({ids: saved});


    if (status === "loading") {
        return (
            <View style={styles.center}>
                <CustomText>Loading...</CustomText>
            </View>
        )
    }

    if (status === "error") {
        return (
            <View>
                <IoniconsThemed name="alert" />
                <CustomText>Error Loading Tournaments</CustomText>
            </View>
        )
    }

    const tournaments = data.tournaments?.nodes?.filter(truthyFilter) ?? [];
    console.log(tournaments)

    return (
        <View>
            {/* <CustomText>Loaded Tournaments</CustomText> */}
            <FlatList
                data={tournaments}
                renderItem={({item}) => <TournamentView data={item} height={200} /> }
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
