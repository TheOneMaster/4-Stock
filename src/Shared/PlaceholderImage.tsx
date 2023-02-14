import { PlaceholderGame, PlaceHolderPlayer, PlaceholderTournament } from "../Shared/Logos"
import { ImageSourcePropType, Image } from "react-native"

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


    if (imageSrc) {
        return (
            <Image 
                style={style}
                source={{uri: imageSrc}}
                defaultSource={placeholderFinal}/>
        )
    }

    const image = <Image
                    style={style}
                    source={placeholderFinal}/>;
    
    // console.log(image);

    return image
}

export default PlaceholderImage;
