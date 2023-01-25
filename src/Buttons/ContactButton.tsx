// import * as React from "react"
import { Linking, StyleSheet, TouchableHighlight } from "react-native";
import { View, Text, Image } from "react-native";
import DiscordLogo from "../../assets/DiscordLogo.svg"


const ContactButton = (props) => {

    const type = props.type;
    const url = props.url;

    console.log(type)

    const style = StyleSheet.create({
        touchable: {
            alignSelf: 'flex-start'
        },
        link: {
            color: "blue"
        }
    })

    let contactLink: JSX.Element|null = null;
    if (type === 'discord') {
        const contact = () => {
            Linking.openURL(url);
        }
        contactLink = (
            <TouchableHighlight onPress={contact} style={style.touchable}>
                <DiscordLogo width={40} height={40}/>
            </TouchableHighlight>
        )
    }

    if (type === "email") {
        const contact = () => {
            Linking.openURL(`mailto:${url}`);
        }

        contactLink = (
            <TouchableHighlight style={style.touchable} onPress={contact}>
                <Text style={style.link}>{url}</Text>
            </TouchableHighlight>
            )
    }

    return contactLink

}

export default ContactButton;
