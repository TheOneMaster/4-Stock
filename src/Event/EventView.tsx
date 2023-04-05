import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { UseQueryResult } from "@tanstack/react-query";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useTheme } from "@react-navigation/native";

import { useEventDataQuery } from "../gql/gql";
import { EventTabParamList, EventViewProps } from "../navTypes";
import { MainText } from "../Shared/ThemedText";
import BracketPage from "./Bracket/BracketPage";
import ResultsPage from "./Results/ResultsPage";

const Tab = createMaterialTopTabNavigator<EventTabParamList>();


function EventView({ navigation, route }: EventViewProps) {

    const eventParams = {
        id: route.params.id,
        singles: route.params.type === 1
    }

    const { data, status } = useEventDataQuery(eventParams);
    const { colors } = useTheme();

    if (status !== "success") return <EmptyEventView status={status} color={colors.primary} />

    return (
        <Tab.Navigator>

            <Tab.Screen name="Results" component={ResultsPage} initialParams={eventParams} />
            <Tab.Screen name="Bracket" component={BracketPage} initialParams={{
                id: route.params.id,
                phases: data.event?.phases,
                waves: data.event?.waves
            }} />

        </Tab.Navigator>
    )
}

interface EmptyEventViewProps {
    status: Exclude<UseQueryResult['status'], "success">
    color: string
}

function EmptyEventView({ status, color }: EmptyEventViewProps) {
    return (
        <View style={styles.centerView}>
            {status === "loading"
                ? <ActivityIndicator size="large" color={color} />
                : <MainText>Error retrieving event details</MainText>}
        </View>
    )
}


const styles = StyleSheet.create({
    centerView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});

export default EventView;
