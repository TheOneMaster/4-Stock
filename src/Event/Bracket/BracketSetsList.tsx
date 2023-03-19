import { FlatList, StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import { MainText } from "../../Shared/ThemedText";
import { GameSet } from "../../types";
import SetResult from "./SetResult";

interface BracketSetsListProps {
    sets: GameSet[]
    containerStyle?: StyleProp<ViewStyle>
}

function BracketSetsList(props: BracketSetsListProps) {
    return (
        <FlatList
            data={props.sets}
            contentContainerStyle={[styles.containerStyle, props.containerStyle]}
            renderItem={({ item, index }) => {
                if (index === props.sets.length - 1) {
                    // console.log(JSON.stringify(item))
                    // console.log(props.sets.length)
                }
                return <SetResult set={item} />
            }}
            ListEmptyComponent={() => (
                <View style={{ flexGrow: 1, justifyContent: "center", alignItems: "center" }}>
                    <MainText>No Sets available</MainText>
                </View>
            )}

        />
    )
}

const styles = StyleSheet.create({
    containerStyle: {
        flexGrow: 1
    }
})


export default BracketSetsList
