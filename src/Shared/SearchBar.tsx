import { Button, Image, StyleSheet, TextInput, View } from "react-native"
import { useTheme } from "@react-navigation/native";
import { Text } from "react-native";

const SearchBar = ({setFilter, filterAction, searchTitle}: {setFilter: React.Dispatch<React.SetStateAction<string>>, filterAction: () => void, searchTitle: string}) => {

    const { colors } = useTheme();


    return (
        <View style={{...styles.container, backgroundColor: colors.card2}}>
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
        marginTop: 10,
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
