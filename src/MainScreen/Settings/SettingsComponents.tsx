import { useCallback, useState } from "react"
import { StyleProp, StyleSheet, Switch, View, ViewStyle } from "react-native"


import { EyeTextInput, TransparentCard } from "../../Shared"
import { AntDesignThemed, IoniconsThemed } from "../../Shared/IconTheme"
import { IoniconsThemedProps } from "../../Shared/IconTheme/types"
import { CustomText, TitleText } from "../../Shared/Text"
import { DropdownOption } from "../../Shared/types"

type TitleBarProps = {
    title: string
    icon?: SettingsItem['icon']
}

type DropdownItemProps = {
    selected: boolean
    item: DropdownOption
    onPress: (item: DropdownOption | null) => void
}

type SettingsItem = {
    title: string
    icon?: IoniconsThemedProps['name']
    style?: StyleProp<ViewStyle>
}

type SettingsSwitchProps = SettingsItem & {
    value: boolean
    updateValue: (value: boolean) => void
}

type SettingsTextInputProps = SettingsItem & {
    value: string
    updateValue: (value: string) => void
}

type SettingsDropdownProps = SettingsItem & {
    options: DropdownOption[]
    value: DropdownOption | null
    updateValue: (value: DropdownOption | null) => void
}



export function SettingsSwitch(props: SettingsSwitchProps) {
    return (
        <TransparentCard style={styles.container}>
            <TitleBar title={props.title} icon={props.icon} />
            <Switch value={props.value} onValueChange={props.updateValue} style={styles.component} />
        </TransparentCard>
    )
}

export function SettingsTextInput(props: SettingsTextInputProps) {
    return (
        <TransparentCard style={styles.container}>
            <TitleBar title={props.title} icon={props.icon} />
            <EyeTextInput defaultValue={props.value} onSubmit={props.updateValue} style={styles.component} />
        </TransparentCard>
    )
}

export function SettingsDropdown(props: SettingsDropdownProps) {

    const [open, setOpen] = useState(false);

    const toggleDrawer = useCallback(() => {
        console.log("test");
        setOpen(prev => !prev);
    }, [setOpen]);

    const clickItem = (value: DropdownOption | null) => {
        toggleDrawer();
        props.updateValue(value);
    }


    return (
        <View>
            <TransparentCard touchable highlight style={styles.container} onPress={toggleDrawer}>

                <TitleBar title={props.title} icon={props.icon} />

                <View style={styles.component}>
                    {props.value ? <CustomText style={{ marginRight: 5 }}>{props.value.label}</CustomText> : null}
                    <AntDesignThemed name={open ? "arrowleft" : "arrowdown"} size={15} />
                </View>

            </TransparentCard>

            {open
                ? <TransparentCard>
                    {props.options.map(ddItem => <DropdownItem item={ddItem} selected={ddItem.value === props.value?.value} onPress={clickItem} key={ddItem.value} />)}
                </TransparentCard>
                : null}

        </View>

    )
}

function DropdownItem(props: DropdownItemProps) {

    const click = useCallback(() => {
        if (props.selected) props.onPress(null);
        else props.onPress(props.item);
    }, [])

    return (
        <TransparentCard touchable highlight onPress={click} style={styles.ddItem}>
            {props.selected
                ? <AntDesignThemed name="checksquare" size={15} style={styles.ddIcon} />
                : <View style={[{ width: 15 }, styles.ddIcon]} />
            }
            <CustomText>{props.item.label}</CustomText>
        </TransparentCard>
    )


}


function TitleBar(props: TitleBarProps) {
    return (
        <TransparentCard style={styles.textContainer}>
            {props.icon ? <IoniconsThemed name={props.icon} style={[styles.titleText, styles.titleIcon]} /> : null}
            <TitleText style={styles.titleText}>{props.title}</TitleText>
        </TransparentCard>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        paddingVertical: 8,
    },
    textContainer: {
        flexDirection: "row",
        paddingLeft: 10,
        alignItems: "center"
    },
    titleText: {
        fontSize: 16
    },
    titleIcon: {
        marginRight: 10
    },
    switch: {
        marginLeft: "auto"
    },
    component: {
        marginLeft: "auto",
        marginRight: 5,
        flexDirection: "row",
        alignItems: "center"
    },

    ddItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10
    },
    ddIcon: {
        marginHorizontal: 10,
    }
})
