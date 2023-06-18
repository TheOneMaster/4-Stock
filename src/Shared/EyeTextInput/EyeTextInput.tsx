import { useState } from "react"
import { NativeSyntheticEvent, Pressable, StyleProp, StyleSheet, TextInputSubmitEditingEventData, ViewStyle } from "react-native"

import { PrimaryCard } from "../Containers/Containers"
import { IoniconsThemed } from "../IconTheme"
import { ThemedTextInput } from "../ThemedNativeElements"

interface EyeTextInputProps {
    defaultValue?: string
    onChangeText?: (text: string) => void
    onSubmit?: (text: string) => void
    style?: StyleProp<ViewStyle>
}

function EyeTextInput(props: EyeTextInputProps) {

    const {
        defaultValue,
        onChangeText,
        onSubmit
    } = props

    const [visible, setVisible] = useState(false);
    const [text, updateText] = useState(defaultValue ?? "");

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
        <PrimaryCard style={[styles.container, props.style]}>
            <ThemedTextInput
                secureTextEntry={!visible}
                editable={visible}
                value={text}
                onChangeText={handleUpdate}
                onSubmitEditing={handleSubmit}
                style={styles.textInput}
            />

            <Pressable onPress={toggleVisible} style={styles.eyeBox}>
                <IoniconsThemed name={visible ? "eye-off" : "eye"} />
            </Pressable>

        </PrimaryCard>
    )



}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1
    },
    textInput: {
        width: 150,
        padding: 5
    },
    eyeBox: {
        marginLeft: "auto",
        padding: 5,
        zIndex: 1,
    }
});

export default EyeTextInput
