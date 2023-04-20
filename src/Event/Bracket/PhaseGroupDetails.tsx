import { StyleSheet, Text, View } from "react-native";

import { convertAPITimeToDate } from "../../helper";
import { AccentText, MainText } from "../../Shared/Text";
import { PhaseGroupDetailsProps } from "./types"

export function PhaseGroupDetails(props: PhaseGroupDetailsProps) {
    if (props.details === undefined) return null;

    const startTime = props.details.startAt ? convertAPITimeToDate(props.details.startAt) : null;
    const isPast = startTime ? new Date() > startTime : true;

    return (
        <View style={props.style}>
            {startTime
                ? <MainText>
                    {isPast ? "Started at " : "Starting at "}
                    <Text style={styles.dateText}>{startTime.toLocaleDateString()} </Text>
                    <AccentText>{startTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</AccentText>
                </MainText>
                : null}
        </View>
    )
}

const styles = StyleSheet.create({
    dateText: {
        color: "green"
    }
})
