import { StyleSheet, View } from "react-native";
import { BracketViewProps } from "../../navTypes";

import { useState } from "react";
import { Phase, PhaseGroup, PhaseGroupSetInfo } from "../../types";

import { getPGroupSetInfo } from "../../api";
import { MainText } from "../../Shared/ThemedText";
import BracketFilters from "./BracketFilters";
import BracketSetsList from "./BracketSetsList";

const BracketPage = ({ navigation, route }: BracketViewProps) => {

    const [pGroupInfo, setPGroupInfo] = useState<PhaseGroupSetInfo>({
        id: null,
        phaseID: null,
        sets: [],
        startAt: null,
        state: null
    });
    const [loading, setLoading] = useState(true);

    if (route.params.phases.length === 0) {
        return (
            <View style={styles.default}>
                <View style={styles.centerText}>
                    <MainText>No brackets found</MainText>
                </View>
            </View>
        )
    }

    function updatePGroupInfo(selectedPGroup: PhaseGroup, selectedPhase: Phase) {
        const controller = new AbortController();
        setLoading(true);
        const data = getPGroupSetInfo(selectedPGroup.id, controller);

        data.then(curInfo => {
            const clone: PhaseGroupSetInfo = {
                id: selectedPGroup.id,
                phaseID: selectedPhase.id,
                sets: curInfo.sets,
                startAt: curInfo.startAt,
                state: curInfo.state
            }

            setPGroupInfo(clone);
            setLoading(false);
        }).catch(error => {
            if (error.name === "AbortError") {
                return
            }
        });

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
                        <MainText>Loading...</MainText>
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
