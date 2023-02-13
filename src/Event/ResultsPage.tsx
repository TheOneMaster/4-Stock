import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useTheme } from "@react-navigation/native";

import ResultCard from "./ResultCard";

const ResultsPage = ({navigation, route}) => {

    const standings = route.params.standings;
    const { colors } = useTheme()
    
    return (
        <View style={{flex: 1}}>
            <FlatList
                data={standings}
                renderItem={({index, item}) => <ResultCard playerData={item}/>}
                style={{...styles.container, backgroundColor: colors.background}}
                />
        </View>
    )




}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingTop: 10
    }
})

export default ResultsPage;
