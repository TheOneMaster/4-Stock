import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const ResultsPage = ({navigation, route}) => {

    const [results, setResults] = useState([]);
    
    return (
        <View style={style.container}>
            <Text>{JSON.stringify(route)}</Text>
        </View>
    )




}

const style = StyleSheet.create({
    container: {

    }
})

export default ResultsPage;
