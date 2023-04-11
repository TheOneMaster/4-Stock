import { useTheme } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Button, Keyboard, StyleSheet, TextInput, View } from "react-native";

import { TransparentCard } from "../Containers/Containers";
import { IoniconsThemed } from "../IconTheme";
import { SearchBarProps } from "./types";

const SearchBarIcon = ({ selected, onBackPress }: { selected: boolean, onBackPress: () => void }) => {

    function backEvent() {
        onBackPress();
        Keyboard.dismiss();
    }

    return (
        <TransparentCard touchable={selected} onPress={backEvent} style={styles.imageContainer}>
            <IoniconsThemed name={selected ? "arrow-back-outline" : "search-outline"} text="primary" size={25} />
        </TransparentCard>
    )
}



export const SearchBar = (props: SearchBarProps) => {

    const { filter, filterAction, setFilter, searchTitle, placeholder, style } = props;

    const [selected, setSelected] = useState(false);
    const [filterText, setFilterText] = useState(filter ?? "");

    const { colors } = useTheme();

    useEffect(() => {
        if (typeof filter === "string" && filter !== filterText) {
            setFilterText(filter);
        }
    }, [filter])


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
                    placeholder={placeholder}
                    placeholderTextColor={colors.secondaryText}
                    value={filterText}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onSubmitEditing={buttonClick}
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
