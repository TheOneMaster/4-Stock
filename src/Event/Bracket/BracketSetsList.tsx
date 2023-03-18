import { FlatList, StyleProp, View, ViewStyle } from "react-native";
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
            contentContainerStyle={[props.containerStyle, { flexGrow: 1 }]}
            renderItem={({ item }) => <SetResult set={item} />}
            ListEmptyComponent={
                <View style={{ flexGrow: 1, alignItems: "center", justifyContent: "center" }}>
                    <MainText>No sets returned</MainText>
                </View>
            }
        />
    )
}

export default BracketSetsList
