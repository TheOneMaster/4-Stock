import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { useFocusEffect, useTheme } from "@react-navigation/native";
import React, { SetStateAction, useCallback, useEffect, useRef, useState } from "react";
import { Animated, BackHandler, Button, Keyboard, Pressable, StyleProp, StyleSheet, View, ViewStyle } from "react-native";

import { addMonthsToDate } from "../helper";
import { MainText } from "../Shared";

import { StorageVariables } from "../types";
import { FilterText } from "./FilterItem";

const DEFAULT_HEIGHT = 350;
const defaultVariables: StorageVariables = {
    name: undefined,
    perPage: undefined,
    page: undefined,
    afterDate: undefined,
    beforeDate: undefined,
    location: {
        distanceFrom: "",
        distance: undefined
    }
};

export const FilterView = ({ updateFilters, setShow, show, height }: { updateFilters: Function, setShow: React.Dispatch<SetStateAction<boolean>>, show: boolean, height?: number }) => {

    const filterHeight = height ?? DEFAULT_HEIGHT;

    // UI State elements
    const [showDate, setShowDate] = useState(false);
    const fadeAnim = useRef(new Animated.Value(filterHeight)).current;
    // const 

    // Filter data elements
    const [afterDate, setAfterDate] = useState<Date | undefined>(undefined);
    const [beforeDate, setBeforeDate] = useState<Date | undefined>(undefined);

    const [name, setName] = useState('');
    const [location, setLocation] = useState({} as StorageVariables['location']);

    const { colors } = useTheme();
    const backgroundColor = useTheme().dark ? "#232323" : "black";

    const containerStyle: Animated.AnimatedProps<StyleProp<ViewStyle>> = {
        backgroundColor: colors.card,
        borderColor: colors.border,
        height: filterHeight,
        transform: [{ translateY: fadeAnim }]
    }

    function onDateChange(event: DateTimePickerEvent, selectedDate?: Date) {
        setShowDate(false);
        setAfterDate(selectedDate);
    }

    function showDatePicker() {
        setShowDate(true);
    }

    function filterTournaments() {
        const current_date = new Date();

        const filtersUsed: StorageVariables = {
            name: name || undefined,
            afterDate: afterDate,
            beforeDate: beforeDate ?? addMonthsToDate(current_date, 1),
            location: location
        };

        if (location && Object.keys(location).length > 0) {
            filtersUsed['location'] = location;
        }

        const filters = Object.assign({}, defaultVariables, filtersUsed);
        requestAnimationFrame(() => {
            updateFilters(filters);
            setShow(false);
        })
    }

    useEffect(() => {

        const duration = 200;

        if (show) {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: duration,
                useNativeDriver: true
            }).start();
        } else {
            Animated.timing(fadeAnim, {
                toValue: filterHeight,
                duration: duration,
                useNativeDriver: true
            }).start();

            Keyboard.dismiss();
        }

    }, [show]);


    useFocusEffect(
        useCallback(() => {
            const onBackPress = () => {
                if (show) {
                    setShow(false);
                    return true;
                }
                return false
            };

            const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
            return () => subscription.remove()
        }, [show, setShow])
    )


    return (
        <View style={styles.mainBox}>

            {show &&
                <Pressable
                    onPress={() => setShow(false)}
                    style={styles.outerOverlay} />
            }

            <Animated.View style={[styles.container, containerStyle]}>
                <View style={styles.formItem}>
                    <FilterText title={'Name'} onUpdate={setName} onSubmitEditing={Keyboard.dismiss} />
                </View>
                <View style={styles.formItem}>
                    <View style={styles.innerFormItem}>
                        <MainText>{afterDate && "Starting Date: " + afterDate.toLocaleDateString()}</MainText>
                        <View style={{ width: 100, marginLeft: 'auto' }}>
                            <Button onPress={showDatePicker} title='Select Date' />
                            {showDate && <DateTimePicker value={afterDate ?? new Date()} onChange={onDateChange} />}
                        </View>
                    </View>
                </View>
                <View style={styles.formItem}>
                    <Button title="Filter" color={colors.primary} onPress={filterTournaments} />
                </View>
            </Animated.View>

        </View>
    )
}

const styles = StyleSheet.create({
    mainBox: {
        width: '100%',
        height: '100%',
        position: 'absolute'
    },
    container: {
        position: 'absolute',
        width: '100%',
        borderWidth: 1,
        borderStyle: 'solid',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        zIndex: 1,
        bottom: 0
    },

    formItem: {
        margin: 10,
        padding: 10,
        gap: 5,
    },
    innerFormItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10
    },
    outerOverlay: {
        position: 'absolute',
        width: '100%',
        zIndex: 1,
        backgroundColor: 'black',
        opacity: 0.3,
        height: '100%'
    }
})
