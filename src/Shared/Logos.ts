import Melee from "../../assets/melee.png" 
import Ultimate from "../../assets/ultimate.png"
import PlaceholderGame from "../../assets/placeholder-Game.png"
import PlaceholderTournament from "../../assets/Placeholder-Tournament.png"
import PlaceHolderPlayer from "../../assets/placeholder-player.png"


export {
    Melee,
    Ultimate,
    PlaceholderGame,
    PlaceholderTournament,
    PlaceHolderPlayer
}



export function getImageByGameId(id: number) {

    switch (id) {
        case 1:
            return Melee;

        case 1386:
            return Ultimate;

        default:
            return PlaceholderGame;
    }



}
