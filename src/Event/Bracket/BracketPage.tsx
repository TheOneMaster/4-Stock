import { StyleSheet, Text, View } from "react-native"
import { BracketViewProps } from "../../navTypes";
import { FlatList } from "react-native-gesture-handler";
import { useTheme } from "@react-navigation/native";

import PhaseButton from "./PhaseButton";
import BracketPhases from "./BracketPhases";
import { useEffect, useRef, useState } from "react";
import { PhaseGroup, GameSet, Wave } from "../../types";
import BracketTree from "./BracketTree";

import testSets from "./test_sets.json";
import BracketWaves from "./BracketWaves";
import BracketFilters from "./BracketFilters";
import { Dropdown } from "react-native-element-dropdown";
import { DropdownOption } from "../../Shared/types";
import { DropdownProps } from "react-native-element-dropdown/lib/typescript/components/Dropdown/model";

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

const BracketPage = ({ navigation, route }: BracketViewProps) => {

    const [sets, updateSets] = useState<GameSet[]>(testSets);
    const phases = useRef(route.params.phases);
    const waves = useRef(route.params.waves);
    const phaseGroups = useRef(
        route.params.phases.reduce<PhaseGroup[]>((prev, cur) => {
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
    })

    if (phases.current.length === 0) {
        return (
            <View style={styles.default}>
                <Text>No brackets found</Text>
            </View>
        )
    }

    const [selectedPhase, setSelectedPhase] = useState(phases.current[0]);
    const [selectedPGroup, setSelectedPGroup] = useState<PhaseGroup>(phases.current[0].phaseGroups[0]);
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

    function DropdownItem(item: DropdownOption, selected?: boolean) {
        return (
            <View style={{ backgroundColor: colors.card, padding: 10 }}>
                <Text style={colorCSS.text}>{item.label}</Text>
            </View>
        )
    }


    return (
        <View style={styles.default}>
            <View style={styles.filters}>
                <BracketPhases phases={phases.current} selectPhase={setSelectedPhase} />

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


export default BracketPage;
