import { Image, ImageStyle, ImageURISource, StyleProp, StyleSheet } from "react-native"
import { PlaceholderGame, PlaceHolderPlayer, PlaceholderTournament } from "../Shared/Logos"


interface PlaceholderImageProps {
    imageSrc?: string | null
    placeholder?: "tournament" | "game" | "player"
    style?: StyleProp<ImageStyle>
}

function getPlaceholderImage(placeholder: Required<PlaceholderImageProps['placeholder']>) {
    switch (placeholder) {
        case "tournament": return PlaceholderTournament;
        case "game": return PlaceholderGame;
        case "player": return PlaceHolderPlayer;
        default: return PlaceholderTournament
    }
}



const PlaceholderImage = ({ imageSrc, placeholder = 'tournament', style }: PlaceholderImageProps) => {

    const placeholderImage = getPlaceholderImage(placeholder);

    if (imageSrc) return <Image style={[styles.image, style]} source={{ uri: imageSrc }} defaultSource={placeholder as ImageURISource} />

    return <Image style={[styles.image, style]} source={placeholderImage} />;
}

const styles = StyleSheet.create({
    image: {
        backgroundColor: 'white'
    }
})

export default PlaceholderImage;
