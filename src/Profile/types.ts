import { StyleProp, TextStyle, ViewStyle } from "react-native"
import { ImageType, User, UserEvent } from "../types"

export interface EventDetailsCarouselProps {
    profileDetails: UserEvent[]
    title?: string
    containerStyle?: StyleProp<ViewStyle>
    titleStyle?: StyleProp<TextStyle>
}
