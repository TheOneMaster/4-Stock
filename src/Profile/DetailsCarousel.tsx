import { FlatList, StyleSheet, View } from "react-native";
import { MainText } from "../Shared/ThemedText";
import EventCarouselItem from "./EventCarouselItem";
import { EventDetailsCarouselProps } from "./types";

function EventDetailsCarousel(props: EventDetailsCarouselProps) {

    return (

        <View style={styles.container}>

            {props.title ? <MainText style={styles.title}>{props.title}</MainText> : null}

            <FlatList
                data={props.profileDetails}
                contentContainerStyle={[styles.listContainer, props.containerStyle]}
                renderItem={({ item }) => <EventCarouselItem event={item} />}
                ItemSeparatorComponent={() => <View style={styles.listSeperator}></View>}
                horizontal
                showsHorizontalScrollIndicator={false}

                ListEmptyComponent={() => (
                    <View style={{ flexGrow: 1, justifyContent: "center", alignItems: "center" }}>
                        <MainText>No previous events</MainText>
                    </View>
                )}
            />

        </View>

    )


}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 5
    },
    title: {
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: 10
    },
    listSeperator: {
        width: 8
    },
    listContainer: {
        flexGrow: 1
    }
});

export default EventDetailsCarousel;
