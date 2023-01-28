import DateTimePicker from "@react-native-community/datetimepicker";
import { useTheme } from "@react-navigation/native";
import React, { SetStateAction, useEffect, useRef, useState } from "react";
import { Animated, Button, Keyboard, Pressable, StyleSheet, Text, View } from "react-native";

import { APIVariables } from "../types";
import { FilterText } from "./FilterItem";

export const FilterView = ({ updateFilters, setShow, show }: { updateFilters: Function, setShow: React.Dispatch<SetStateAction<boolean>>, show: boolean }) => {

    // UI State elements
    const [showDate, setShowDate] = useState(false);
    const fadeAnim = useRef(new Animated.Value(350)).current;
    // const 

    // Filter data elements
    const [date, setDate] = useState<Date | undefined>(undefined);
    const [name, setName] = useState('');
    const [location, setLocation] = useState({} as Partial<APIVariables['location']>);

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
            height: 350,
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
        setDate(selectedDate);
    }

    function showDatePicker() {
        setShowDate(true);
    }

    function filterTournaments() {
        const filters = {
            name: name,
            afterDate: date,
        };

        if (Object.keys(location).length > 0) {
            filters['location'] = location;
        }

        updateFilters(filters);
        setShow(false);
    }

    useEffect(() => {

        const duration = 300

        if (show) {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: duration,
                useNativeDriver: true
            }).start();
        } else {
            Animated.timing(fadeAnim, {
                toValue: 350,
                duration: duration,
                useNativeDriver: true
            }).start();

            Keyboard.dismiss();


        }

    }, [show]);


    const form = (

        <View style={styles.mainBox}>

            {show &&
                <Pressable
                    onPress={() => setShow(false)}
                    style={styles.outerOverlay} />
            }

            <Animated.View style={{ ...styles.container, transform: [{ translateY: fadeAnim }] }}>
                <View style={styles.formItem}>
                    <FilterText title={'Name'} onUpdate={setName} onSubmitEditing={Keyboard.dismiss} />
                </View>
                <View style={styles.formItem}>
                    <View style={styles.innerFormItem}>
                        <Text style={styles.text}>{date &&
                            "Starting Date: " + date.toLocaleDateString()}</Text>
                        <View style={{ width: 100, marginLeft: 'auto' }}>
                            <Button onPress={showDatePicker} title='Select Date' />
                            {showDate && <DateTimePicker value={date ?? new Date()} onChange={onDateChange} />}
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
