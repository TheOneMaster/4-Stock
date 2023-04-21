import { DateTimePickerAndroid } from "@react-native-community/datetimepicker"
import React, { useCallback } from "react"
import { StyleProp, StyleSheet, Text, ViewStyle } from "react-native"

import Checkbox from "expo-checkbox"
import { TransparentCard } from "../../Shared"
import { MainText, SubtitleText } from "../../Shared/Text"

interface FilterItemProps {
    title: string
    style?: StyleProp<ViewStyle>
}

interface StaticFilterItemProps extends FilterItemProps {
    value: string
}

export const StaticFilterItem = (props: StaticFilterItemProps) => {
    return (
        <TransparentCard style={styles.container}>
            <Text>
                <MainText style={styles.filterText}>{props.title}: </MainText>
                <SubtitleText style={styles.filterText}>{props.value}</SubtitleText>
            </Text>
        </TransparentCard>
    )
}

interface FilterDateProps extends FilterItemProps {
    date: Date | undefined
    setDate: React.Dispatch<React.SetStateAction<Date | undefined>>
}

export const FilterDate = (props: FilterDateProps) => {

    const currentDateString = props.date ? props.date.toLocaleDateString() : "Not applied";

    const onPress = useCallback(() => {
        DateTimePickerAndroid.open({
            value: props.date ? props.date : new Date(),
            onChange: (event) => {
                const newDate = new Date(event.nativeEvent.timestamp ?? currentDateString);
                props.setDate(newDate);
            }
        })
    }, [props.setDate, props.date])


    return (
        <TransparentCard touchable onPress={onPress} style={styles.container}>
            <Text>
                <MainText style={styles.filterText}>{props.title}: </MainText>
                <SubtitleText style={styles.filterText}>{currentDateString}</SubtitleText>
            </Text>
        </TransparentCard>
    )
}

interface FilterCheckboxProps extends FilterItemProps {
    value: boolean | null
    setValue: React.Dispatch<React.SetStateAction<boolean | null>>
}

export const FilterCheckbox = (props: FilterCheckboxProps) => {
    const { title, setValue, style } = props;
    const value = props.value ? props.value : false;

    return (
        <TransparentCard style={styles.container}>
            <MainText style={styles.filterText}>{title}</MainText>
            <Checkbox value={value} onValueChange={setValue} style={styles.filterComponent} />
        </TransparentCard>
    )

}

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 1,
        padding: 10,
        flexDirection: "row",
        // flexGrow: 1
    },
    filterText: {
        fontSize: 16
    },
    filterComponent: {
        marginLeft: "auto"
    }
})
