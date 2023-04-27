import { DateTimePickerAndroid } from "@react-native-community/datetimepicker"
import React, { useCallback } from "react"
import { StyleProp, StyleSheet, Text, ViewProps, ViewStyle } from "react-native"

import Checkbox from "expo-checkbox"
import { TransparentCard } from "../../Shared"
import { CustomText, SubtitleText } from "../../Shared/Text"

interface FilterItemProps extends ViewProps {
    title: string
}

interface StaticFilterItemProps extends FilterItemProps {
    value: string
}

export const StaticFilterItem = (props: StaticFilterItemProps) => {

    const { title, value, ...viewProps } = props

    return (
        <TransparentCard style={styles.container} {...viewProps}>
            <Text>
                <CustomText style={styles.filterText}>{title}: </CustomText>
                <SubtitleText style={styles.filterText}>{value}</SubtitleText>
            </Text>
        </TransparentCard>
    )
}

interface FilterDateProps extends FilterItemProps {
    date: Date | undefined
    setDate: React.Dispatch<React.SetStateAction<Date | undefined>>
}

export const FilterDate = (props: FilterDateProps) => {

    const { title, date, setDate, ...viewProps } = props;

    const currentDateString = date ? date.toLocaleDateString() : "Not applied";

    const onPress = useCallback(() => {
        DateTimePickerAndroid.open({
            value: date ? date : new Date(),
            onChange: (event) => {
                const newDate = new Date(event.nativeEvent.timestamp ?? currentDateString);
                setDate(newDate);
            }
        })
    }, [setDate, date])


    return (
        <TransparentCard touchable onPress={onPress} style={styles.container} {...viewProps}>
            <Text>
                <CustomText style={styles.filterText}>{title}: </CustomText>
                <SubtitleText style={styles.filterText}>{currentDateString}</SubtitleText>
            </Text>
        </TransparentCard>
    )
}

// interface FilterCheckboxProps extends FilterItemProps {
//     value: boolean | null
//     nullValue?: boolean
//     setValue: React.Dispatch<React.SetStateAction<boolean>> | React.Dispatch<React.SetStateAction<true | null>>
// }

interface FilterBoolean extends FilterItemProps {
    value: boolean
    nullValue?: false
    setValue: React.Dispatch<React.SetStateAction<boolean>>
}

interface FilterNullBoolean extends FilterItemProps {
    value: boolean | null
    nullValue: true
    setValue: React.Dispatch<React.SetStateAction<true | null>>
}

type FilterCheckboxProps = FilterBoolean | FilterNullBoolean



export const FilterCheckbox = (props: FilterCheckboxProps) => {

    const { title, style, ...viewProps } = props;
    const value = props.value ? props.value : false;

    const valueChange = useCallback((newValue: boolean) => {
        if (!props.nullValue) props.setValue(newValue);
        else props.setValue(newValue || null);
    }, [props.setValue, props.nullValue])

    return (
        <TransparentCard style={[styles.container, style]} {...viewProps}>
            <CustomText style={styles.filterText}>{title}</CustomText>
            <Checkbox value={value} onValueChange={valueChange} style={styles.filterComponent} />
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
