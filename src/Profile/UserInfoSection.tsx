import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";

import { MainText, SubtitleText } from "../Shared";
import { UserInfoSectionProps } from "./types";

function UserInfoSection(props: UserInfoSectionProps) {
    const { player, location, genderPronoun } = props;
    const { colors } = useTheme();

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
                        <Ionicons name="location-outline" color={colors.secondaryText} size={15} />
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
