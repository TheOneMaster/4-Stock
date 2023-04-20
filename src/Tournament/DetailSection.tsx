import { StyleSheet, View } from "react-native";

import { DetailsSectionProps } from "./types";
import { convertDateToString } from "../helper";
import { MainText } from "../Shared/Text";

function DetailSection(props: DetailsSectionProps) {
    const startDate = convertDateToString(props.startAt);
    const lastDateRegister = convertDateToString(props.eventRegistrationClosesAt);

    return (
        <View style={styles.container}>
            <View>
                <MainText>City: {props.city}</MainText>
                <MainText>Starting At: {startDate}</MainText>
                <MainText>Country: {props.countryCode}</MainText>
                <MainText>Currency: {props.currency}</MainText>
                {props.eventRegistrationClosesAt && <MainText>Last date for registration: {lastDateRegister}</MainText>}
                <MainText>Number of attendees: {props.numAttendees}</MainText>
                <MainText>Venue Address: {props.venueAddress}</MainText>
            </View>
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default DetailSection;
