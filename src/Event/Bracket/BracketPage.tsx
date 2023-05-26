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
import { CustomText } from "../../Shared/Text";

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

    const { setPages, pGroupInfo, loadingPGroupData, queriesStatus } = useSets(selectedOptions.selectedPGroup);
    

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

                ListEmptyComponent={<EmptyBracket pGroupStatus={loadingPGroupData} queriesStatus={queriesStatus} />}

            />

        </View>
    )


}

interface EmptyBracketProps {
    queriesStatus: ("success" | "loading" | "error")[]
    pGroupStatus: boolean
}

function getErrorMessage({queriesStatus, pGroupStatus}: EmptyBracketProps) {
    if (!pGroupStatus) return "No bracket found";
    if (queriesStatus.some(status => status === "error")) return "Error loading bracket";
    if (queriesStatus.every(status => status === "loading")) return "Loading sets...";
    if (queriesStatus.every(status => status === "success")) return "No sets found";
}


function EmptyBracket({ queriesStatus, pGroupStatus }: EmptyBracketProps) {

    let errorMessage = getErrorMessage({queriesStatus, pGroupStatus});

    return (
        <View style={styles.center}>
            <IoniconsThemed name="alert-circle-outline" size={30} />
            <CustomText style={{ fontSize: 20 }}>{errorMessage}</CustomText>
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
