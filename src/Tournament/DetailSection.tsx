import { StyleSheet, Text, View } from "react-native";

import { DetailsSectionProps } from "./types";
import { convertDateToString, truthyFilter } from "../helper";
import { CustomText } from "../Shared/Text";
import { FontAwesomeThemed, IoniconsThemed, MaterialIconsThemed } from "../Shared/IconTheme";

function DetailSection(props: DetailsSectionProps) {
    const startDate = convertDateToString(props.startAt);
    const lastDateRegister = convertDateToString(props.eventRegistrationClosesAt);

    const location = props.addrState ? [props.city, props.addrState] : [props.city, props.countryCode];
    const locationString = location.filter(truthyFilter).join(", ");
    const numAttendees = props.numAttendees?.toString();

    return (
        <View style={styles.container}>

            <DetailRow title="Location" value={locationString} icon={<FontAwesomeThemed name="location-arrow" size={16} />} />
            <DetailRow title="Starting At" value={startDate} icon={<FontAwesomeThemed name="calendar" size={16} />} />
            <DetailRow title="Last date for registration" value={lastDateRegister} icon={<FontAwesomeThemed name="calendar" size={16} />} />
            <DetailRow title="Number of attendees" value={numAttendees} icon={<IoniconsThemed name="people-outline" size={16} />} />
            <DetailRow title="Venue Address" value={props.venueAddress} icon={<MaterialIconsThemed name="location-city" size={16} />} />

        </View>
    );

};

type DetailRowProps = {
    title: string
    value?: string | null
    icon?: React.ReactNode
}

function DetailRow(props: DetailRowProps) {

    if (!props.value) return null

    return (
        <View style={styles.row}>
            <View style={styles.rowIcon}>
                {props.icon ?? null}
            </View>
            <Text style={{ flexWrap: "wrap" }}>
                <CustomText style={styles.rowType}>{props.title}: </CustomText>
                <CustomText>{props.value}</CustomText>
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexWrap: "wrap",
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        // backgroundColor: "green",
        // marginBottom: 5,
        paddingVertical: 5
    },
    rowType: {
        fontWeight: "bold"
    },
    rowIcon: {
        marginRight: 5,
        // width: 15,
        // alignItems: "center"
    }
})

export default DetailSection;
