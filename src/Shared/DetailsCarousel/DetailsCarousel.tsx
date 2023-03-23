import { FlatList, StyleSheet, View } from "react-native";
import { MainText } from "../ThemedText";
import CarouselItem, { CarouselEmptyText } from "./CarouselItem";
import { DetailsCarouselProps } from "./types";

function DetailsCarousel(props: DetailsCarouselProps) {


    return (
        <View style={props.style}>

            {props.title ? <MainText style={styles.title}>{props.title}</MainText> : null}

            <FlatList
                contentContainerStyle={styles.container}
                data={props.data}
                renderItem={({ item }) => <CarouselItem item={item} navigation={props.navigation} />}
                ItemSeparatorComponent={() => <View style={styles.spacingView} />}
                ListEmptyComponent={() => <CarouselEmptyText text={props.emptyText} />}

                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </View>


    )
}





const styles = StyleSheet.create({
    container: {
        flexGrow: 1
    },
    title: {
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: 10
    },
    spacingView: {
        width: 8
    }
});

export default DetailsCarousel;
