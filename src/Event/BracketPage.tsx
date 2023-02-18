import { StyleSheet, Text, View } from "react-native"
import { BracketViewProps } from "../navTypes";
import { FlatList } from "react-native-gesture-handler";
import { useTheme } from "@react-navigation/native";

import PhaseButton from "./Bracket/PhaseButton";

const BracketPage = ({navigation, route}: BracketViewProps) => {
    
    const groups = route.params.phases;

    const defaultView = (
        <View style={styles.default}>
            <Text>No brackets found</Text>
        </View>
    )

    return (
        <View>
            
            { groups.length > 1 && 
            <FlatList
                data={groups}
                renderItem={({item, index}) => index < (groups.length - 1)
                ? <PhaseButton name={item.name} type={item.bracketType}/>
                : <PhaseButton name={item.name} type={item.bracketType} style={{marginRight: 10}}/>
                }
                horizontal={true}
                />}

            { groups.length === 0 && defaultView }

        </View>
    )
}

const styles = StyleSheet.create({
    default: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})


export default BracketPage;
