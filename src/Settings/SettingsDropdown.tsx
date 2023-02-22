import React, { useEffect, useRef, useState } from "react";
import { FlatList, StyleProp, StyleSheet, Text, TouchableHighlight, TouchableHighlightProps, TouchableOpacity, View, ViewStyle } from "react-native"
import { useTheme } from "@react-navigation/native";
import { DropdownOption, SettingsDropdownProps } from "./types";
import { ArrowDown, ArrowLeft, CheckMark } from "../Shared/SVG";
import { SettingsItemStyles } from "./types";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SettingsDropdown = ({ data, setting, value, title, backgroundColor, style }: SettingsDropdownProps) => {

    const [selected, setSelected] = useState(value ?? null);
    const mounted = useRef(false);
    const [drawerState, setDrawerState] = useState(false);

    const { colors } = useTheme();

    useEffect(() => {
        if (!mounted.current) {
            AsyncStorage.getItem(setting).then(settingVal => {
                const selectedVal: DropdownOption = JSON.parse(settingVal);
                setSelected(selectedVal.value);
                mounted.current = true;
            })
        }
        const selectedItem = getSelectedItem();
        AsyncStorage.setItem(setting, JSON.stringify(selectedItem));
    }, [selected])



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


    const highlightProps: TouchableHighlightProps = {
        underlayColor: backgroundColor ? colors.primary : null,
        activeOpacity: backgroundColor ? 0.93 : null
    }

    const topBarStyle: StyleProp<ViewStyle> = {
        backgroundColor: backgroundColor,
        borderBottomWidth: 1,
        borderStyle: 'solid',
        borderBottomColor: colors.border
    }

    return (
        <View style={[styles.container, style]}>

            {/* Top bar that you click on to create the dropdown menu */}
            <TouchableHighlight onPress={toggleDrawer} {...highlightProps}>
                <View style={[SettingsItemStyles.container, topBarStyle]}>
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
                    renderItem={({ item, index }) => <DropdownItem item={item} active={item.value === selected} selectItem={selectItem} closeDrawer={closeDrawer} />}
                    initialNumToRender={20}
                    style={[styles.options, {backgroundColor: backgroundColor}]}
                />
            }
        </View>
    )



}

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
                    <View style={{ marginLeft: 'auto' }}>
                        <CheckMark width={20} height={20} color={colors.primary} />
                    </View>
                }

            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
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
