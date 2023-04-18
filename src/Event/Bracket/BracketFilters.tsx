import { useRef } from "react";
import { StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import { truthyFilter } from "../../helper";
import { ThemedDropdown } from "../../Shared/ThemedDropdown";
import { TestPhaseButton } from "./PhaseButton";
import { PhaseGroup, Phases, TestFiltersProps, Wave, Waves } from "./types";

function getItemByID<T extends { id: string | null }>(itemList: T[], itemID: string) {
    const item = itemList.find(item => item.id === itemID);
    if (item === undefined) throw new Error("No matching item found with ID " + itemID);
    return item
}

function getDDPhaseGroups(phases: Phases, phaseID: string | null, waveID?: string) {
    if (phaseID === null) return []

    const dropdownPGroups = getItemByID(phases, phaseID)
        .phaseGroups?.nodes
        ?.filter(pGroup => waveID ? pGroup?.wave?.id === waveID : true)
        .filter(truthyFilter)
        ?? []

    return dropdownPGroups
}

function getDDWaves(phases: Phases, waves: Waves, phaseID: string | null) {
    if (phaseID === null) return []

    const uniqueWaves = new Set(getItemByID(phases, phaseID).phaseGroups?.nodes
        ?.map(pGroup => pGroup?.wave?.id)
        .filter(truthyFilter));

    const ddWaves = [...uniqueWaves]
        .map(waveID => waves.find(wave => wave.id === waveID))
        .filter(truthyFilter);

    return ddWaves
}


export function TestFilters({ eventDetails, filters, setFilters, style }: TestFiltersProps) {

    if (eventDetails.phases === null || eventDetails.phases.length === 0) return null;
    if (eventDetails.waves === null || eventDetails.waves.length === 0) return null

    const phases = useRef(eventDetails.phases.filter(truthyFilter));
    const waves = useRef(eventDetails.waves.filter(truthyFilter));

    function selectPhase(phaseID: string) {
        const selectedPhase = getItemByID(phases.current, phaseID);
        const selectedPhaseID = selectedPhase?.id ?? null;
        const potentialPGroups = selectedPhase?.phaseGroups?.nodes;
        const selectedPGroupID = potentialPGroups ? potentialPGroups[0]?.id ?? null : null;
        const selectedWave = potentialPGroups ? potentialPGroups[0]?.wave?.id ?? null : null;

        setFilters({
            selectedPhase: selectedPhaseID,
            selectedWave: selectedWave,
            selectedPGroup: selectedPGroupID
        });
    }

    function selectPGroup(phaseGroup: PhaseGroup) {
        const pGroupID = phaseGroup?.id;
        if (!pGroupID) return

        setFilters({
            selectedPGroup: pGroupID,
            selectedPhase: filters.selectedPhase,
            selectedWave: filters.selectedWave
        })
    }

    function selectWave(wave: Wave) {
        const waveID = wave?.id;
        if (!waveID) return

        const possiblePhaseGroups = getDDPhaseGroups(phases.current, filters.selectedPhase, waveID);

        setFilters({
            selectedPGroup: possiblePhaseGroups[0].id,
            selectedPhase: filters.selectedPhase,
            selectedWave: waveID
        })

    }

    const ddPhaseGroups = getDDPhaseGroups(phases.current, filters.selectedPhase, filters.selectedWave ?? undefined);
    const ddWaves = getDDWaves(phases.current, waves.current, filters.selectedPhase);

    return (
        <View style={[styles.container, style]}>

            <FlatList
                data={phases.current}
                renderItem={({ item }) => <TestPhaseButton phase={item} selectPhase={selectPhase} active={filters.selectedPhase === item.id} />}
                contentContainerStyle={styles.phaseButtonContainer}

                ItemSeparatorComponent={() => <View style={styles.seperator} />}

                horizontal={true}
                showsHorizontalScrollIndicator={false}
            />


            <View style={styles.ddContainer}>

                {ddPhaseGroups.length > 1
                    ? <ThemedDropdown
                        data={ddPhaseGroups}
                        labelField="displayIdentifier"
                        valueField="id"
                        value={filters.selectedPGroup}
                        onChange={selectPGroup}
                        style={[styles.dropdown, { marginRight: 10 }]}
                    />
                    : null}

                {ddWaves.length > 1
                    ? <ThemedDropdown
                        data={ddWaves}
                        labelField="identifier"
                        valueField="id"
                        value={filters.selectedWave}
                        onChange={selectWave}
                        style={styles.dropdown}
                    />
                    : null}

            </View>

        </View>
    )

}

const styles = StyleSheet.create({
    container: {

    },
    phaseButtonContainer: {
        marginVertical: 10
    },
    seperator: {
        paddingHorizontal: 5
    },
    ddContainer: {
        flexDirection: "row",
        width: "100%",
        // paddingHorizontal: 5,
        gap: 10,
        // marginTop: 5
        // backgroundColor: 'red'
    },
    dropdown: {
        flexGrow: 1,
        borderWidth: 1
    }
});
