import { useState } from "react";
import { Modal, StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { CenterMessage } from "../../Shared";
import { IoniconsThemed } from "../../Shared/IconTheme";
import { CustomText } from "../../Shared/Text";
import { useSavedTournamentsQuery } from "../../gql/gql";
import { truthyFilter } from "../../helper";
import { SavedTournamentsScreenProps } from "../../navTypes";
import { TournamentView } from "./TournamentView";

export function SavedTournamentsPage({navigation, route}: SavedTournamentsScreenProps) {
    // Tipped off 14, TBH 11, SSC '23, Shine '23
    const saved = ["511041", "548572", "470565", "540064"];

    const {data, status} = useSavedTournamentsQuery({ids: saved});

    if (status === "loading") return <CenterMessage message="Loading..." />
    if (status === "error") return <CenterMessage message="Error loading tournaments" icon={<IoniconsThemed name="alert" />} />

    const tournaments = data.tournaments?.nodes?.filter(truthyFilter) ?? [];

    return (
        <View>
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
