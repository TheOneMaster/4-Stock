import React, { useRef, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import { MainText } from "../Shared/ThemedText";


function FilterItem({ element, title }: { element: JSX.Element, title: string }) {
    return (
        <View style={styles.container}>
            <MainText style={styles.title}>{title}</MainText>
            {element}
        </View>
    )
}

export function FilterText({ title, onUpdate = undefined, ...props }) {

    const [selected, setSelected] = useState(false);
    const { colors } = useTheme();
    const LIGHT_GREY = useRef("#d3d3d3");

    const colorCSS = StyleSheet.create({
        input: {
            borderColor: colors.border,
            color: colors.text
        }
    })

    function handleFocus(event) {
        setSelected(true);

        if (props.onFocus) {
            props.onFocus(event);
        }
    }

    function handleBlur(event) {
        setSelected(false);
    }

    return (
        <View style={styles.container}>
            <MainText style={styles.title}>{title}</MainText>
            <TextInput
                style={[styles.input, colorCSS.input]}
                placeholder={'Genesis'}
                placeholderTextColor={colors.secondaryText}
                onFocus={handleFocus}
                onChangeText={newText => onUpdate(newText)}
                onBlur={handleBlur}
                selectionColor={colors.primary}
                underlineColorAndroid={selected ? colors.primary : LIGHT_GREY.current}

                {...props}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        padding: 7,
        borderWidth: 1,
        borderStyle: "solid",
        fontSize: 15
    },
    title: {
        marginBottom: 5,
        fontSize: 17,
    },
    container: {
        padding: 10
    }
})
