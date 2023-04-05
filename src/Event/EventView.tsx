import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { UseQueryResult } from "@tanstack/react-query";
import { StyleSheet, View } from "react-native";

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

    if (status !== "success") return <EmptyEventView status={status} />

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
}

function EmptyEventView({ status }: EmptyEventViewProps) {
    let statusString = "";
    if (status === "error") statusString = "Error retreiving event details";
    if (status === "loading") statusString = "Loading event details";

    return (
        <View style={styles.centerView}>
            <MainText>{statusString}</MainText>
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
