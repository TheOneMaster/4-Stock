import { Button, Image, StyleProp, StyleSheet, TextInput, View, ViewStyle } from "react-native"
import { useTheme } from "@react-navigation/native";
import { Text } from "react-native";

const SearchBar = ({setFilter, filterAction, searchTitle, style}: {setFilter: React.Dispatch<React.SetStateAction<string>>, filterAction: () => void, searchTitle: string, style?: StyleProp<ViewStyle>}) => {

    const { colors } = useTheme();


    return (
        <View style={[styles.container, style, {backgroundColor: colors.card}]}>
            <View>
                <Image />
            </View>
            <TextInput
                placeholder="Entrant"
                placeholderTextColor={colors.secondaryText}
                onChangeText={(newText) => setFilter(newText.trim())}
                style={{...styles.filterInput, backgroundColor: colors.card, color: colors.text}}
            />
            <View style={styles.filterButton}>
                <Button onPress={filterAction} title={searchTitle}></Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: 10,
        alignItems: 'center'
    },
    filterInput: {
        marginRight: 5,
        flex: 1,
        padding: 5
    },
    filterButton: {
        marginLeft: 'auto'
    }
});

export default SearchBar;
