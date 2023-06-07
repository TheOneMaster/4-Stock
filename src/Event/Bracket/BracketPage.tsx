import { QueryStatus, UseQueryResult } from "@tanstack/react-query";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

import { TestFilters } from "./BracketFilters";
import { PhaseGroupDetails } from "./PhaseGroupDetails";
import { useSets } from "./SetHook";
import { SelectedOptions, SetQuery } from "./types";

import { DoubleElimBracket } from "../../MainScreen/Debug/Bracket";
import { convertSets } from "../../MainScreen/Debug/BracketData";
import { IoniconsThemed } from "../../Shared/IconTheme";
import { CustomText } from "../../Shared/Text";
import { truthyFilter } from "../../helper";
import { BracketViewProps } from "../../navTypes";

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

    const { setPages, pGroupInfo, loadingPGroupData, queriesStatus, success, pGroupStatus } = useSets(selectedOptions.selectedPGroup);
    
    if (!success) {
        return <EmptyBracket queriesStatus={queriesStatus} pGroupStatus={pGroupStatus} initialLoading={loadingPGroupData} />;
    }
    
    const sets = convertSetPagesToSets(setPages);
    const bracket = convertSets(sets);

    // console.log(new Set(sets.map(set => set.round)))

    return (
        <View style={{ flex: 1 }}>
            <TestFilters eventDetails={params} filters={selectedOptions} setFilters={setSelectedOptions} style={styles.header} />
            <PhaseGroupDetails details={pGroupInfo} style={styles.details} />

            { pGroupInfo?.bracketType === "DOUBLE_ELIMINATION" &&
                <DoubleElimBracket bracket={bracket} />
            }
        </View>
    )


}

interface EmptyBracketProps {
    queriesStatus: QueryStatus[]
    pGroupStatus: QueryStatus
    initialLoading: boolean
}

function getErrorMessage({queriesStatus, pGroupStatus, initialLoading}: EmptyBracketProps) {

    if (initialLoading) return "Loading bracket";

    // If initial loading has errored out, or is still returning the loading status
    // Explanation for why loading status is used to show error message https://github.com/TanStack/query/issues/3584
    // Here are the docs for it https://tanstack.com/query/v4/docs/react/guides/disabling-queries#isInitialLoading
    if (pGroupStatus === "loading" || pGroupStatus === "error") return "No bracket found";

    if (queriesStatus.some(status => status === "error")) return "Error loading bracket";
    if (queriesStatus.every(status => status === "success")) return "No sets found";

    return "Loading sets...";
}


function EmptyBracket({ queriesStatus, pGroupStatus, initialLoading }: EmptyBracketProps) {

    let errorMessage = getErrorMessage({queriesStatus, pGroupStatus, initialLoading});

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
