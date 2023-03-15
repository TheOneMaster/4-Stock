import { useTheme } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import { BracketViewProps } from "../../navTypes";

import { useState } from "react";
import { Phase, PhaseGroup, PhaseGroupSetInfo } from "../../types";

import BracketFilters from "./BracketFilters";
import { convertAPITimeToDate } from "../../helper";
import BracketSetsList from "./BracketSetsList";
import { getPGroupSetInfo } from "../../api";

const BracketPage = ({ navigation, route }: BracketViewProps) => {

    const [pGroupInfo, setPGroupInfo] = useState<PhaseGroupSetInfo>({
        id: null,
        phaseID: null,
        sets: [],
        startAt: null,
        state: null
    });
    const [loading, setLoading] = useState(true);

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
                <View style={styles.centerText}>
                    <Text style={colorCSS.text}>No brackets found</Text>
                </View>
            </View>
        )
    }

    function updatePGroupInfo(selectedPGroup: PhaseGroup, selectedPhase: Phase) {
        const controller = new AbortController();
        setLoading(true);
        const data = getPGroupSetInfo(selectedPGroup.id, controller);

        data.then(curInfo => {
            if (curInfo.sets.length === 0) {
                return
            }

            const clone: PhaseGroupSetInfo = {
                id: selectedPGroup.id,
                phaseID: selectedPhase.id,
                sets: curInfo.sets,
                startAt: curInfo.startAt,
                state: curInfo.state
            };

            setPGroupInfo(clone);
            setLoading(false);
        })

        return () => {
            controller.abort();
        }
    }

    return (
        <View style={styles.default}>
            <BracketFilters eventDetails={route.params} pGroupInfo={pGroupInfo} updatePGroupInfo={updatePGroupInfo} />
            <View style={{ flex: 1 }}>
                {loading
                    ? <View style={styles.centerText}>
                        <Text style={colorCSS.text}>Loading...</Text>
                    </View>
                    : <BracketSetsList sets={pGroupInfo.sets} containerStyle={styles.resultContainer} />
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    default: {
        flexGrow: 1,
    },
    resultContainer: {
        paddingTop: 10,
        paddingHorizontal: 10,
    },
    centerText: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})


export default BracketPage;
