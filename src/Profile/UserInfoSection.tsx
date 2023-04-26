import { StyleSheet, View } from "react-native";

import { UserInfoSectionProps } from "./types";
import { TransparentCard } from "../Shared";
import { IoniconsThemed, FontAwesomeThemed } from "../Shared/IconTheme";
import { CustomText, SubtitleText } from "../Shared/Text";

function UserInfoSection(props: UserInfoSectionProps) {
    const { player, location, genderPronoun } = props;

    const gamerTag = player?.gamerTag;
    const realName = player?.user?.name;
    const locationString = (location?.state) ? `${location.state}, ${location.country}` : location?.country;

    return (
        <View style={[styles.profileInfo, props.style]}>

            <View style={styles.profileNames}>
                <CustomText style={styles.profileName}>{gamerTag}</CustomText>
                {realName && <SubtitleText>{realName}</SubtitleText>}
            </View>

            <View style={styles.profileDetails}>
                <InfoRow icon={<IoniconsThemed name="location-outline" size={15} text="secondary" />} text={locationString} />
                <InfoRow icon={<FontAwesomeThemed name="id-badge" size={15} text="secondary" />} text={genderPronoun} />
            </View>

        </View>
    )
}

interface InfoRowProps {
    icon: React.ReactNode
    text?: string | null
}

function InfoRow(props: InfoRowProps) {

    if (props.text === undefined || props.text === null) return null

    return (
        <TransparentCard style={styles.infoRow}>
            <View style={styles.infoRowIcon}>
                {props.icon}
            </View>
            <SubtitleText>{props.text}</SubtitleText>
        </TransparentCard>
    )
}



const styles = StyleSheet.create({
    profileInfo: {
        marginLeft: 10,
    },
    profileNames: {
        marginTop: "auto",
        marginBottom: "auto",
        paddingVertical: 5
    },
    profileName: {
        fontSize: 17,
        fontWeight: '500',
    },
    profileLocation: {
        flexDirection: "row",
        alignItems: "center"
    },
    profileDetails: {
        marginTop: "auto",
        marginBottom: 5
    },
    infoRow: {
        flexDirection: "row",
        alignItems: "center"
    },
    infoRowIcon: {
        marginRight: 5,
        width: 15,
        // justifyContent: "center",
        alignItems: "center"
    }
});

export default UserInfoSection
