import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { RefreshControl, StyleSheet, View } from "react-native";
import { FlatGrid } from "react-native-super-grid";

import { useFeaturedTournamentsQuery } from "../../gql/gql";

import LargeTournamentCard from "./LargeTournamentCard";

import { useQueryClient } from "@tanstack/react-query";
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
        <>
            <FlatGrid
                itemDimension={150}
                data={data.tournaments.nodes ?? []}
                renderItem={({ item }) => {
                    if (!item || item.id === null) {
                        return null
                    }
                    return <LargeTournamentCard id={item.id} name={item.name} images={item.images} />
                }}
                contentContainerStyle={styles.container}

                refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetchFeatured} />}
                onRefresh={refetchFeatured}

                showsVerticalScrollIndicator={false}
            />
        </>
    )


}
const styles = StyleSheet.create({
    container: {
        flexGrow: 1
    },
    centerView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})

export default FeaturedTournamentsPage
