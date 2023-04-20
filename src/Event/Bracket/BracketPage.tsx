import { UseQueryResult } from "@tanstack/react-query";
import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import { SelectedOptions, SetQuery } from "./types";
import { PhaseGroupDetails } from "./PhaseGroupDetails";
import { useSets } from "./SetHook";
import SetResult from "./SetResult";
import { TestFilters } from "./BracketFilters";

import { truthyFilter } from "../../helper";
import { BracketViewProps } from "../../navTypes";
import { IoniconsThemed } from "../../Shared/IconTheme";
import { MainText } from "../../Shared/Text";

function convertSetPagesToSets(setPages: UseQueryResult<SetQuery>[]) {
    return setPages.map(page => page.data?.phaseGroup.sets?.nodes)
        .flat()
        .filter(truthyFilter);
}

export function BracketPage({ navigation, route }: BracketViewProps) {

    const params = route.params;

    const initialPhase = params.phases[0];
    const phaseGroups = initialPhase ? initialPhase.phaseGroups?.nodes : null;
    const initialPhaseGroup = phaseGroups ? phaseGroups[0] : null;
    const initialWave = initialPhaseGroup?.wave;

    const initPhaseID = initialPhase ? initialPhase.id : null;
    const initPGroupID = initialPhaseGroup?.id ?? null;
    const initWaveID = initialWave?.id ?? null;

    const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({
        selectedPhase: initPhaseID,
        selectedWave: initWaveID,
        selectedPGroup: initPGroupID
    });

    const { setPages, pGroupInfo } = useSets(selectedOptions.selectedPGroup);

    return (
        <View style={{ flex: 1 }}>
            <TestFilters eventDetails={params} filters={selectedOptions} setFilters={setSelectedOptions} style={styles.header} />
            <PhaseGroupDetails details={pGroupInfo} style={styles.details} />

            <FlatList
                data={convertSetPagesToSets(setPages)}
                renderItem={({ item }) => <SetResult set={item} />}
                contentContainerStyle={styles.container}
                style={styles.container}

                ItemSeparatorComponent={() => <View style={styles.seperator} />}
            />

        </View>
    )


}

interface EmptyBracketProps {
    status: "success" | "loading" | "error"
}

function EmptyBracket({ status }: EmptyBracketProps) {

    return (
        <View style={styles.center}>
            <IoniconsThemed name="alert-circle-outline" size={30} />
            <MainText style={{ fontSize: 20 }}>Brackets not found</MainText>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingHorizontal: 5,
        // backgroundColor: "red"
    },
    seperator: {
        padding: 5
    },
    header: {
        marginHorizontal: 10,
    },
    details: {
        marginHorizontal: 10,
        marginBottom: 5
    },
    center: {
        flex: 1,
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "green"
    }
})
