import { useTheme } from "@react-navigation/native";
import * as React from "react";
import { Linking, StyleSheet, Text, TouchableHighlight } from "react-native";
import { DiscordDark, DiscordLight } from "./SVG";

function openLink(url: string, type: string) {
    switch (type) {
        case "discord":
            Linking.openURL(url);
            break;
        case "email":
            Linking.openURL(`mailto:${url}`);
            break;
    }
}



const ContactButton = (props) => {

    const type = props.type;
    const url = props.url;

    const theme = useTheme();
    const colors = theme.colors;

    const style = StyleSheet.create({
        touchable: {
            alignSelf: 'flex-start'
        },
        link: {
            color: colors.link,
            fontWeight: theme.dark ? 'bold' : 'normal'
        }
    })

    let contactLink: JSX.Element|null = null;
    if (type === 'discord') {

        const discLogo = theme.dark ? <DiscordDark width={40} height={40}/> : <DiscordLight width={40} height={40}/>


        contactLink = (
            <TouchableHighlight onPress={() => openLink(url, type)} style={style.touchable}>
                {discLogo}
            </TouchableHighlight>
        )
    }

    if (type === "email") {
        contactLink = (
            <TouchableHighlight style={style.touchable} onPress={() => openLink(url, type)}>
                <Text style={style.link}>{url}</Text>
            </TouchableHighlight>
            )
    }

    return contactLink
}

export default React.memo(ContactButton);
