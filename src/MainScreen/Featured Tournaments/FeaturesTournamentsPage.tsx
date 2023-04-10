import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { useQueryClient } from "@tanstack/react-query";
import { FlatList, StyleSheet, View } from "react-native";

import { useFeaturedTournamentsQuery } from "../../gql/gql";

import LargeTournamentCard from "./LargeTournamentCard";

import { FeaturedTournamentsScreenProps } from "../../navTypes";
import { MainText } from "../../Shared";


function FeaturedTournamentsPage({ navigation, route }: FeaturedTournamentsScreenProps) {

    const { data, isLoading, isError } = useFeaturedTournamentsQuery();
    const { colors } = useTheme();
    const client = useQueryClient();

    if (isLoading) {
        return (
            <View style={styles.centerView}>
                <MainText>Loading...</MainText>
            </View>
        )
    }

    if (isError || data.tournaments === null) {
        return (
            <View style={styles.centerView}>
                <MaterialIcons name="error-outline" size={24} color={colors.text} />
                <MainText>Error loading the tournaments</MainText>
            </View>
        )
    }

    function refetchFeatured() {
        client.invalidateQueries({
            queryKey: useFeaturedTournamentsQuery.getKey()
        })
    }

    return (
        <View style={styles.page}>
            <FlatList
                numColumns={2}
                data={data.tournaments.nodes ?? []}
                renderItem={({ item }) => !item || item.id === null ? null : <LargeTournamentCard id={item.id} name={item.name} images={item.images} />}
                contentContainerStyle={styles.container}
                ItemSeparatorComponent={() => <View style={styles.rowSeperator} />}
                refreshing={isLoading}
                onRefresh={refetchFeatured}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    page: {
        padding: 10,
    },
    container: {
        flexGrow: 1,
        // backgroundColor: 'blue'
    },
    centerView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    rowSeperator: {
        height: 10
    }
})

export default FeaturedTournamentsPage
