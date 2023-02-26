import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import { version } from "../../package.json"

function AboutInfo() {

    const { colors } = useTheme()

    return (
        <View style={[styles.container, { borderColor: colors.border }]}>
            <View style={{ paddingHorizontal: 20 }}>
                <InfoRow title="Version" value={version} />
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
    const { colors } = useTheme();

    return (
        <View style={styles.infoRow}>
            <Text style={[styles.rowTitle, { color: colors.text }]}>{title}</Text>
            <Text style={[styles.rowValue, { color: colors.secondaryText }]}>{value}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 1,
        borderStyle: 'solid'
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
