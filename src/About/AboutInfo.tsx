import { useTheme } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import * as Application from "expo-application"

import { MainText, SubtitleText } from "../Shared";

function AboutInfo() {

    const { colors } = useTheme();
    const buildVersion = Application.nativeBuildVersion ?? "N/A";
    const appVersion = Application.nativeApplicationVersion ?? "N/A";

    return (
        <View style={[styles.container, { borderColor: colors.border }]}>
            <View style={styles.innerContainer}>
                <InfoRow title="Application Version" value={appVersion} />
                <InfoRow title="Build Version" value={buildVersion} />
                <InfoRow title="Made By" value="TheOneMaster" />
            </View>
        </View>
    )


}

interface InfoRowProps {
    title: string
    value: string
}

function InfoRow({ title, value }: InfoRowProps) {
    return (
        <View style={styles.infoRow}>
            <MainText style={styles.rowTitle}>{title}</MainText>
            <SubtitleText style={styles.rowValue}>{value}</SubtitleText>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 1,
        borderStyle: 'solid'
    },
    innerContainer: {
        paddingHorizontal: 20
    },
    infoRow: {
        paddingVertical: 5
    },
    rowTitle: {
        fontWeight: 'bold',
        fontSize: 17
    },
    rowValue: {
        fontSize: 15
    }
})

export default AboutInfo;
