import { useTheme } from "@react-navigation/native";
import { ForeignObject, G, Line, Rect, Text } from "react-native-svg";
import { Match, MatchSlot } from "./types";
import { StyleSheet, View } from "react-native";
import { CustomText } from "../../Shared/Text";

export const MATCH_WIDTH = 150;
export const MATCH_HEIGHT = 50;



interface MatchResultProps {
    match: Match
    offsetX?: number
    offsetY?: number
}

interface ParticipantDetails {
    name: string
    sponsor: string | null
}

function getSlotScore(slot?: MatchSlot): string {

    if (!slot) return "N/A"

    const score = slot.standing?.stats?.score?.value;

    if (score == undefined) return "N/A"
    if (score === -1) return "DQ"

    return score.toString()
}

function getSlotParticipants(slot?: MatchSlot): ParticipantDetails[] {
    const defaultDetails: ParticipantDetails[] = [{name: "N/A", sponsor: null}]

    if (!slot) return defaultDetails;

    const participants = slot.standing?.entrant?.participants;
    if (!participants) return [{name: slot.standing?.entrant?.name ?? "N/A", sponsor: null}];

    const participantDetails: ParticipantDetails[] = participants.map(participant => {
        return {
            name: participant?.gamerTag ?? "N/A",
            sponsor: participant?.prefix ?? null
        }
    })

    return participantDetails
}


export function MatchResult(props: MatchResultProps) {

    const {
        offsetX = 0,
        offsetY = 0,
        match
    } = props;

    const winnerSlot = match.slots?.find(slot => slot?.standing?.placement === 1);
    const loserSlot = match.slots?.find(slot => slot?.standing?.placement !== 1);

    const winnerDetails = getSlotParticipants(winnerSlot);
    const loserDetails = getSlotParticipants(loserSlot);

    // TODO: Change rendering based on whether there are multiple participants or a single one
    const winnerName = winnerDetails.map(part => {
        return part.sponsor ? `${part.sponsor}|${part.name}` : part.name;
    }).join(" / ");
    const loserName = loserDetails.map(part => part.name).join(" / ");

    const winnerScore = getSlotScore(winnerSlot);
    const loserScore = getSlotScore(loserSlot);

    const winnerData: PlayerData[] = winnerDetails.map((player) => ({
        name: player.name,
        sponsor: player.sponsor,
        score: winnerScore
    }));

    const loserData: PlayerData[] = loserDetails.map((player) => ({
        name: player.name,
        sponsor: player.sponsor,
        score: loserScore
    }))

    return (
        <>
            <ForeignObject x={offsetX} y={offsetY} width={MATCH_WIDTH} height={MATCH_HEIGHT}>
                <View style={[styles.container]}>
                    <EntrantRow player={winnerData[0]} scoreColor="green" />
                    <View style={{width: "100%", height: 1, backgroundColor: "grey"}} />
                    <EntrantRow player={loserData[0]} scoreColor="red" />
                </View>
            </ForeignObject>
        </>
    )
}

interface EntrantRowProps {
    player: PlayerData,
    scoreColor: string
}

function EntrantRow(props: EntrantRowProps) {
    return(
        <View style={[styles.entrantRow]}>
            <View style={styles.entrantName}>
                {props.player.sponsor && <CustomText numberOfLines={1} style={{maxWidth: 30}}>{props.player.sponsor}</CustomText>}
                {props.player.sponsor && <CustomText> | </CustomText>}
                <CustomText numberOfLines={1}>{props.player.name}</CustomText>
            </View>
            <View style={[styles.scoreBox, {backgroundColor: props.scoreColor}]}>
                <CustomText style={styles.scoreText} numberOfLines={1} adjustsFontSizeToFit>{props.player.score}</CustomText>
            </View>
        </View>
    )
}

interface PlayerData {
    name: string
    sponsor?: string | null
    score: string
}



const styles = StyleSheet.create({
    container: {
        width: 150,
        height: 50,
        borderWidth: 1,
        borderColor: "grey",
    },
    entrantRow: {
        flex: 1,
        flexDirection: "row",
    },
    entrantName: {
        flex: 9,
        paddingLeft: 5,
        overflow: "hidden",
        flexDirection: "row"
    },
    scoreBox: {
        paddingHorizontal: 5,
        left: "auto",
        flex: 1,
    },
    scoreText: {
        textAlign: "center",
        // flexShrink: 1,
        // flexWrap: "wrap"
    },
    seperator: {
        width: "100",
        height: 1,
        backgroundColor: "grey"
    }
})
