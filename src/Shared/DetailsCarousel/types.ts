import { StyleProp, ViewStyle } from "react-native";
import { ImageType } from "../../types";

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
    text: string
}

export interface CarouselDataItem {
    title: string
    image: ImageType
    dataType: "tournament" | "player" | "game"
    subtitle?: string
    subtitleItem?: React.ReactNode
}
