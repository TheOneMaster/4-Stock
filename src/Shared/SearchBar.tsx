import { Button, Image, Keyboard, NativeSyntheticEvent, StyleProp, StyleSheet, TextInput, TextInputFocusEventData, TouchableHighlight, TouchableOpacity, View, ViewStyle } from "react-native"
import { useTheme } from "@react-navigation/native";
import { useState } from "react";
import { BackIcon, MagnifyingGlassIcon } from "./SVG";

const SearchBarIcon = ({ selected, onBackPress }: { selected: boolean, onBackPress: () => void }) => {

    const { colors } = useTheme();

    function backEvent() {
        onBackPress();
        Keyboard.dismiss();
    }

    if (!selected) {
        return (
            <View style={styles.imageContainer}>
                <MagnifyingGlassIcon width={25} height={30} color={colors.text} fill={colors.text} />
            </View>
        )
    }

    return (
        <TouchableOpacity onPress={backEvent} style={styles.imageContainer}>
            <BackIcon width={20} height={30} color={colors.text} fill={colors.text} />
        </TouchableOpacity>
    )
}

type SearchBarProps = {
    filter: string,
    filterAction: (filter: string) => void,
    setFilter?: (filter: string) => void,
    searchTitle?: string,
    style?: StyleProp<ViewStyle>
}

const SearchBar = ({ filter, setFilter, filterAction, searchTitle, style }: SearchBarProps) => {

    const [selected, setSelected] = useState<boolean>(false);
    const { colors } = useTheme();

    const [filterText, setFilterText] = useState(filter);



    function handleFocus() {
        setSelected(true);
    }

    function handleBlur() {
        setSelected(false);
    }

    function buttonClick() {
        if (selected) {
            Keyboard.dismiss();
            setSelected(false);
        }
        setFilterText(filterText.trim());
        filterAction(filterText.trim());
    }

    function clearInput() {
        setFilterText("");

        if (setFilter) setFilter("");
    }

    function handleTextChange(text: string) {
        setFilterText(text);

        if (setFilter) setFilter(text.trim());
    }


    return (
        <View style={[styles.container, { backgroundColor: colors.card2 }, style]}>

            <SearchBarIcon selected={selected} onBackPress={clearInput} />

            <View style={styles.filterInput}>
                <TextInput
                    style={{ backgroundColor: colors.card2, padding: 5, color: colors.text }}
                    placeholder="Entrant"
                    placeholderTextColor={colors.secondaryText}
                    value={filterText}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onSubmitEditing={Keyboard.dismiss}
                    onChangeText={handleTextChange}
                />
            </View>

            <View style={styles.filterButton}>
                <Button onPress={buttonClick} title={searchTitle ?? "Search"}></Button>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        overflow: 'hidden'
    },
    imageContainer: {
        width: 35,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    filterInput: {
        marginRight: 5,
        flex: 1,
        height: '100%',
        overflow: 'hidden',
    },
    filterButton: {
        marginLeft: 'auto',
    }
});

export default SearchBar;
