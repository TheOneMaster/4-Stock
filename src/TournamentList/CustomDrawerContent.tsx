import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { useState } from "react";
import { View } from "react-native";
import UserLogin from "./UserLogin";


const CustomDrawerContent = (props: DrawerContentComponentProps) => {

    const [loggedIn, setLoggedIn] = useState(false);

    return (
        <DrawerContentScrollView {...props}>
            <UserLogin />

            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    )
}

export default CustomDrawerContent;
