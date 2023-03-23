import { StyleProp, ViewStyle } from "react-native"
import { UserDetailsQuery } from "../gql/gql"

type UserDetails = Exclude<UserDetailsQuery['user'], null>

export interface ProfileHeaderProps {
    profileDetails: Pick<UserDetails, "player"|"images"|"genderPronoun"|"location">
}

export interface UserInfoSectionProps {
    player: UserDetails["player"]
    genderPronoun: UserDetails["genderPronoun"]
    location: UserDetails["location"]
    style?: StyleProp<ViewStyle>
}
