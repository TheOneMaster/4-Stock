import { ActivityIndicator, StyleSheet, Text, View } from "react-native"
import { useTheme } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { EventDetailsQuery, queryAPI } from "../api";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import ResultsPage from "./ResultsPage";
import BracketPage from "./BracketPage";


const Tab = createMaterialTopTabNavigator();

const MainView = ({loading, data}) => {

    const {colors} = useTheme();

    if (loading) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator color={colors.primary} size='large' />
            </View>
        )
    }

    return (
        <Tab.Navigator>
            <Tab.Screen name="Results" component={ResultsPage} initialParams={{standings: data.standings.nodes}} />
            <Tab.Screen name="Bracket" component={BracketPage} initialParams={data} />
        </Tab.Navigator>
    )
}



const EventPage = ({navigation, route}) => {

    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const eventId = route.params.id;
        const queryBody = EventDetailsQuery(eventId);
        const queryData = queryAPI(queryBody);

        queryData.then(details => {
            setData(details.event)
            setLoading(false);
        });

        
    }, []);

    return <MainView loading={loading} data={data}/>
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
