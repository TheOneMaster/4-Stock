import { View, Text, StyleSheet, TouchableOpacity } from "react-native"


const TopBar = () => {
    const style = StyleSheet.create({
        container: {
            // flex: 1,
            width: null,
            backgroundColor: "red",
            // height: 10,
            padding: 10
        }
    });


    return (
        <View style={style.container}>

            <TouchableOpacity>
                {/* <Image></Image> */}
            </TouchableOpacity>

            <Text style={{color: "white", fontWeight: 'bold'}}>StartGG Mobile App</Text>

        </View>
    )
}

export default TopBar;
