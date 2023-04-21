import { TextInput, TextInputProps } from "react-native";
import { useTheme } from "@react-navigation/native";

export function ThemedTextInput(props: TextInputProps) {
    const { colors } = useTheme();

    const newProps = Object.assign({}, props);
    newProps.style = [props.style, { color: colors.text }]

    return <TextInput {...newProps} />
}
