import { useTheme } from "@react-navigation/native"
import { StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { DropdownProps } from "react-native-element-dropdown/lib/typescript/components/Dropdown/model";

export function ThemedDropdown<T>(props: DropdownProps<T>) {

    const { colors } = useTheme();

    const colorCSS = StyleSheet.create({
        text: {
            color: colors.text
        },
        container: {
            backgroundColor: colors.card
        },
        main: {
            backgroundColor: colors.card,
            borderColor: colors.border
        }
    })

    const newProps = Object.assign({}, props);
    newProps.itemTextStyle = colorCSS.text;
    newProps.selectedTextStyle = colorCSS.text;
    newProps.activeColor = colors.primary;
    newProps.containerStyle = colorCSS.container;
    newProps.itemContainerStyle = colorCSS.container;
    newProps.style = [colorCSS.main, props.style];

    return <Dropdown {...newProps} />
}
