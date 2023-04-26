import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { useQueryClient } from "@tanstack/react-query";
import { FlatList, StyleSheet, View } from "react-native";

import { useFeaturedTournamentsQuery } from "../../gql/gql";

import LargeTournamentCard from "./LargeTournamentCard";

import { FeaturedTournamentsScreenProps } from "../../navTypes";
import { CustomText } from "../../Shared/Text";


function FeaturedTournamentsPage({ navigation, route }: FeaturedTournamentsScreenProps) {

    const { data, isLoading, status } = useFeaturedTournamentsQuery();
    const client = useQueryClient();

    function refetchFeatured() {
        client.invalidateQueries({
            queryKey: useFeaturedTournamentsQuery.getKey(),
        })
    }

    return (
        <View style={styles.page}>
            <FlatList
                numColumns={2}
                data={data?.tournaments?.nodes ?? []}
                renderItem={({ item }) => !item || item.id === null ? null : <LargeTournamentCard id={item.id} name={item.name} images={item.images} />}
                contentContainerStyle={styles.container}
                style={{ flexGrow: 1 }}
                ItemSeparatorComponent={() => <View style={styles.rowSeperator} />}

                ListEmptyComponent={<EmptyTournaments status={status} />}


                refreshing={isLoading}
                onRefresh={refetchFeatured}
            />
        </View>
    )
}

interface EmptyTournamentsProps {
    status: "success" | "loading" | "error"
}

function getErrorMiscByStatus(status: EmptyTournamentsProps['status']) {
    let icon: "error-outline" | "exclamationcircleo" | undefined = undefined;
    let statusString = "";

    switch (status) {
        case "error":
            icon = "error-outline";
            statusString = "Error loading the tournaments";
            break
        case "loading":
            icon = undefined;
            statusString = "Loading...";
            break
        case "success":
            icon = "exclamationcircleo";
            statusString = "No featured tournaments found";
            break
        default:
            icon = "error-outline";
            statusString = "Unknown error occurred";
            break;
    }

    return { icon: icon, text: statusString }
}

function EmptyTournaments({ status }: EmptyTournamentsProps) {

    const { icon, text } = getErrorMiscByStatus(status);
    const { colors } = useTheme();

    return (
        <View style={styles.centerView}>
            {icon === "error-outline" ? <MaterialIcons name={icon} size={20} color={colors.text} /> : null}
            {icon === "exclamationcircleo" ? <AntDesign name="exclamationcircleo" size={20} color={colors.text} /> : null}
            <CustomText>{text}</CustomText>
        </View>
    )
}

const styles = StyleSheet.create({
    page: {
        padding: 10,
        flex: 1
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
