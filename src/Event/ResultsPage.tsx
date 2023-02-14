import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import { useTheme } from "@react-navigation/native";

import ResultCard from "./ResultCard";
import { Entrant } from "../types";
import { EventStandingsQuery, queryAPI } from "../api";

const ResultsPage = ({navigation, route}) => {
    
    const [refresh, setRefresh] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [finished, setFinished] = useState(false);
    const [standings, setStandings] = useState(route.params.standings as Entrant[]);
    const [page, setPage] = useState(1);

    const eventId = route.params.id;

    const { colors } = useTheme()
    
    async function addPlacements() {
        setUpdating(true);

        const queryBody = EventStandingsQuery(eventId, page);
        const data = await queryAPI(queryBody)

        const event_standings = data.event.standings.nodes;

        if (event_standings.length > 0) {
            setStandings(prevData => [...prevData, ...event_standings])
        } else {
            console.log('No more players');
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

    return (
        <View style={{flex: 1}}>
            <FlatList
                data={standings}
                renderItem={({index, item}) => <ResultCard playerData={item} index={index}/>}
                style={styles.container}
                onEndReached={() => setPage(page+1)}
                onEndReachedThreshold={0.1}
                />

            { updating && 
            <View style={styles.loadingCircle}>
                <ActivityIndicator size='large' color={colors.primary} />
            </View> }
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
    }
})

export default ResultsPage;
