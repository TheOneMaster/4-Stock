import { useTheme } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import { BracketViewProps } from "../../navTypes";

import { useState } from "react";
import { PhaseGroupSetInfo } from "../../types";

import BracketFilters from "./BracketFilters";
import { convertAPITimeToDate } from "../../helper";

const BracketPage = ({ navigation, route }: BracketViewProps) => {

    const [pGroupInfo, setPGroupInfo] = useState<PhaseGroupSetInfo>({
        id: null,
        phaseID: null,
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
            {pGroupInfo.id
                ? <Text style={[colorCSS.text]}>{convertAPITimeToDate(pGroupInfo.startAt).toLocaleDateString()}</Text>
                : null}
        </View>
    )
}

const styles = StyleSheet.create({
    default: {
        flexGrow: 1,
    }
})


export default BracketPage;
