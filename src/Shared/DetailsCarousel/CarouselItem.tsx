import { StyleSheet, View } from "react-native";
import { useTheme } from "@react-navigation/native";

import PlaceholderImage from "../PlaceholderImage";
import { MainText } from "../ThemedText";
import { CarouselEmptyTextProps, CarouselItemProps } from "./types";

function CarouselItem(props: CarouselItemProps) {

    const { colors } = useTheme();
    const colorCSS = StyleSheet.create({
        container: {
            backgroundColor: colors.card,
            borderColor: colors.border
        },
        imageContainer: {
            borderColor: colors.border
        }
    })


    return (
        <View style={[styles.container, colorCSS.container]}>

            <View style={[styles.tournamentImageContainer, colorCSS.imageContainer]}>
                <PlaceholderImage imageSrc={props.item.image.url} placeholder={props.item.dataType} style={styles.tournamentImage} />
            </View>

            <View style={styles.textBox}>
                <MainText style={styles.title} numberOfLines={2}>{props.item.title}</MainText>

                {props.item.subtitle
                    ? <View style={styles.subtitleContainer}>
                        <MainText style={styles.subtitle} numberOfLines={2}>{props.item.subtitle}</MainText>
                    </View>
                    : null}

                {props.item.subtitleItem
                    ? props.item.subtitleItem
                    : null}

            </View>

        </View>
    )


}

export function CarouselEmptyText(props: CarouselEmptyTextProps) {
    if (!props.text) return null;

    return (
        <View style={styles.centerBox}>
            <MainText>{props.text}</MainText>
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        padding: 10,
        maxWidth: 350,
        borderWidth: 1,
        borderRadius: 10
    },
    tournamentImage: {
        height: "100%",
        width: "100%"
    },
    tournamentImageContainer: {
        width: 100,
        height: 100,
        marginRight: 8,
        borderRadius: 10,
        borderWidth: 2,
        overflow: "hidden"
    },
    textBox: {
        flexShrink: 1
    },
    title: {
        flexGrow: 1,
        fontWeight: "500",
        flexWrap: "wrap"
    },
    subtitleContainer: {
        flexShrink: 1,
    },
    subtitle: {
        flexShrink: 1,
        flexWrap: "wrap"
    },
    centerBox: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});

export default CarouselItem;