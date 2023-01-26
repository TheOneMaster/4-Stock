import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { useTheme } from "@react-navigation/native";


function FilterItem({element, title}: {element: JSX.Element, title: string}) {

    const {colors} = useTheme();

    const styles = StyleSheet.create({
        container: {
            padding: 10,
            // borderColor: colors.border,
            // borderWidth: 1,
            // borderStyle: 'solid',
            // backgroundColor: colors.card
        },
        title: {
            marginBottom: 5,
            fontSize: 17,
            color: colors.text
        }
    });

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            {element}
        </View>
    )
}

export function FilterText({title, onUpdate=undefined, ...props}) {

    const [selected, setSelected] = useState(false);

    const {colors} = useTheme();
    const style = StyleSheet.create({
        input: {
            padding: 7,
            // width: 200,
            // flex: 1,
            // backgroundColor: colors.card,
            borderColor: colors.border,
            borderWidth: 1,
            borderStyle: 'solid',
            color: colors.text,
            fontSize: 15

        }
    });
    const LIGHT_GREY = "#d3d3d3";

    function handleFocus(event) {
        setSelected(true);

        if (props.onFocus) {
            props.onFocus(event);
        }
    }

    function handleBlur(event) {
        setSelected(false);
    }

    const input = <TextInput 
                        style={style.input}
                        placeholder={'Genesis'}
                        onFocus={handleFocus}
                        onChangeText={newText => onUpdate(newText)}
                        onBlur={handleBlur}
                        selectionColor={colors.primary}
                        underlineColorAndroid={ selected ? colors.primary : LIGHT_GREY }
                        placeholderTextColor={'#777777'}
                        
                        {...props}
                        />

    return <FilterItem element={input} title={title}></FilterItem>
}
