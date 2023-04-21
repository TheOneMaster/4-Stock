import * as React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Linking, StyleSheet, TouchableHighlight } from "react-native";

import { LinkText } from "./Text";

function openLink(url: string, type: string | null) {
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

const ContactButton = ({ type, url, size }: ContactButtonProps) => {

    if (url === null) return null;

    const DIMENSION = size ?? DEFAULT_SIZE;

    return (
        <TouchableHighlight onPress={() => openLink(url, type)} style={styles.touchable}>
            {type === "discord"
                ? <MaterialCommunityIcons name="discord" size={DIMENSION} color="#7289DA" />
                : <LinkText>{url}</LinkText>
            }
        </TouchableHighlight>
    )


}

const styles = StyleSheet.create({
    touchable: {
        alignSelf: 'flex-start'
    }
});

export default ContactButton
