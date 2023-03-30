import { useState } from "react"
import { Ionicons } from "@expo/vector-icons"
import { NativeSyntheticEvent, Pressable, StyleSheet, TextInput, TextInputSubmitEditingEventData, View } from "react-native"
import { useTheme } from "@react-navigation/native"

interface EyeTextInputProps {
    defaultValue?: string
    onChangeText?: (text: string) => void
    onSubmit?: (text: string) => void
}

function EyeTextInput(props: EyeTextInputProps) {

    const {
        defaultValue,
        onChangeText,
        onSubmit
    } = props

    const [visible, setVisible] = useState(false);
    const [text, updateText] = useState(defaultValue ?? "");

    const { colors } = useTheme();
    const colorCSS = StyleSheet.create({
        container: {
            backgroundColor: colors.card,
            borderColor: colors.border
        },
        textInput: {
            color: colors.text
        }
    })

    function handleUpdate(text: string) {
        updateText(text);
        if (onChangeText) onChangeText(text)
    }

    function handleSubmit(event: NativeSyntheticEvent<TextInputSubmitEditingEventData>) {
        setVisible(false);

        if (onSubmit) onSubmit(event.nativeEvent.text);
    }

    function toggleVisible() {
        setVisible(!visible)
    }


    return (
        <View style={[styles.container, colorCSS.container]}>
            <TextInput
                secureTextEntry={!visible}
                editable={visible}
                value={text}
                onChangeText={handleUpdate}
                onSubmitEditing={handleSubmit}
                style={[styles.textInput, colorCSS.textInput]}
            />

            <Pressable onPress={toggleVisible} style={styles.eyeBox}>
                <Ionicons name={visible ? "eye-off" : "eye"} color={colors.text} />
            </Pressable>

        </View>
    )



}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: "blue",
        alignItems: "center",
        borderWidth: 1
    },
    textInput: {
        width: 150,
        padding: 5
        // backgroundColor: "red"
    },
    eyeBox: {
        padding: 5,
        zIndex: 1,
        // backgroundColor: "green"
    }
});

export default EyeTextInput
