import { useTheme } from "@react-navigation/native";
import { Animated, Button, Pressable, StyleSheet, Text, TextInput, useWindowDimensions, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker"
import React, { SetStateAction, useEffect, useRef, useState } from "react";

import { FilterText } from "./FilterItem";
import { convertDateToString } from "../helper";
import { APIVariables } from "../types";

export const FilterView = ({ updateFilters, setShow, show}: {updateFilters: Function, setShow: React.Dispatch<SetStateAction<boolean>>, show: boolean}) => {

    // UI State elements
    const [showDate, setShowDate] = useState(false);
    const fadeAnim = useRef(new Animated.Value(350)).current;
    // const 
    
    // Filter data elements
    const [date, setDate] = useState(new Date());
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
            backgroundColor: backgroundColor,
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

    // console.log(useWindowDimensions().height*useWindowDimensions().scale)

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
            startDate: date,
        };

        if (Object.keys(location).length > 0) {
            filters['location'] = location;
        }

        // console.log(filters);
        // console.log(updateFilters)

        updateFilters(filters);
        setShow(false);
    }

    useEffect(() => {

        const duration = 300

        if (show){
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
        }

    }, [show]);
    

    const form = (

        <View style={ styles.mainBox }> 
        
            { show &&
                <Pressable
                    onPress={() => setShow(false)}
                    style={styles.outerOverlay}/>
            }
        
            <Animated.View style={{...styles.container, transform: [{translateY: fadeAnim}]}}>
                <View style={styles.formItem}>
                    <FilterText title={'Name'} onUpdate={setName}/>
                </View>
                <View style={styles.formItem}>
                    <View style={styles.innerFormItem}>
                        <Text style={styles.text}>Starting Date: {date.toLocaleDateString()}</Text>
                        <View style={{width: 100, marginLeft: 'auto'}}>
                            <Button onPress={showDatePicker} title='Select Date'/>
                            { showDate && <DateTimePicker value={date} onChange={onDateChange}/> }
                        </View>
                    </View>
                </View>
                <View style={styles.formItem}>
                    <Button title="Filter" color={colors.primary} onPress={filterTournaments}/>
                </View>
            </Animated.View>
        
        </View>
    )


    return form

}
