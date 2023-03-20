import { StyleSheet, Text, View } from "react-native";
import { EventPageDetails, GameSet, Phase, PhaseGroup, PhaseGroupSetInfo, Wave } from "../../types";
import { useTheme } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { getPGroupSetInfo } from "../../api";
import { DropdownOption } from "../../Shared/types";
import BracketPhases from "./BracketPhases";
import { Dropdown } from "react-native-element-dropdown";
import { convertAPITimeToDate } from "../../helper";

interface BracketFiltersProps {
    eventDetails: EventPageDetails
    pGroupInfo: PhaseGroupSetInfo
    updatePGroupInfo: (pGroup: PhaseGroup, phase: Phase) => () => void
}


function convertWavesToDropdown(waves: Wave[]): DropdownOption[] {
    return waves.reduce((prev, cur) => {
        const ddOption: DropdownOption = {
            value: cur.id,
            label: cur.identifier
        };
        prev.push(ddOption);
        return prev
    }, []);
}

function convertPGroupsToDropdown(pGroups: PhaseGroup[]): DropdownOption[] {
    return pGroups.reduce((prev, cur) => {
        const ddOption: DropdownOption = {
            value: cur.id,
            label: cur.displayIdentifier
        };
        prev.push(ddOption);
        return prev
    }, [])

}

function BracketFilters(props: BracketFiltersProps) {
    const phases = useRef(props.eventDetails.phases);
    const waves = useRef(props.eventDetails.waves);
    const phaseGroups = useRef(
        props.eventDetails.phases.reduce<PhaseGroup[]>((prev, cur) => {
            if (!cur.phaseGroups) {
                return prev
            }
            prev.push.apply(prev, cur.phaseGroups.nodes);
            return prev
        }, []));
    const { colors } = useTheme();

    const colorCSS = StyleSheet.create({
        dropdown: {
            backgroundColor: colors.card,
            borderColor: colors.border
        },
        text: {
            // backgroundColor: colors.card,
            color: colors.text
        },
        dropdownContainer: {
            backgroundColor: colors.card
        }
    });

    const [selectedPhase, setSelectedPhase] = useState(phases.current[0]);
    const [selectedPGroup, setSelectedPGroup] = useState<PhaseGroup>(phases.current[0].phaseGroups.nodes[0]);
    const [selectedWave, setSelectedWave] = useState<Wave>(null);

    const [dropdownWaves, setDropdownWaves] = useState<Wave[]>([]);
    const [dropdownPGroups, setDropdownPGroups] = useState<PhaseGroup[]>([]);

    useEffect(() => {

        if (waves.current === null) {
            const curPGroups = selectedPhase.phaseGroups.nodes;
            setDropdownPGroups(curPGroups);
            setSelectedPGroup(curPGroups[0]);
            return
        }

        const phaseWavesId = selectedPhase.phaseGroups.nodes.reduce((prev, cur) => {
            if (cur.wave === null) {
                return prev
            }
            prev.add(cur.wave.id);
            return prev
        }, new Set<number>());

        const phaseWaves = waves.current
            .filter(wave => phaseWavesId.has(wave.id))
            .sort((a, b) => a.identifier.localeCompare(b.identifier));

        setDropdownWaves(phaseWaves);
        setSelectedWave(phaseWaves[0]);
    }, [selectedPhase]);

    useEffect(() => {
        const curPGroups = selectedPhase.phaseGroups.nodes
            .filter(pGroup => pGroup.wave && selectedWave ? pGroup.wave.id === selectedWave.id : true);

        setDropdownPGroups(curPGroups);
        setSelectedPGroup(curPGroups[0]);
    }, [selectedWave]);

    useEffect(() => {
        console.log(`Getting sets from group ${selectedPGroup.displayIdentifier}`)

        return props.updatePGroupInfo(selectedPGroup, selectedPhase);
    }, [selectedPGroup]);

    useEffect(() => {
        console.log(`Group ${selectedPGroup.displayIdentifier} sets: ${props.pGroupInfo.sets.length}`);
    }, [props.pGroupInfo.sets])


    function updateWave(ddOption: DropdownOption) {
        const curWave = waves.current.reduce((prev, cur) => {
            if (cur.id === ddOption.value) {
                return cur
            }
            return prev
        }, selectedWave);
        setSelectedWave(curWave);
    }

    function updatePGroups(ddOption: DropdownOption) {
        const curPGroup = phaseGroups.current.reduce((prev, cur) => {
            if (cur.id === ddOption.value) {
                return cur
            }
            return prev
        }, selectedPGroup);
        setSelectedPGroup(curPGroup);
    }


    return (
        <View style={styles.filters}>
            <BracketPhases phases={phases.current} selectPhase={setSelectedPhase} value={selectedPhase} />

            <View style={styles.dropdowns}>

                {dropdownWaves.length > 1
                    ? <Dropdown
                        style={[styles.wavesDropdown, colorCSS.dropdown]}
                        selectedTextStyle={colorCSS.text}
                        itemTextStyle={colorCSS.text}
                        containerStyle={colorCSS.dropdownContainer}
                        activeColor={colors.primary}
                        itemContainerStyle={colorCSS.dropdownContainer}
                        data={convertWavesToDropdown(dropdownWaves)}
                        labelField="label"
                        valueField="value"
                        onChange={updateWave}
                        value={convertWavesToDropdown([selectedWave])[0]}
                    />
                    : null}

                {dropdownPGroups.length > 1
                    ? <Dropdown
                        style={[styles.pGroupsDropdown, colorCSS.dropdown]}
                        selectedTextStyle={[colorCSS.text]}
                        itemTextStyle={colorCSS.text}
                        containerStyle={colorCSS.dropdownContainer}
                        itemContainerStyle={colorCSS.dropdownContainer}
                        activeColor={colors.primary}
                        data={convertPGroupsToDropdown(dropdownPGroups)}
                        labelField="label"
                        valueField="value"
                        onChange={updatePGroups}
                        value={convertPGroupsToDropdown([selectedPGroup])[0]}
                    />
                    : null
                }
            </View>


        </View>
    )
}

const styles = StyleSheet.create({
    default: {
        flexGrow: 1,
    },
    filters: {
        marginHorizontal: 10
    },
    dropdowns: {
        flexDirection: "row",
        width: "100%",
    },
    wavesDropdown: {
        flexGrow: 1,
        borderWidth: 1,
        borderStyle: 'solid',
        marginRight: 10,
        paddingLeft: 10
    },
    pGroupsDropdown: {
        flexGrow: 1,
        borderWidth: 1,
        borderStyle: "solid",
        paddingLeft: 10
    }
})

export default BracketFilters;
