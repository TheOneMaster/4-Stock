import { PlaceholderGame, PlaceHolderPlayer, PlaceholderTournament } from "../Shared/Logos"
import { ImageSourcePropType, Image, StyleSheet } from "react-native"
import { useTheme } from "@react-navigation/native";

const PlaceholderImage = ({imageSrc, placeholder='tournament', style}: {imageSrc: string, placeholder?: 'tournament'|'game'|'player', style?: Object}) => {
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

    const styles = StyleSheet.create({
        image: {
            backgroundColor: 'white'
        }
    });

    const imageStyle = Object.assign({}, styles.image, style);


    if (imageSrc) {
        return (
            <Image 
                style={imageStyle}
                source={{uri: imageSrc}}
                defaultSource={placeholderFinal}/>
        )
    }

    const image = <Image
                    style={imageStyle}
                    source={placeholderFinal}/>;
    
    // console.log(image);

    return image
}

export default PlaceholderImage;
