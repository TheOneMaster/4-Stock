import { useTheme } from "@react-navigation/native";
import * as React from "react";
import { Linking, StyleSheet, Text, TouchableHighlight } from "react-native";
import { DiscordDark, DiscordLight } from "./SVG";

function openLink(url: string, type: string|null) {
    switch (type) {
        case "discord":
            Linking.openURL(url);
            break;
        case "email":
            Linking.openURL(`mailto:${url}`);
            break;
        default:
            Linking.openURL(url)
    }
}

const DEFAULT_SIZE = 40;

interface ContactButtonProps {
    type: string | null
    url: string | null
    size?: number
}

const ContactButton = ({type, url, size}: ContactButtonProps) => {
    const theme = useTheme();
    const colors = theme.colors;

    const stylesheetColors = StyleSheet.create({
        link: {
            color: colors.link,
            fontWeight: theme.dark ? 'normal' : 'bold'
        }
    });

    if (url === null) return null

    if (type === 'discord') {
        const DIMENSION = size ?? DEFAULT_SIZE;
        const discordLogo = theme.dark ? <DiscordDark width={DIMENSION} height={DIMENSION}/> : <DiscordLight width={DIMENSION} height={DIMENSION}/>;
        return (
            <TouchableHighlight onPress={() => openLink(url, type)} style={styles.touchable}>
                { discordLogo }
            </TouchableHighlight>
        )
    }

    return (
        <TouchableHighlight onPress={() => openLink(url, type)} style={styles.touchable}>
            <Text style={stylesheetColors.link}>{url}</Text>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    touchable: {
        alignSelf: 'flex-start'
    }
});

export default ContactButton
