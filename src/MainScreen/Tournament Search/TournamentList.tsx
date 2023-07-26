import { useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { FlatList, NativeScrollEvent, NativeSyntheticEvent, RefreshControl, StyleSheet, View } from "react-native";

import { useInfiniteTournamentListDataQuery } from "../../gql/gql";

import { FilterButton } from "./FilterButton";
import TournamentCard from "./TournamentCard";
import { EmptyTournamentListProps, FilterButtonRefProps } from "./types";

import { checkID, truthyFilter } from "../../helper";
import { TournamentListViewProps } from "../../navTypes";
import { SearchBar } from "../../Shared";
import { CustomText } from "../../Shared/Text";
import { convertFiltersForAPI, FilterProvider, useFilters } from "./filterContext";
import { FilterList, FilterListRefProps } from "./FilterList";

const MIN_BOTTOMSHEET_SIZE = -450;
const MAX_BOTTOMSHEET_SIZE = -600;

export function TournamentSearchPage({ navigation, route }: TournamentListViewProps) {

    return (
        <FilterProvider>
            <TournamentList navigation={navigation} />
        </FilterProvider>
    )
}

interface TournamentListProps {
    navigation: TournamentListViewProps["navigation"]
}

function TournamentList({ navigation }: TournamentListProps) {

    const { filters, updateFilter } = useFilters();

    const filterButtonRef = useRef<FilterButtonRefProps>(null);
    const filterSheetRef = useRef<FilterListRefProps>(null);

    const queryClient = useQueryClient();
    const { data, status, isRefetching, fetchNextPage } = useInfiniteTournamentListDataQuery("page", convertFiltersForAPI(filters), {
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
            queryKey: useInfiniteTournamentListDataQuery.getKey(convertFiltersForAPI(filters)),
        })
    }

    const onPress = () => {
        filterSheetRef.current?.open();
    };

    const scrollEvent = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const { y: offsetY } = event.nativeEvent.contentOffset;

        if (offsetY > 100) {
            filterButtonRef.current?.toggleFilter(false)
        } else {
            filterButtonRef.current?.toggleFilter(true)
        }
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
                ListHeaderComponent={<SearchBar filter={filters.name} filterAction={(name) => updateFilter("name", name)} placeholder="Tournament" />}
                ListHeaderComponentStyle={{ padding: 10 }}

                // Empty component
                ListEmptyComponent={<EmptyTournamentList status={status} />}

                // Update/Refresh data
                refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refresh} />}
                onEndReached={() => fetchNextPage()}
                onEndReachedThreshold={0.1}
                onScroll={scrollEvent}

                // Misc. properties
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            />

            <FilterButton ref={filterButtonRef} onPress={onPress} style={styles.filterButton} />

            <FilterList ref={filterSheetRef} maxSize={MAX_BOTTOMSHEET_SIZE} minSize={MIN_BOTTOMSHEET_SIZE} />

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
            <CustomText>{statusString}</CustomText>
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
    },
    filterButton: {
        position: "absolute",
        bottom: 30,
        right: 30
    }
});
