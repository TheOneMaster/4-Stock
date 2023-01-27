import { useTheme } from "@react-navigation/native";
import { Button, Pressable, StyleSheet, Text, TextInput, useWindowDimensions, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker"
import React, { SetStateAction, useEffect, useState } from "react";

import { FilterText } from "./FilterItem";
import { convertDateToString } from "../helper";
import { APIVariables } from "../types";

export const FilterView = ({ onFilter, show, setShow}: {onFilter: Function, show: boolean, setShow: React.Dispatch<SetStateAction<boolean>>}) => {

    // UI State elements
    const [showDate, setShowDate] = useState(false);
    
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

    console.log(useWindowDimensions().height*useWindowDimensions().scale)

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
            startDate: date
        };

        // console.log(filters);
        // console.log(onFilter)

        onFilter({...filters});
    }

    

    const form = (

        <View style={styles.mainBox}>
            <Pressable
                onPress={() => setShow(false)}
                style={styles.outerOverlay}/>
        
            <View style={styles.container}>
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
            </View>
        
        </View>
    )


    return form

}
