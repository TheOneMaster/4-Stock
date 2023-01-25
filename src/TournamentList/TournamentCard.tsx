import { useTheme } from "@react-navigation/native";
import { View, Text, Image, StyleSheet, TouchableOpacity, Pressable } from "react-native";

export const TournamentCard = (props) => {
    const id = props.id;
    const name = props.name;
    const city = props.city;
    const date = new Date(props.startAt*1000).toLocaleDateString();
    const profile_image = props.images.reduce((prev, cur) => {
        if (cur.type === 'profile') {
            return cur;
        }
        return prev;
    }, {});

    const { colors } = useTheme();

    const style = props.style || {};

    const navigation = props.navigation;

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'row',
            borderWidth: 1,
            borderColor: colors.border,
            borderStyle: "solid",
            backgroundColor: colors.card
        },

        image: {
            overflow: "hidden",
            resizeMode: "contain",
            flex: 1,
        },

        textBox: {
            paddingHorizontal: 10,
        },
        text: {
            color: colors.text,
        },

        title: {
            fontWeight: 'bold',
            marginVertical: 10,
            color: colors.text
        }
    })

    function navigateToTournament() {
        console.log(id);

        const params = {
            id: id,
            name: name,
            city: city,
            date: props.startAt,
            images: props.images
        }

        navigation.navigate("Tournament", params);
    }

    return (
        <Pressable style={style} onPress={navigateToTournament}>
            <View style={styles.container}>
                <View style={{width: 100, height: 100}}>
                    <Image style={styles.image} source={{uri: profile_image.url}}></Image>
                </View>
                <View style={styles.textBox}>
                    <Text style={styles.title}>{name}</Text>
                    <Text style={styles.text}>City: {city}</Text>
                    <Text style={styles.text}>Date: {date}</Text>
                </View>
            </View>
        </Pressable>
        
    )


}
