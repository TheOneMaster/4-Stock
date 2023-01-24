import { View, Text, Image, StyleSheet, TouchableOpacity, Pressable } from "react-native";

export const TournamentCard = (props, key) => {
    const id = props.id;
    const name = props.name;
    const city = props.city;
    const date = new Date(props.startAt*1000).toLocaleDateString();
    const profile_image = props.images.reduce((prev, cur) => {
        if (cur.type === 'profile') {
            return cur;
        }
        return prev;
    }, {})
    const style = props.style || {};

    const styles = StyleSheet.create({
        container: {
            // padding: 5,
            flex: 1,
            flexDirection: 'row',
            
            borderWidth: 1,
            // borderRadius: 15,
            borderColor: "black",
            borderStyle: "solid"
        },

        image: {
            height: 100,
            width: 100,
            // flex: 1,
            // flexDirection: 'column'
        },

        textBox: {
            // paddingLeft: 10,
            // padding: 10
            paddingHorizontal: 10
        },

        title: {
            fontWeight: 'bold',
            marginVertical: 10
        }
    })

    function test() {
        console.log(name)
    }

    return (
        <Pressable style={style} onPress={test}>
            <View style={styles.container}>
                <View>
                    <Image style={styles.image} source={{uri: profile_image.url}}></Image>
                </View>
                <View style={styles.textBox}>
                    <Text style={styles.title}>{name}</Text>
                    <Text>City: {city}</Text>
                    <Text>Date: {date}</Text>
                </View>
            </View>
        </Pressable>
        
    )


}
