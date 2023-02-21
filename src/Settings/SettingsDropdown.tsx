import React, { useState } from "react";
import { FlatList, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from "react-native"
import { useTheme } from "@react-navigation/native";
import { DropdownOption, SettingsDropdownProps } from "./types";

interface DropdownItemProps {
    item: DropdownOption,
    selectItem: React.Dispatch<React.SetStateAction<number>>,
    closeDrawer: () => void
}

const DropdownItem = ({item, selectItem, closeDrawer, }: DropdownItemProps) => {

    const label = item.label;
    const value = item.value;

    const {colors} = useTheme();

    const pressed = () => {
        selectItem(value);
        closeDrawer();
    }


    return (
        <TouchableOpacity onPress={pressed}>
            <Text style={{color: colors.text}}>{label}</Text>
        </TouchableOpacity>
    )
}





const SettingsDropdown = ({data, value, title, style}: SettingsDropdownProps) => {

    const [selected, setSelected] = useState<number>(value ?? null);
    const [drawerState, setDrawerState] = useState(false);

    const {colors} = useTheme();

    function toggleDrawer() {
        requestAnimationFrame(() => {
            const newState = !drawerState;
            console.log(newState)
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
        <View style={styles.container}>

            {/* Top bar that you click on to create the dropdown menu */}
            <TouchableHighlight onPress={toggleDrawer} underlayColor={colors.primary} activeOpacity={0.93}>
                <View style={[styles.topBar, {backgroundColor: colors.card}]}>
                    <Text style={[styles.title, {color: colors.text}]}>{title}</Text>
                    <View style={styles.placeholder}>
                        <Text style={[styles.placeholderText, {color: colors.text}]}>{ selected !== null ? getSelectedItem().label : "Select a value"}</Text>
                    </View>
                </View>
            </TouchableHighlight>

            {/* Dropdown menu options */}
            { drawerState &&
                <FlatList
                    data={data}
                    renderItem={({item}) => <DropdownItem item={item} selectItem={selectItem} closeDrawer={closeDrawer}/>}
                    
                    style={styles.options}
                    contentContainerStyle={{alignItems: 'flex-end'}}
                    
                    />
            }
        </View>
    )



}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    topBar: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: "white"
    },
    title: {
        fontWeight: 'bold',
        fontSize: 15
    },
    placeholder: {
        marginLeft: 'auto'
    },
    placeholderText: {

    },
    options: {
        paddingHorizontal: 10,
        // paddingTop: 5
    }
})

export default SettingsDropdown;
