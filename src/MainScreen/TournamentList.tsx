import { useQueryClient } from "@tanstack/react-query";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";

import { useInfiniteTournamentListDataQuery } from "../gql/gql";

import { EmptyTournamentListProps } from "./types";
import useFilter from "./filterHook";
import TournamentCard from "./TournamentCard";

import { checkID, truthyFilter } from "../helper";
import { TournamentListViewProps } from "../navTypes";
import { MainText, SearchBar } from "../Shared";


function TournamentList({ navigation, route }: TournamentListViewProps) {

    const { filters, setName } = useFilter();

    const queryClient = useQueryClient();
    const { data, status, isFetching, isRefetching, fetchNextPage } = useInfiniteTournamentListDataQuery("page", filters, {
        getNextPageParam: (lastPage) => {
            const nextPage = lastPage.tournaments?.pageInfo?.page ? lastPage.tournaments.pageInfo.page + 1 : filters.page + 1
            return { page: nextPage }
        }
    });

    const listData = data?.pages.map(page => page.tournaments?.nodes)
        .filter(truthyFilter)
        .flat()
        .filter(checkID)
        ?? [];

    function refresh() {
        queryClient.invalidateQueries({
            queryKey: useInfiniteTournamentListDataQuery.getKey({ ...filters }),
        })
    }


    return (
        <View style={styles.container}>
            <FlatList
                // Main data rendering
                data={listData}
                renderItem={({ item }) => <TournamentCard {...item} navigation={navigation} />}
                contentContainerStyle={{ flexGrow: 1 }}
                keyExtractor={(tournament) => tournament.id}

                // Header
                ListHeaderComponent={<SearchBar filter={filters.name} filterAction={setName} />}
                ListHeaderComponentStyle={{ padding: 10 }}

                // Empty component
                ListEmptyComponent={<EmptyTournamentList status={status} />}

                // Update/Refresh data 
                refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refresh} />}
                onEndReached={({ distanceFromEnd }) => {
                    if (distanceFromEnd >= 0.1) return;
                    fetchNextPage()
                }}

                // Misc. properties
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            />
        </View>
    )
}



function EmptyTournamentList({ status }: EmptyTournamentListProps) {

    let statusString = "";

    if (status === "error") statusString = "Error retrieving data";
    if (status === "loading") statusString = "Loading...";
    if (status === "success") statusString = "No tournaments listed";

    return (
        <View style={styles.centerView}>
            <MainText>{statusString}</MainText>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    centerView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});

export default TournamentList
