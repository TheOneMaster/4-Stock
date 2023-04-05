import React from "react"
import { useTheme } from "@react-navigation/native"
import { StyleSheet, View } from "react-native"

import { MainText } from "../Shared/ThemedText"

interface SettingsGroupProps {
    title: string
    children?: React.ReactNode
}

function SettingsGroup(props: SettingsGroupProps) {

    const { colors } = useTheme();
    const { children, title } = props;

    const colorCSS = StyleSheet.create({
        container: {
            backgroundColor: colors.card,
            borderColor: colors.border
        },
        children: {
            borderColor: colors.border
        }
    });

    const totalChildren = React.Children.count(children);


    return (
        <View style={[styles.container, colorCSS.container]}>
            <MainText style={styles.title}>{title}</MainText>
            <View style={styles.innerContainer}>
                {
                    // React.Children.map(children, (child, index) => (
                    //     <View style={index === totalChildren - 1 ? [styles.setting, styles.finalSetting, colorCSS.children] : [styles.setting, colorCSS.children]}>
                    //         {child}
                    //     </View>
                    // )
                    // )
                    React.Children.map(children, (child, index) => {
                        const isFinalChild = index === totalChildren - 1;

                        if (isFinalChild) return child;

                        return (
                            <>
                                {child}
                                <View style={{ marginVertical: 2.5 }} />
                            </>
                        )

                    })
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        margin: 10,
        borderRadius: 20,
        borderWidth: 1
    },
    title: {
        marginLeft: 10,
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10
        // textDecorationLine: "underline"
    },
    innerContainer: {
        // flex: 1
        // paddingHorizontal: 5
    },
    setting: {
        // marginBottom: 5,
        // paddingVertical: 10,
        paddingHorizontal: 10,
        borderBottomWidth: 1
    },
    finalSetting: {
        borderBottomWidth: 0
    }
})

export default SettingsGroup
