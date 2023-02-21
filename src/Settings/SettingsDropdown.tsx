import React, { useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native"
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

    const pressed = () => {
        selectItem(value);
        closeDrawer();
    }


    return (
        <TouchableOpacity onPress={pressed}>
            <Text>{label}</Text>
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

            
            <TouchableOpacity onPress={toggleDrawer} style={styles.topBar}>
                <Text>{title}</Text>
                
                <View style={styles.placeholder}>
                    <Text style={styles.placeholderText}>{ selected !== null ? getSelectedItem().label : "Select a value"}</Text>
                </View>
                
            </TouchableOpacity>

            { drawerState &&
                <FlatList
                    data={data}
                    renderItem={({item}) => <DropdownItem item={item} selectItem={selectItem} closeDrawer={closeDrawer}/>}
                    
                    style={styles.options}
                    
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
