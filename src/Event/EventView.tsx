import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useTheme } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

import { EventDetailsQuery, queryAPI } from "../api";
import { EventTabParamList, EventViewProps } from "../navTypes";
import { EventDetails, EventPageDetails } from "../types";
import BracketPage from "./Bracket/BracketPage";
import ResultsPage from "./Results/ResultsPage";


const Tab = createMaterialTopTabNavigator<EventTabParamList>();

const EventPage = ({ navigation, route }: EventViewProps) => {

    const [data, setData] = useState({} as EventPageDetails);
    const [loading, setLoading] = useState(true);

    const singles = route.params.type === 1;
    const firstPhase = route.params.phases[0];

    const { colors } = useTheme();

    useEffect(() => {
        const eventId = route.params.id;
        const queryBody = EventDetailsQuery(eventId, singles);
        const queryData = queryAPI(queryBody) as Promise<EventDetails>;
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
            {data.standings && data.standings.nodes.length > 0 &&
                <Tab.Group>
                    <Tab.Screen name="Results" component={ResultsPage} initialParams={{ id: data.id, singles: singles }} />
                </Tab.Group>}
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
