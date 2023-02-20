import { ActivityIndicator, StyleSheet, Text, View } from "react-native"
import { useTheme } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { EventDetailsQuery, queryAPI } from "../api";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import ResultsPage from "./ResultsPage";
import BracketPage from "./Bracket/BracketPage";
import { EventAPIQuery, FullEventDetails } from "../types";


const Tab = createMaterialTopTabNavigator();

const EventPage = ({navigation, route}) => {

    const [data, setData] = useState({} as FullEventDetails);
    const [loading, setLoading] = useState(true);

    const singles = route.params.type === 1;
    const {colors} = useTheme();

    useEffect(() => {
        const eventId = route.params.id;
        const queryBody = EventDetailsQuery(eventId, singles);
        const queryData = queryAPI(queryBody) as Promise<EventAPIQuery>;
        queryData.then(details => {
            setData(details.event)
            setLoading(false);
        });
    }, []);


    if (loading) {
        // Default view before data is loaded
        return (
            <View style={styles.loading}>
                <ActivityIndicator color={colors.primary} size='large' />
            </View>
        )
    }

    return (
        <Tab.Navigator>
            { data.standings.nodes.length > 0 && <Tab.Screen name="Results" component={ResultsPage} initialParams={{standings: data.standings.nodes, id: data.id, singles: singles}} /> }
            <Tab.Screen name="Bracket" component={BracketPage} initialParams={data} />
        </Tab.Navigator>
    )
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 'auto'
    },
    loading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default EventPage;
