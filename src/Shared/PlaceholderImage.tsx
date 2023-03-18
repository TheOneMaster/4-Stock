import { PlaceholderGame, PlaceHolderPlayer, PlaceholderTournament } from "../Shared/Logos"
import { ImageSourcePropType, Image, StyleSheet, StyleProp, ViewStyle, RegisteredStyle, ImageStyle, ImageURISource } from "react-native"


interface PlaceholderImageProps {
    imageSrc: string
    placeholder: "tournament" | "game" | "player"
    style?: StyleProp<ImageStyle>
}

const PlaceholderImage = ({ imageSrc, placeholder = 'tournament', style }: PlaceholderImageProps) => {
    let placeholderFinal: ImageSourcePropType;

    switch (placeholder) {
        case 'tournament':
            placeholderFinal = PlaceholderTournament;
            break;
        case 'game':
            placeholderFinal = PlaceholderGame;
            break;
        case 'player':
            placeholderFinal = PlaceHolderPlayer;
            break;
    }


    if (imageSrc) return <Image
        style={[styles.image, style]}
        source={{ uri: imageSrc }}
        defaultSource={placeholderFinal as ImageURISource | number} />

    return <Image
        style={[styles.image, style]}
        source={placeholderFinal} />;
}

const styles = StyleSheet.create({
    image: {
        backgroundColor: 'white'
    }
})

export default PlaceholderImage;
