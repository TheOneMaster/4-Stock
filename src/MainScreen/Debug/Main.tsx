import { useCallback, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { DebugPageProps } from "../../navTypes";
import { PrimaryCard } from "../../Shared";
// import { MainText, PrimaryCard, RubikText } from "../../Shared";
import { BottomSheet, MIN_TRANSLATE_Y } from "../../Shared/BottomSheet/BottomSheet";
import { BottomSheetRefProps } from "../../Shared/BottomSheet/types";
import { MainText } from "../../Shared/Text";
import { FilterButton } from "../Tournament Search/FilterButton";

export function DebugPage(props: DebugPageProps) {

    const bottomSheetRef = useRef<BottomSheetRefProps>(null);
    const onPress = useCallback(() => {
        if (bottomSheetRef.current?.isActive()) {
            bottomSheetRef.current.scrollTo(0);
        } else {
            bottomSheetRef.current?.scrollTo(MIN_TRANSLATE_Y)
        }
    }, [])

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPress} style={styles.button} />
            <FilterButton onPress={onPress} style={styles.filterButton} />
            <MainText>Testing</MainText>
            <BottomSheet ref={bottomSheetRef}>

                <PrimaryCard style={styles.bottomCard}>
                    <MainText style={styles.titleText}>Filters</MainText>

                </PrimaryCard>


            </BottomSheet>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    button: {
        height: 50,
        borderRadius: 25,
        aspectRatio: 1,
        backgroundColor: "white",
        opacity: 0.6
    },
    bottomCard: {
        flex: 1,
        flexGrow: 1
    },
    titleText: {
        fontSize: 18,
        padding: 10
    },
    filterButton: {
        position: "absolute",
        bottom: 30,
        right: 30
    }
})
