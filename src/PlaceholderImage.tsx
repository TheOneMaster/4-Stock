import { PlaceholderGame, PlaceholderTournament } from "./Logos"
import { ImageSourcePropType, Image } from "react-native"

const PlaceholderImage = ({imageSrc, placeholder=null, style}) => {
    let placeholderFinal: ImageSourcePropType;

    if (placeholder === null) {
        placeholderFinal = PlaceholderTournament;
    } 


    if (imageSrc) {
        return (
            <Image 
                style={style}
                source={{uri: imageSrc}}
                defaultSource={placeholder}/>
        )
    }

    const image = <Image
                    style={style}
                    source={placeholderFinal}/>;
    
    // console.log(image);

    return image
}

export default PlaceholderImage;
