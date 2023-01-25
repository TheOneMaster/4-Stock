import { StyleSheet } from "react-native"
import { View, Text } from "react-native";
import { Dimensions } from "react-native";

const FailedAPI = () => {

    const styles = StyleSheet.create({
        container: {
            position: 'absolute',
            // backgroundColor: 'red',
            width: '100%',
            bottom: 30
        },
        inner_container: {
            marginHorizontal: 10,
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            // justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
            flex: 1,
            borderRadius: 10
        },
        text: {
            // flex: 1,
            // flexWrap: 'wrap',
            // flexShrink: 1,
            // color: '#fff'
        }
    });

    return (
        <View style={styles.container}>
            <View style={styles.inner_container}>
                <Text style={styles.text}>API Query has failed. Please try again in a little bit.</Text>
            </View>
        </View>
    )
}

export default FailedAPI
