import { useCallback } from "react"
import { StyleProp, StyleSheet, Text, ViewStyle } from "react-native"
import { convertAPITimeToDate } from "../../helper"
import { MainText, SubtitleText, TransparentCard } from "../../Shared"
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker"

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
    date: number
    setDate: React.Dispatch<React.SetStateAction<Date>>
}

export const FilterDate = (props: FilterDateProps) => {

    const currentDate = convertAPITimeToDate(props.date);

    const onPress = useCallback(() => {
        DateTimePickerAndroid.open({
            value: convertAPITimeToDate(props.date),
            onChange: (event) => {
                const newDate = new Date(event.nativeEvent.timestamp ?? currentDate);
                props.setDate(newDate);
            }
        })
    }, [props.setDate])


    return (
        <TransparentCard touchable onPress={onPress} style={styles.container}>
            <Text>
                <MainText style={styles.filterText}>{props.title}: </MainText>
                <SubtitleText style={styles.filterText}>{currentDate.toLocaleDateString()}</SubtitleText>
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
