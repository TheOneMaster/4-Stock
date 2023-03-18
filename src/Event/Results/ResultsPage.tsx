import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, ToastAndroid, View } from "react-native";
import { useTheme } from "@react-navigation/native";

import ResultCard from "./ResultCard";
import { Entrant, EventDetails } from "../../types";
import { EventStandingsQuery, queryAPI } from "../../api";
import SearchBar from "../../Shared/SearchBar";

const PER_PAGE = 24    // Show 24 players per page (instead of the default 25).

const ResultsPage = ({ navigation, route }) => {

    // UI state 
    const [refresh, setRefresh] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [finished, setFinished] = useState(false);

    // Data state
    const [standings, setStandings] = useState(route.params.standings as Entrant[]);
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState('');

    // Constants
    const eventId = route.params.id;
    const singles = route.params.singles;
    const { colors } = useTheme();

    async function addPlacements() {
        setUpdating(true);

        const queryBody = EventStandingsQuery(eventId, PER_PAGE, page, singles, filter);
        const data = await queryAPI(queryBody) as EventDetails;

        const event_standings = data.event.standings.nodes;

        if (event_standings.length > 0) {
            setStandings(prevData => [...prevData, ...event_standings])
        } else {
            console.log('No more players');
            setFinished(true);
        }

        setUpdating(false);
    }

    async function filterEntrants() {
        setUpdating(true);
        setFinished(false);
        setPage(1);

        const queryBody = EventStandingsQuery(eventId, PER_PAGE, 1, singles, filter);
        const data = await queryAPI(queryBody) as EventDetails;
        const event_standings = data.event.standings;

        const standings = event_standings ? event_standings.nodes : [] as Entrant[];

        setStandings(standings)

        if (standings.length < PER_PAGE) {
            setFinished(true);
        }

        setUpdating(false);
    }

    useEffect(() => {
        if (finished || page === 1) {
            return
        }

        addPlacements()

    }, [page])

    useEffect(() => {
        if (finished && page > 1) {
            console.info("No more players");
            ToastAndroid.show("No more players", ToastAndroid.SHORT);
        }
    }, [finished])

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                style={styles.container}
                ListHeaderComponent={<SearchBar setFilter={setFilter} filterAction={filterEntrants} searchTitle="Search" style={{ marginTop: 20 }} />}
                data={standings}
                renderItem={({ index, item }) => <ResultCard playerData={item} index={index} />}

                contentContainerStyle={{ flexGrow: 1 }}
                ListEmptyComponent={
                    <View style={styles.centerText}>
                        <Text style={{ color: colors.text }}>No entrants were found</Text>
                    </View>}

                onEndReached={() => setPage(page + 1)}
                onEndReachedThreshold={0.1}
            />

            {updating &&
                <View style={styles.loadingCircle}>
                    <ActivityIndicator size='large' color={colors.primary} />
                </View>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
    },
    loadingCircle: {
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignContent: 'center'
    },
    centerText: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default ResultsPage;
