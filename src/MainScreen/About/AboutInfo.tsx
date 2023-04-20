import * as Application from "expo-application";
import { StyleSheet, View } from "react-native";

import { TransparentCard } from "../../Shared";
import { MainText, SubtitleText } from "../../Shared/Text";
import { InfoRowProps } from "./types";

function AboutInfo() {

    const buildVersion = Application.nativeBuildVersion ?? "N/A";
    const appVersion = Application.nativeApplicationVersion ?? "N/A";

    return (
        <TransparentCard style={styles.container}>
            <View style={styles.innerContainer}>
                <InfoRow title="App Version" value={appVersion} />
                <InfoRow title="Build Version" value={buildVersion} />
                <InfoRow title="Made By" value="TheOneMaster" />
            </View>
        </TransparentCard>
    )
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
