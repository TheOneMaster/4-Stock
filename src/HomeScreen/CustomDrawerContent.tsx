import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { useState } from "react";
import { Text, View } from "react-native";
import UserLogin from "./UserLogin";

import { USER_ID } from "@env"


const CustomDrawerContent = (props: DrawerContentComponentProps) => {

    const [loggedIn, setLoggedIn] = useState(false);

    return (
        <DrawerContentScrollView {...props}>
            <UserLogin loggedIn={loggedIn} />

            <Text style={{ color: "green" }} onPress={() => {

                props.navigation.navigate("Profile", {
                    id: parseInt(USER_ID)
                });

            }}>Profile</Text>

            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    )
}

export default CustomDrawerContent;
