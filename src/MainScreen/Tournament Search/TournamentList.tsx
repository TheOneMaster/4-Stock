import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useRef, useState } from "react";
import { FlatList, Pressable, RefreshControl, StyleSheet, View } from "react-native";

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
import { MainText, TitleText } from "../../Shared/Text";


function TournamentList({ navigation, route }: TournamentListViewProps) {

    const { filters, setFilters } = useFilter();
    const filterButtonRef = useRef<FilterButtonRefProps>(null);
    const filterSheetRef = useRef<BottomSheetRefProps>(null);

    const [overlay, setOverlay] = useState(false);

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
            filterSheetRef.current.scrollTo(0);
            setOverlay(false);
        } else {
            filterSheetRef.current?.scrollTo(MIN_TRANSLATE_Y);
            setOverlay(true);
        }
    };

    const overlayPress = useCallback(() => {
        filterSheetRef.current?.scrollTo(0);
        setOverlay(false);
    }, [filterSheetRef.current])

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

            {overlay ? <Pressable style={styles.overlay} onPress={overlayPress} /> : null}


            <BottomSheet ref={filterSheetRef} style={styles.bottomSheet} setOverlay={setOverlay}>
                <SecondaryCard style={styles.filterSheetInner}>
                    <TitleText style={styles.titleText}>Filters</TitleText>
                    <FilterDate title="From" date={filters.afterDate} setDate={setFilters.setAfterDate} />
                    <FilterDate title="Till" date={filters.beforeDate} setDate={setFilters.setBeforeDate} />
                    <FilterCheckbox title="Past events" value={filters.past} setValue={setFilters.setPast} />
                    <FilterCheckbox title="Has online events" value={filters.online} setValue={setFilters.setOnline} />
                    <FilterCheckbox title="Open for registration" value={filters.regOpen} setValue={setFilters.setRegOpen} nullValue />
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
    bottomSheet: {
        zIndex: 3
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
        // fontSize: 18,
        // fontFamily: ,
        // padding: 10,
        fontWeight: "400",
        // padding: 0
    },
    overlay: {
        position: "absolute",
        height: "100%",
        width: "100%",
        backgroundColor: "#000000",
        opacity: 0.6,
        zIndex: 2
    }
});

export default TournamentList
