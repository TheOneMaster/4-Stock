import { useState } from "react"
import { Linking, StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native"
import { useTheme } from "@react-navigation/native"

interface UserLoginProps {
    style?: StyleProp<ViewStyle>
}

const UserLogin = (props: UserLoginProps) => {

    const [loggedIn, setLoggedIn] = useState(false);

    const { colors } = useTheme();

    if (loggedIn) {
        return (
            <View style={[styles.container, props.style]}>
                <Text style={{color: colors.text}}>Logged In</Text>
            </View>
        )
    }

    return (
        <View style={[styles.container, props.style]}>
            <Text style={[{color: colors.link}]}>Log In</Text>
        </View>
    )


}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1,
        // backgroundColor: 'purple',
        alignItems: 'center'
    },
    userImageContainer: {

    }
});

export default UserLogin;
