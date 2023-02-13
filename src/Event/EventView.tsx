import { StyleSheet, Text, View } from "react-native"
import { useTheme } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { EventDetailsQuery, queryAPI } from "../api";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import ResultsPage from "./ResultsPage";
import BracketPage from "./BracketPage";


const Tab = createMaterialTopTabNavigator();

const EventPage = ({navigation, route}) => {

    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const eventId = route.params.id;
        const queryBody = EventDetailsQuery(eventId);
        const queryData = queryAPI(queryBody);

        queryData.then(details => {
            console.log(details)
            setData(details)
            setLoading(false);
        });

        
    }, [])

    return (
        <Tab.Navigator>
            <Tab.Screen name="Results" component={ResultsPage}/>
            <Tab.Screen name="Bracket" component={BracketPage}/>
        </Tab.Navigator>
    )
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 'auto'
    }
});

export default EventPage;
