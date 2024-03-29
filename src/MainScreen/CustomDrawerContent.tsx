import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons"

import UserLogin from "./UserLogin";
import { CustomText } from "../Shared/Text";


const CustomDrawerContent = (props: DrawerContentComponentProps) => {

    const [loggedIn, setLoggedIn] = useState(false);
    const { colors } = useTheme()

    return (
        <DrawerContentScrollView {...props} contentContainerStyle={{ flexGrow: 1 }}>
            <UserLogin loggedIn={loggedIn} />

            <View style={[styles.navigationItemsList, { borderColor: colors.border }]}>
                <DrawerItemList {...props} />

            </View>

            <View style={styles.bottomBox}>
                <Text>
                    <CustomText>Thanks for using this app! </CustomText>
                    <Ionicons name="heart" size={14} color="red" />
                </Text>
            </View>


        </DrawerContentScrollView>
    )
}

const styles = StyleSheet.create({
    navigationItemsList: {
        flexGrow: 1,
        borderTopWidth: 1,
        borderBottomWidth: 1
    },
    bottomBox: {
        marginBottom: "auto",
        paddingVertical: 10,
        paddingHorizontal: 20
    }
})

export default CustomDrawerContent;
