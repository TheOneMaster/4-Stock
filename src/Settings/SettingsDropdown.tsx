import { useTheme } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, StyleProp, StyleSheet, Text, TouchableHighlight, TouchableHighlightProps, TouchableOpacity, View, ViewStyle } from "react-native";
import { useMMKVObject } from "react-native-mmkv";
import { ArrowDown, ArrowLeft, CheckMark } from "../Shared/SVG";
import { AppSettings, DropdownItemProps, SettingsDropdownProps, SettingsItemStyles } from "./types";
import { MainText } from "../Shared/ThemedText";

const SettingsDropdown = ({ data, setting, value, title, backgroundColor, style }: SettingsDropdownProps) => {

    const [settings, setSettings] = useMMKVObject<AppSettings>("settings");
    const [option, setOption] = useState(settings[setting])
    const [drawerState, setDrawerState] = useState(false);


    const { colors } = useTheme();

    useEffect(() => {
        setDrawerState(false);
        const newSettings = Object.assign({}, settings, { [setting]: option });
        setSettings(newSettings)
    }, [option])

    function toggleDrawer() {
        requestAnimationFrame(() => {
            const newState = !drawerState;
            setDrawerState(newState);
        })
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
                    <MainText style={styles.title}>{title}</MainText>
                    <View style={styles.placeholder}>
                        <MainText style={styles.placeholderText}>{option !== null ? option.label : "Select a value"}</MainText>
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
                    renderItem={({ item, index }) => <DropdownItem setting={setting} item={item} active={option ? item.value === option.value : false} selectItem={setOption} setDrawerState={setDrawerState} />}
                    initialNumToRender={20}
                    style={[styles.options, { backgroundColor: backgroundColor }]}
                />
            }
        </View>
    )



}

const DropdownItem = ({ item, selectItem, active, setting, setDrawerState }: DropdownItemProps) => {
    const label = item.label;
    const value = item.value;

    const { colors } = useTheme();

    function pressed() {
        setDrawerState(false);
        active ? selectItem(null) : selectItem(item);

    }

    return (
        <TouchableOpacity onPress={pressed}>
            <View style={[styles.itemContainer, { borderColor: colors.border }]}>
                <MainText style={styles.itemText}>{label}</MainText>
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
