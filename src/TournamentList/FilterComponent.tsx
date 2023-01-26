import { useTheme } from "@react-navigation/native";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker"
import { useState } from "react";

import { FilterText } from "./FilterItem";
import { convertDateToString } from "../helper";

export const FilterView = ({ onFilter }) => {

    const [showDate, setShowDate] = useState(false);
    
    const [date, setDate] = useState(new Date());
    const [name, setName] = useState('');

    const { colors } = useTheme();
    const styles = StyleSheet.create({
        container: {
            // flex: 1,
            // alignSelf: 'flex-end',
            justifyContent: 'flex-end',
            alignContent: 'flex-end',
            // height: 500,
            backgroundColor: colors.card,
            borderColor: colors.border,
            borderWidth: 1,
            borderStyle: 'solid',
            margin: 10
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
            startDate: date
        };

        console.table(filters);
        onFilter({...filters});
    }

    

    const form = (
        <View style={styles.container}>
            <View style={styles.formItem}>
                <FilterText title={'Name'} onUpdate={setName}></FilterText>
            </View>
            <View style={styles.formItem}>
                <View style={styles.innerFormItem}>
                    <Text style={styles.text}>Starting Date: {date.toLocaleDateString()}</Text>
                    <View style={{width: 100, marginLeft: 'auto'}}>
                        <Button onPress={showDatePicker} title='Select Date'></Button>
                        { showDate && <DateTimePicker value={date} onChange={onDateChange}></DateTimePicker> }
                    </View>
                </View>
            </View>
        </View>
    )


    return (
        <View style={{width: '100%', height: '100%'}}>
            {form}
        </View>
    )








}
