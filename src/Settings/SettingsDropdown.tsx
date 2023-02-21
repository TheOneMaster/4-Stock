import React, { useState } from "react";
import { FlatList, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from "react-native"
import { useTheme } from "@react-navigation/native";
import { DropdownOption, SettingsDropdownProps } from "./types";
import { ArrowDown, ArrowLeft, CheckMark } from "../Shared/SVG";

interface DropdownItemProps {
    item: DropdownOption,
    active: boolean,
    selectItem: React.Dispatch<React.SetStateAction<number>>,
    closeDrawer: () => void,
}

const DropdownItem = ({ item, selectItem, active, closeDrawer }: DropdownItemProps) => {

    const label = item.label;
    const value = item.value;

    const { colors } = useTheme();

    function pressed() {
        selectItem(value);
        closeDrawer();
    }


    return (
        <TouchableOpacity onPress={pressed}>
            <View style={[styles.itemContainer, { borderColor: colors.border }]}>
                <Text style={[styles.itemText, { color: colors.text }]}>{label}</Text>
                {active &&
                    <View style={{marginLeft: 'auto'}}>
                        <CheckMark width={20} height={20} color={colors.primary} />
                    </View>
                }

            </View>
        </TouchableOpacity>
    )
}





const SettingsDropdown = ({ data, value, title, style }: SettingsDropdownProps) => {

    const [selected, setSelected] = useState<number>(value ?? null);
    const [drawerState, setDrawerState] = useState(false);

    const { colors } = useTheme();

    function toggleDrawer() {
        requestAnimationFrame(() => {
            const newState = !drawerState;
            setDrawerState(newState);
        })
    }

    function closeDrawer() {
        requestAnimationFrame(() => {
            setDrawerState(false);
        })
    }


    function selectItem(val: number) {
        requestAnimationFrame(() => {
            setSelected(val);
        })
    }

    function getSelectedItem() {
        return data.reduce<DropdownOption>((prev, cur) => {
            if (cur.value === selected) {
                return cur
            }
            return prev
        }, {} as DropdownOption);
    }


    return (
        <View style={[styles.container, style]}>

            {/* Top bar that you click on to create the dropdown menu */}
            <TouchableHighlight onPress={toggleDrawer} underlayColor={colors.primary} activeOpacity={0.93}>
                <View style={[styles.topBar]}>
                    <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
                    <View style={styles.placeholder}>
                        <Text style={[styles.placeholderText, { color: colors.text }]}>{selected !== null ? getSelectedItem().label : "Select a value"}</Text>
                        {drawerState
                            ? <ArrowLeft width={20} height={20} color={colors.text} style={{ marginLeft: 10 }} />
                            : <ArrowDown width={20} height={20} color={colors.text} style={{ marginLeft: 10 }} />
                        }

                    </View>
                </View>
            </TouchableHighlight>

            {/* Dropdown menu options */}
            {drawerState &&
                <FlatList
                    data={data}
                    renderItem={({ item }) => <DropdownItem item={item} active={item.value === selected} selectItem={selectItem} closeDrawer={closeDrawer} />}

                    style={styles.options}
                // contentContainerStyle={{alignItems: 'flex-end'}}

                />
            }
        </View>
    )



}

const styles = StyleSheet.create({
    container: {
        // flex: 1
    },
    topBar: {
        flexDirection: 'row',
        padding: 10,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 15
    },
    placeholder: {
        flexDirection: 'row',
        marginLeft: 'auto'
    },
    placeholderText: {

    },
    options: {
        paddingHorizontal: 10,
        // paddingTop: 5
    },

    itemContainer: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderStyle: 'solid',
        alignItems: 'center'
    },
    itemText: {
        fontSize: 15
    }
})

export default SettingsDropdown;
