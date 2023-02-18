import { useTheme } from "@react-navigation/native";
import { useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";

type SettingsItemType = {
    title: string,
    setting?: string,
    type: "switch"|"dropdown-single"|"dropdown-multiple"
};

const SettingsItem = ({title, setting, type}: SettingsItemType) => {

    const { colors } = useTheme();

    const [enabled, setEnabled] = useState(false);


    return (
        <View style={[styles.container, {backgroundColor: colors.card}]}>
            <View style={{flex: 1}}>
                <Text style={[styles.title, {color: colors.text}]}>{title}</Text>
            </View>
            <View style={styles.switch}>
                <Switch
                    onValueChange={() => setEnabled(!enabled)}
                    value={enabled}
                    trackColor={{
                        true: colors.primary
                    }}
                    // thumbColor={'#f4f3f4'}
                />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        padding: 10
    },
    title: {
        fontSize: 17,
        fontWeight: 'bold',
        flexWrap: 'wrap',
        flexShrink: 1
    },
    switch: {
        marginLeft: 'auto'
    }
});

export default SettingsItem;
