import { StyleProp, ViewStyle } from "react-native"
import { Set } from "../../types"
import { ScrollView } from "react-native-gesture-handler"


type BracketTreeProps = {
    bracketData: Set[],
    style?: StyleProp<ViewStyle>|StyleProp<ViewStyle>[]
}

function removeDQSets(setList: Set[]): Set[] {
    return setList.filter((set) => set.displayScore !== "DQ");
}

const BracketTree = ({bracketData, style}: BracketTreeProps) => {
 
    


    return (
        <ScrollView horizontal={true}>

        </ScrollView>
    )



}
