import { useCallback } from "react"
import { StyleProp, StyleSheet, Text, ViewStyle } from "react-native"
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker"

import { convertAPITimeToDate } from "../../helper"
import { MainText, SubtitleText } from "../../Shared/Text"
import { TransparentCard } from "../../Shared"

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
                <MainText style={styles.filterText}>{props.title}</MainText>
                <SubtitleText style={styles.filterText}>{props.value}</SubtitleText>
            </Text>
        </TransparentCard>
    )
}

interface FilterDateProps extends FilterItemProps {
    date: number | undefined
    setDate: React.Dispatch<React.SetStateAction<Date | undefined>>
}

export const FilterDate = (props: FilterDateProps) => {

    const currentDateString = props.date ? convertAPITimeToDate(props.date).toLocaleDateString() : "Not applied";

    const onPress = useCallback(() => {
        DateTimePickerAndroid.open({
            value: props.date ? convertAPITimeToDate(props.date) : new Date(),
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



const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 1,
        padding: 10
    },
    filterText: {
        fontSize: 16
    }
})
