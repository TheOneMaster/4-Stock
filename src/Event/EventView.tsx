import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useTheme } from "@react-navigation/native";
import { UseQueryResult } from "@tanstack/react-query";
import { ActivityIndicator, StyleSheet, View } from "react-native";

import { useEventDataQuery } from "../gql/gql";
import { truthyFilter } from "../helper";
import { EventTabParamList, EventViewProps } from "../navTypes";
import { MainText } from "../Shared";
import { BracketPage } from "./Bracket/BracketPage";
import ResultsPage from "./Results/ResultsPage";

const Tab = createMaterialTopTabNavigator<EventTabParamList>();


function EventView({ navigation, route }: EventViewProps) {

    const { data, status } = useEventDataQuery({ id: route.params.id });
    const { colors } = useTheme();

    if (status !== "success") return <EmptyEventView status={status} color={colors.primary} />

    const eventParams = {
        id: route.params.id,
        singles: route.params.type === 1
    }

    const phases = data.event?.phases?.filter(truthyFilter);
    const waves = data.event?.waves?.filter(truthyFilter)


    return (
        <Tab.Navigator>

            <Tab.Screen name="Results" component={ResultsPage} initialParams={eventParams} />
            <Tab.Screen name="Bracket" component={BracketPage} initialParams={{
                phases: phases,
                waves: waves
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
