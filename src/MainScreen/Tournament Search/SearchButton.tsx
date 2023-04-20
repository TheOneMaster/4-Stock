import { useTheme } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import search_icon from "../../assets/icons8-search.png";


interface SearchButtonProps {
    showFilter: React.Dispatch<React.SetStateAction<boolean>>
}

export const SearchButton = ({ showFilter }: SearchButtonProps) => {
    const { colors } = useTheme();

    const test = () => {
        requestAnimationFrame(() => {
            showFilter(true);
        })
    }

    return (
        <TouchableOpacity onPress={test}>
            <View style={[styles.container, { backgroundColor: colors.primary }]}>
                <Image source={search_icon} style={styles.icon}></Image>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        width: 70,
        height: 70,

        borderRadius: 70 / 2,

        position: "absolute",
        bottom: 20,
        right: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    icon: {
        width: 60,
        height: 60,
        resizeMode: 'center',
        overflow: 'hidden'
    }
})
