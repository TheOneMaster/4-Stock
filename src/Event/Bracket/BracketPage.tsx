import { StyleSheet, Text, View } from "react-native"
import { BracketViewProps } from "../../navTypes";
import { FlatList } from "react-native-gesture-handler";
import { useTheme } from "@react-navigation/native";

import PhaseButton from "./PhaseButton";

const BracketPage = ({navigation, route}: BracketViewProps) => {
    
    const groups = route.params.phases;

    if (groups.length === 0) {
        return (
            <View style={styles.default}>
                <Text>No brackets found</Text>
            </View>
        )
    } else if (groups.length > 1) {
        return (
            <FlatList
                data={groups}
                renderItem={({item, index}) => index === (groups.length - 1)
                ? <PhaseButton name={item.name} type={item.bracketType} style={{marginRight: 10}}/>
                : <PhaseButton name={item.name} type={item.bracketType}/>
                }
                horizontal={true}
                />
            )
    }
}

const styles = StyleSheet.create({
    default: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})


export default BracketPage;
