import React from "react"
import { StyleSheet, View } from "react-native"

import { MainText, PrimaryCard } from "../../Shared"

interface SettingsGroupProps {
    title: string
    children?: React.ReactNode
}

function SettingsGroup(props: SettingsGroupProps) {

    const { children, title } = props;

    const totalChildren = React.Children.count(children);

    return (
        <PrimaryCard style={styles.container}>
            <MainText style={styles.title}>{title}</MainText>
            <View style={styles.innerContainer}>
                {
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
        </PrimaryCard>
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
