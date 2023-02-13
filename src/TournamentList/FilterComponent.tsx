import DateTimePicker from "@react-native-community/datetimepicker";
import { useFocusEffect, useTheme } from "@react-navigation/native";
import React, { SetStateAction, useCallback, useEffect, useRef, useState } from "react";
import { Animated, BackHandler, Button, Keyboard, Pressable, StyleSheet, Text, View } from "react-native";
import { addMonthsToDate } from "../helper";

import { APIVariables, StorageVariables } from "../types";
import { FilterText } from "./FilterItem";

const DEFAULT_HEIGHT = 350;
const defaultVariables: StorageVariables = {
    name: undefined,
    perPage: undefined,
    page: undefined,
    afterDate: undefined,
    beforeDate: undefined,
    location: {
        distanceFrom: undefined,
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

    const styles = StyleSheet.create({

        mainBox: {
            width: '100%',
            height: '100%',
            position: 'absolute'
        },
        container: {
            position: 'absolute',
            height: filterHeight,
            width: '100%',
            backgroundColor: colors.card,
            borderColor: colors.border,
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

        text: {
            color: colors.text,
        },


        outerOverlay: {
            position: 'absolute',
            width: '100%',
            zIndex: 1,
            backgroundColor: 'black',
            opacity: 0.3,
            height: '100%'
        }

    });

    function onDateChange(event, selectedDate) {
        // console.log(event);
        console.log(selectedDate);
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

        if (Object.keys(location).length > 0) {
            filtersUsed['location'] = location;
        }

        const filters = Object.assign({}, defaultVariables, filtersUsed);
        updateFilters(filters);
        setShow(false);
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



    const customBackPress = () => {
        if (show) {
            setShow(false);
            return true;
        }
        return false
    }


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


    const form = (

        <View style={styles.mainBox}>

            {show &&
                <Pressable
                    onPress={() => setShow(false)}
                    style={styles.outerOverlay} />
            }

            <Animated.View style={{ ...styles.container, transform: [{ translateY: fadeAnim }] }}>
                <View style={styles.formItem}>
                    <FilterText title={'Name'} onUpdate={(name: string) => setName(name.trim())} onSubmitEditing={Keyboard.dismiss} />
                </View>
                <View style={styles.formItem}>
                    <View style={styles.innerFormItem}>
                        <Text style={styles.text}>{afterDate && "Starting Date: " + afterDate.toLocaleDateString() }</Text>
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


    return form

}
