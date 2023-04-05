import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";

import { EventResultsQueryVariables, useInfiniteEventResultsQuery } from "../../gql/gql";

import { checkID, truthyFilter } from "../../helper";
import { ResultsViewProps } from "../../navTypes";
import SearchBar from "../../Shared/SearchBar";
import { MainText } from "../../Shared/ThemedText";
import ResultCard from "./ResultCard";

function ResultsPage({ navigation, route }: ResultsViewProps) {

    const [filters, setFilters] = useState<EventResultsQueryVariables>({
        ID: route.params.id,
        singles: route.params.singles,
        name: "",
        page: 1
    });

    const { data, isLoading, status, fetchNextPage } = useInfiniteEventResultsQuery("page", filters, {
        getNextPageParam: (lastPage, pages) => {
            const currentPage = lastPage.event?.standings?.pageInfo?.page;
            const nextPage = currentPage ? currentPage + 1 : filters.page + 1;
            return {
                page: nextPage
            }
        }
    });
    const queryClient = useQueryClient();

    const allResults = data?.pages.map(page => page.event?.standings?.nodes)
        .filter(truthyFilter)
        .flat()
        .filter(checkID)
        ?? [];

    function updateNameFilter(name: string) {
        if (name === filters.name) return

        const newFilter = Object.assign({}, filters);
        newFilter.name = name;

        setFilters(newFilter);
    }

    function refresh() {
        queryClient.invalidateQueries({
            queryKey: useInfiniteEventResultsQuery.getKey(filters)
        })
    }

    return (
        <View style={styles.container}>
            <FlatList
                // Main list items
                data={allResults}
                renderItem={({ item }) => <ResultCard playerData={item} />}
                contentContainerStyle={styles.listContainer}
                ItemSeparatorComponent={() => (
                    <View style={{ marginVertical: 5 }} />
                )}

                // Header 
                ListHeaderComponent={<SearchBar filterAction={updateNameFilter} filter={filters.name} />}
                ListHeaderComponentStyle={{ padding: 10 }}

                // Empty text
                ListEmptyComponent={<EmptyResults status={status} />}

                // Update/Refresh data
                refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refresh} />}
                onEndReached={() => fetchNextPage()}

                // Misc. properties
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}

            />

        </View>
    )
}

interface EmptyResultsProps {
    status: "success" | "error" | "loading"
}

function EmptyResults({ status }: EmptyResultsProps) {
    let statusString = "";

    if (status === "error") statusString = "Error retrieving data";
    if (status === "loading") statusString = "Loading...";
    if (status === "success") statusString = "No entrants found";

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <MainText>{statusString}</MainText>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    listContainer: {
        flexGrow: 1
    }
});

export default ResultsPage
