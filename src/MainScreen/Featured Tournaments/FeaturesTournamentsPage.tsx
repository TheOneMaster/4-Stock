import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { FlatGrid } from "react-native-super-grid";

import { useFeaturedTournamentsQuery } from "../../gql/gql";

import LargeTournamentCard from "./LargeTournamentCard";

import { MainText } from "../../Shared";
import { FeaturedTournamentsScreenProps } from "../../navTypes";


function FeaturedTournamentsPage({ navigation, route }: FeaturedTournamentsScreenProps) {

    const { data, isLoading, isError } = useFeaturedTournamentsQuery();
    const { colors } = useTheme();

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

    return (
        <View style={styles.container}>
            <FlatGrid
                itemDimension={150}
                data={data.tournaments.nodes ?? []}
                renderItem={({ item }) => {
                    if (!item || item.id === null) {
                        return null
                    }
                    return <LargeTournamentCard id={item.id} name={item.name} images={item.images} />
                }}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )


}

const styles = StyleSheet.create({
    container: {

    },
    centerView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})

export default FeaturedTournamentsPage
