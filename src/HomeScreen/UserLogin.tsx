import { useState } from "react"
import { Linking, StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native"
import { useTheme } from "@react-navigation/native"

interface UserLoginProps {
    loggedIn: boolean
    style?: StyleProp<ViewStyle>
}

const UserLogin = ({loggedIn, style}: UserLoginProps) => {

    const { colors } = useTheme();

    if (loggedIn) {
        return (
            <View style={[styles.container, style]}>
                <Text style={{color: colors.text}}>Logged In</Text>
            </View>
        )
    }

    return (
        <View style={[styles.container, style]}>
            <Text style={[{color: colors.link}]}>Log In</Text>
        </View>
    )


}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1,
        alignItems: 'center'
    },
    userImageContainer: {

    }
});

export default UserLogin;
