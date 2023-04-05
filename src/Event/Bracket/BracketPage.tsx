import { StyleProp, StyleSheet, Text, TextStyle, View } from "react-native";
import { useEffect, useState } from "react";
import { useTheme } from "@react-navigation/native";


import { BracketViewProps } from "../../navTypes";
import { GameSet, Phase, PhaseGroup, PhaseGroupSetInfo, SetSlot } from "../../types";
import { getPGroupSetInfo } from "../../api";
import { MainText } from "../../Shared/ThemedText";
import BracketFilters from "./BracketFilters";
import BracketSetsList from "./BracketSetsList";
import { convertAPITimeToDate, truthyFilter } from "../../helper";

const BracketPage = ({ navigation, route }: BracketViewProps) => {

    const id = route.params.id;
    const phases = route.params.phases?.filter(truthyFilter) ?? [];
    const waves = route.params.waves?.filter(truthyFilter) ?? [];

    const [loading, setLoading] = useState(true);
    const [pGroupInfo, setPGroupInfo] = useState<PhaseGroupSetInfo>({
        id: null,
        phaseID: null,
        sets: [],
        startAt: null,
        state: null
    });

    if (phases.length === 0) {
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
            const filteredSets = curInfo.sets.reduce<GameSet[]>((prev, cur) => {

                const winner = cur.slots.reduce((prev, cur) => {
                    if (cur.standing && cur.standing.placement === 1) return cur
                    return prev
                }, null);
                const losers = cur.slots.reduce<SetSlot[]>((prev, cur) => {
                    if (cur.standing === null) return prev
                    return [...prev, cur]
                }, []);

                if (winner && losers.length > 0) {
                    return [...prev, cur]
                }

                return prev
            }, []);

            const clone: PhaseGroupSetInfo = {
                id: selectedPGroup.id,
                phaseID: selectedPhase.id,
                sets: filteredSets,
                startAt: curInfo.startAt,
                state: curInfo.state
            }

            setPGroupInfo(clone);
        }).catch(error => {
            if (error.name === "AbortError") {
                return
            }
        }).finally(() => {
            setLoading(false)
        });

        return () => {
            controller.abort();
        }
    }

    return (
        <View style={styles.default}>
            <BracketFilters eventDetails={route.params} pGroupInfo={pGroupInfo} updatePGroupInfo={updatePGroupInfo} />
            {loading
                ? null
                : <PhaseGroupStartText time={pGroupInfo.startAt} style={styles.phaseGroupStartText} />}
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

interface PhaseGroupStartTextProps {
    time: number
    style?: StyleProp<TextStyle>
}

function PhaseGroupStartText(props: PhaseGroupStartTextProps) {

    const startDate = convertAPITimeToDate(props.time);
    const curDate = new Date();

    const past = curDate >= startDate;

    const { colors } = useTheme();

    if (!props.time) return <MainText style={props.style}>Starting time not provided</MainText>

    return (
        <Text style={props.style}>
            <MainText>{past ? "Started at:" : "Starting at:"}</MainText>
            <Text style={{ color: "green" }}> {startDate.toLocaleDateString()} </Text>
            <Text style={{ color: colors.primary }}>{startDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</Text>
        </Text>
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
    },
    phaseGroupStartText: {
        marginTop: 10,
        marginHorizontal: 10,
        fontWeight: "bold",
    }
})


export default BracketPage;
