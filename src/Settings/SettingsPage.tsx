import { StyleSheet, View, Text } from "react-native"
import SettingsItem from "./SettingsItem";


const SettingsPage = ({navigation, route}) => {

    return (
        <View style={styles.container}>
            <SettingsItem title="Test" type="switch"></SettingsItem>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 10,
        marginHorizontal: 10
    }
});

export default SettingsPage;
