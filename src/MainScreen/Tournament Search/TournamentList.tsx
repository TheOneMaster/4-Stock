import { useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";

import { useInfiniteTournamentListDataQuery } from "../../gql/gql";

import { convertStorageToAPI, useFilter } from "./filterHook";
import { FilterCheckbox, FilterDate, StaticFilterItem } from "./FilterItem";
import TournamentCard from "./TournamentCard";
import { EmptyTournamentListProps, FilterButtonRefProps } from "./types";
import { FilterButton } from "./FilterButton";

import { checkID, truthyFilter } from "../../helper";
import { TournamentListViewProps } from "../../navTypes";
import { SearchBar, SecondaryCard } from "../../Shared";
import { BottomSheet, MIN_TRANSLATE_Y } from "../../Shared/BottomSheet/BottomSheet";
import { BottomSheetRefProps } from "../../Shared/BottomSheet/types";
import { MainText } from "../../Shared/Text";


function TournamentList({ navigation, route }: TournamentListViewProps) {

    const { filters, setFilters } = useFilter();
    const filterButtonRef = useRef<FilterButtonRefProps>(null);
    const filterSheetRef = useRef<BottomSheetRefProps>(null);

    const queryClient = useQueryClient();
    const { data, status, isRefetching, fetchNextPage } = useInfiniteTournamentListDataQuery("page", convertStorageToAPI(filters), {
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
            queryKey: useInfiniteTournamentListDataQuery.getKey(convertStorageToAPI(filters)),
        })
    }

    const onPress = () => {
        if (filterSheetRef.current?.isActive()) {
            filterSheetRef.current.scrollTo(0)
        } else {
            filterSheetRef.current?.scrollTo(MIN_TRANSLATE_Y)
        }
    };

    return (
        <View style={styles.container}>
            <FlatList
                // Main data rendering
                data={listData}
                renderItem={({ item }) => <TournamentCard {...item} navigation={navigation} />}
                contentContainerStyle={{ flexGrow: 1 }}
                keyExtractor={(tournament) => tournament.id}

                // Header
                ListHeaderComponent={<SearchBar filter={filters.name} filterAction={setFilters.setName} placeholder="Tournament" />}
                ListHeaderComponentStyle={{ padding: 10 }}

                // Empty component
                ListEmptyComponent={<EmptyTournamentList status={status} />}

                // Update/Refresh data
                refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refresh} />}
                onEndReached={() => fetchNextPage()}
                onEndReachedThreshold={0.1}
                onScroll={(event) => {
                    const { y: offsetY } = event.nativeEvent.contentOffset;
                    if (offsetY > 100) {
                        filterButtonRef.current?.toggleFilter(false);
                    } else {
                        filterButtonRef.current?.toggleFilter(true);
                    }
                }}

                // Misc. properties
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            />

            <FilterButton ref={filterButtonRef} onPress={onPress} style={styles.filterButton} />
            <BottomSheet ref={filterSheetRef}>
                <SecondaryCard style={styles.filterSheetInner}>
                    <MainText style={styles.titleText}>Filters</MainText>
                    <FilterDate title="From" date={filters.afterDate} setDate={setFilters.setAfterDate} />
                    <FilterDate title="Till" date={filters.beforeDate} setDate={setFilters.setBeforeDate} />
                    <FilterCheckbox title="Past events" value={filters.past} setValue={setFilters.setPast} />
                    <StaticFilterItem title="Games" value={filters.games.map(game => game.label).join(", ")} />
                </SecondaryCard>
            </BottomSheet>

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
    },
    filterButton: {
        position: "absolute",
        bottom: 30,
        right: 30
    },
    filterSheetInner: {
        flex: 1,
        flexGrow: 1,
        borderRadius: 10,
        overflow: "hidden"
        // borderWidth: 1
    },
    titleText: {
        fontSize: 18,
        // fontFamily: ,
        padding: 10
    }
});

export default TournamentList
