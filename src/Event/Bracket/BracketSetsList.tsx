import { FlatList, StyleProp, ViewStyle } from "react-native";
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
            contentContainerStyle={props.containerStyle}
            renderItem={({ item, index }) => {
                if (index === props.sets.length - 1) {
                    console.log(JSON.stringify(item))
                }
                return <SetResult set={item} />
            }}
        />
    )
}

export default BracketSetsList
