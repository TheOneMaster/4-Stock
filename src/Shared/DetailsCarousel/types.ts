import { StyleProp, ViewStyle } from "react-native";
import { APIImage } from "../../types";

export interface DetailsCarouselProps {
    data: CarouselDataItem[]
    title?: string
    emptyText?: string
    style?: StyleProp<ViewStyle>
}

export interface CarouselItemProps {
    item: CarouselDataItem
    style?: StyleProp<ViewStyle>
}

export interface CarouselEmptyTextProps {
    text?: string
}

export interface CarouselDataItem {
    title: string
    image: APIImage
    dataType: "tournament" | "player" | "game"
    subtitle?: string
    subtitleItem?: React.ReactNode
}
