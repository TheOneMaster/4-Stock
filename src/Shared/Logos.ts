import Melee from "../../assets/melee.png" 
import Ultimate from "../../assets/ultimate.png"
import PlaceholderGame from "../../assets/placeholder-Game.png"
import PlaceholderTournament from "../../assets/Placeholder-Tournament.png"


export {
    Melee,
    Ultimate,
    PlaceholderGame,
    PlaceholderTournament,
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
