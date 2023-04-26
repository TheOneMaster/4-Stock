import { StyleSheet, View } from "react-native";

import { DetailsSectionProps } from "./types";
import { convertDateToString } from "../helper";
import { CustomText } from "../Shared/Text";

function DetailSection(props: DetailsSectionProps) {
    const startDate = convertDateToString(props.startAt);
    const lastDateRegister = convertDateToString(props.eventRegistrationClosesAt);

    return (
        <View style={styles.container}>
            <View>
                <CustomText>City: {props.city}</CustomText>
                <CustomText>Starting At: {startDate}</CustomText>
                <CustomText>Country: {props.countryCode}</CustomText>
                <CustomText>Currency: {props.currency}</CustomText>
                {props.eventRegistrationClosesAt && <CustomText>Last date for registration: {lastDateRegister}</CustomText>}
                <CustomText>Number of attendees: {props.numAttendees}</CustomText>
                <CustomText>Venue Address: {props.venueAddress}</CustomText>
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
