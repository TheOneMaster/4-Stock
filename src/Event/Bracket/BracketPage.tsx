import { useTheme } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import { BracketViewProps } from "../../navTypes";

import { useEffect, useRef, useState } from "react";
import { GameSet, PhaseGroup, PhaseGroupSetInfo, Wave } from "../../types";
import BracketPhases from "./BracketPhases";

import { Dropdown } from "react-native-element-dropdown";
import { getPGroupSetInfo } from "../../api";
import { DropdownOption } from "../../Shared/types";
import BracketFilters from "./BracketFilters";
import { convertAPITimeToDate, convertDateToUnixSeconds } from "../../helper";

const BracketPage = ({ navigation, route }: BracketViewProps) => {

    const [pGroupInfo, setPGroupInfo] = useState<PhaseGroupSetInfo>({
        sets: [],
        startAt: null,
        state: null
    });

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

    if (route.params.phases.length === 0) {
        return (
            <View style={styles.default}>
                <Text>No brackets found</Text>
            </View>
        )
    }


    return (
        <View style={styles.default}>
            <BracketFilters eventDetails={route.params} pGroupInfo={pGroupInfo} updatePGroupInfo={setPGroupInfo} />
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
