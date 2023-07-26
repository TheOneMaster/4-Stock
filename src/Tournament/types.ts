import { StyleProp, ViewStyle } from "react-native"
import { TournamentDetailsQuery } from "../gql/gql"

type TournamentDetails = Exclude<TournamentDetailsQuery['tournament'], null>


export interface TopBarProps {
    images: TournamentDetails['images']
    name: TournamentDetails['name']
    fav?: boolean
    favFunc?: () => void
}

export interface RegisterButtonProps {
    show: boolean | null
    disabled?: boolean
}

export type DetailsSectionProps = Omit<TournamentDetails, "__typename" | "name" | "id" | "events" | "images">
export interface EventCardProps {
    event: Exclude<TournamentDetails['events'], null>[0]
    style?: StyleProp<ViewStyle>
}
