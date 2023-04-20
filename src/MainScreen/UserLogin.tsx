import { StyleProp, StyleSheet, View, ViewStyle } from "react-native"

import { MainText, SubtitleText } from "../Shared/Text"

interface UserLoginProps {
    loggedIn: boolean
    style?: StyleProp<ViewStyle>
}

const UserLogin = ({ loggedIn, style }: UserLoginProps) => {

    if (loggedIn) return (
        <View style={[styles.container, style]}>
            <MainText>Logged In</MainText>
        </View>
    )

    return (
        <View style={[styles.container, style]}>
            <SubtitleText>Log In (disabled)</SubtitleText>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        alignItems: 'center'
    },
    userImageContainer: {

    }
});

export default UserLogin;
