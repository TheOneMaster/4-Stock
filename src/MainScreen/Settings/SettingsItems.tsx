import { AntDesign } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { useRef, useState } from "react";
import { StyleSheet, Switch, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useMMKVBoolean, useMMKVObject, useMMKVString } from "react-native-mmkv";

import { EyeTextInput, PrimaryCard, TransparentCard } from "../../Shared";
import { IoniconsThemed } from "../../Shared/IconTheme";
import { MainText } from "../../Shared/Text";
import { AppSettings, DropdownItemListProps, DropdownItemProps, DropdownOption, SettingsDropdownProps, SettingsItem, SettingsTextInputProps, TitleBarProps } from "./types";


export function SettingsTextInput<Group extends keyof AppSettings>(props: SettingsTextInputProps<Group>) {

    const {
        title,
        group,
        setting,
        hidden,
        iconName,
        style
    } = props;

    const settingsString = useRef(`${group}.${setting.toString()}`);
    const [settingStore, updateSetting] = useMMKVString(settingsString.current);

    function handleSubmit(text: string) {
        console.log(text);
        updateSetting(text);
    }

    return (
        <TransparentCard style={[styles.container, style]}>

            <TitleBar title={title} iconName={iconName} />

            <View style={styles.textInput}>
                {hidden
                    ? <EyeTextInput defaultValue={settingStore} onSubmit={handleSubmit} />
                    : <TextInput value={settingStore} />}
            </View>
        </TransparentCard>
    )
}

export function SettingsSwitch<Group extends keyof AppSettings>(props: SettingsItem<Group>) {
    const {
        title,
        group,
        setting,
        iconName,
        style
    } = props

    const settingString = useRef(`${group}.${setting.toString()}`);
    const [active, setActive] = useMMKVBoolean(settingString.current);

    return (
        <TransparentCard style={[styles.container, style]}>

            <TitleBar title={title} iconName={iconName} />

            <View style={styles.componentView}>
                <Switch value={active} onValueChange={setActive}></Switch>
            </View>
        </TransparentCard>
    )
}

export function SettingsDropdown<Group extends keyof AppSettings>(props: SettingsDropdownProps<Group>) {
    const {
        data,
        group,
        setting,
        title,
        iconName,
        style
    } = props

    const settingsString = `${group}.${setting.toString()}`;
    const [selected, updateSelected] = useMMKVObject<DropdownOption>(settingsString);
    const [drawer, updateDrawer] = useState(false);

    const { colors } = useTheme();

    function toggleDrawer() {
        updateDrawer(!drawer);
    }

    function selectItem(item: DropdownOption) {
        item.value === selected?.value ? updateSelected(undefined) : updateSelected(item);
        updateDrawer(false);
    }

    return (
        <View>
            <PrimaryCard touchable onPress={toggleDrawer} style={[styles.container, style]}>

                <TitleBar title={title} iconName={iconName} />

                <View style={styles.componentView}>
                    {selected ? <MainText style={styles.selectedText}>{selected.label}</MainText> : null}
                    <AntDesign name={drawer ? "arrowleft" : "arrowdown"} size={15} color={colors.text} />
                </View>
            </PrimaryCard>

            {drawer && <DropdownItemList data={data} activeValue={selected?.value ?? Infinity} onPress={selectItem} />}
        </View>
    )
}

function DropdownItemList({ data, activeValue, onPress, style }: DropdownItemListProps) {
    return (
        <View style={style}>
            {data.map(item => <DropdownItem item={item} active={item.value === activeValue} onPress={onPress} key={item.value} />)}
        </View>
    )
}

function DropdownItem({ item, active, onPress }: DropdownItemProps) {
    const { label } = item;
    const { colors } = useTheme();

    function handleClick() {
        onPress(item);
    }

    return (
        <TransparentCard touchable highlight onPress={handleClick} style={styles.ddItem}>
            {active
                ? <AntDesign name="checksquare" size={15} color={colors.primary} style={styles.ddItemIcon} />
                : <View style={[{ width: 15 }, styles.ddItemIcon]}></View>
            }
            <MainText style={styles.itemText}>{label}</MainText>
        </TransparentCard>
    )
}

function TitleBar({ title, iconName, style }: TitleBarProps) {
    return (
        <View style={[styles.titleBar, style]}>
            {iconName ? <IoniconsThemed name={iconName} text="primary" style={[styles.titleText, styles.titleIcon]} /> : null}
            <MainText style={styles.titleText}>{title}</MainText>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8
    },

    titleBar: {
        flexDirection: "row",
        flex: 1,
        alignItems: "center"
    },
    titleText: {
        fontWeight: "500",
        fontSize: 16,
    },
    titleIcon: {
        marginRight: 10
    },
    componentView: {
        // flex: 1,
        marginLeft: "auto",
        flexDirection: "row",
        alignItems: "center"
    },
    selectedText: {
        marginRight: 5
    },
    textInput: {
        flex: 1
    },

    ddItem: {
        flexDirection: "row",
        alignItems: "center",
        // borderStyle: "solid",
        // backgroundColor: 'blue',
        borderBottomWidth: 0.8,

        padding: 10,
    },
    ddItemIcon: {
        marginRight: 10
    },
    itemText: {
        fontSize: 15,
        // marginLeft: 10
        // backgroundColor: 'red',
        // textAlign: "center"
    }
});
