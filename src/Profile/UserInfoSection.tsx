import { StyleSheet, Text, View } from "react-native";

import { MainText, SubtitleText } from "../Shared";
import { IoniconsThemed } from "../Shared/IconTheme";
import { UserInfoSectionProps } from "./types";

function UserInfoSection(props: UserInfoSectionProps) {
    const { player, location, genderPronoun } = props;

    const gamerTag = player?.gamerTag;
    const realName = player?.user?.name;
    const locationString = (location?.state) ? `${location.state}, ${location.country}` : location?.country ?? ""

    return (
        <View style={[styles.profileInfo, props.style]}>

            <View style={styles.profileNames}>
                <MainText style={styles.profileName}>{gamerTag}</MainText>
                {player?.user?.name && <SubtitleText>{realName}</SubtitleText>}
            </View>

            <View style={styles.profileDetails}>
                <View style={styles.profileLocation}>
                    <Text>
                        <IoniconsThemed name="location-outline" size={15} text="secondary" />
                        <SubtitleText> {locationString}</SubtitleText>
                    </Text>
                </View>
            </View>

        </View>
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
    }
});

export default UserInfoSection
