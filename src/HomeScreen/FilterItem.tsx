import React, { useRef, useState } from "react";
import { NativeSyntheticEvent, StyleSheet, Text, TextInput, TextInputFocusEventData, TextInputProps, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import { MainText } from "../Shared/ThemedText";

interface FilterTextProps extends TextInputProps {
    title: string
    onUpdate: React.Dispatch<React.SetStateAction<string>>
}

export function FilterText(props: FilterTextProps) {

    const { title, onUpdate } = props;

    const [selected, setSelected] = useState(false);
    const { colors } = useTheme();
    const LIGHT_GREY = useRef("#d3d3d3");

    const colorCSS = StyleSheet.create({
        input: {
            borderColor: colors.border,
            color: colors.text
        }
    })

    function handleFocus(event: NativeSyntheticEvent<TextInputFocusEventData>) {
        setSelected(true);

        if (props.onFocus) {
            props.onFocus(event);
        }
    }

    function handleBlur() {
        setSelected(false);
    }

    function handleTextChange(newText: string) {
        const trimmed = newText.trim();
        onUpdate(trimmed);
    }

    return (
        <View style={styles.container}>
            <MainText style={styles.title}>{title}</MainText>
            <TextInput

                style={[styles.input, colorCSS.input]}
                placeholder={'Genesis'}
                placeholderTextColor={colors.secondaryText}
                onFocus={handleFocus}
                onChangeText={handleTextChange}
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
