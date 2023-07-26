import { StyleSheet } from "react-native"
import FastImage, { FastImageProps, ImageStyle } from "react-native-fast-image"

import { PlaceholderGame, PlaceHolderPlayer, PlaceholderTournament } from "../Shared/Logos"


interface PlaceholderImageProps {
    imageSrc?: string | null
    placeholder?: "tournament" | "game" | "player"
    style?: ImageStyle
    resize?: FastImageProps['resizeMode']
}

function getPlaceholderImage(placeholder: Required<PlaceholderImageProps['placeholder']>) {
    switch (placeholder) {
        case "tournament": return PlaceholderTournament;
        case "game": return PlaceholderGame;
        case "player": return PlaceHolderPlayer;
        default: return PlaceholderTournament
    }
}



const PlaceholderImage = ({ imageSrc, placeholder = 'tournament', style, resize }: PlaceholderImageProps) => {

    const placeholderImage = getPlaceholderImage(placeholder);
    const imageStyle = style ? [styles.image, style] : styles.image;

    if (imageSrc) return <FastImage style={imageStyle} source={{ uri: imageSrc }} resizeMode={resize} />

    return <FastImage style={imageStyle} source={placeholderImage} resizeMode={resize} />;
}

const styles = StyleSheet.create({
    image: {
        backgroundColor: 'white'
    }
})

export default PlaceholderImage;
