import { StyleProp, ViewStyle } from "react-native";
import { APIImage } from "../../types";

export interface DetailsCarouselProps {
    data: CarouselDataItem[]
    title?: string
    emptyText?: string
    navigation?: (id: string) => void
    style?: StyleProp<ViewStyle>
}

export interface CarouselItemProps {
    item: CarouselDataItem
    navigation?: (id: string) => void
    style?: StyleProp<ViewStyle>
}

export interface CarouselEmptyTextProps {
    text?: string
}

export interface CarouselDataItem {
    id: string
    title: string
    image: string | null
    dataType: "Tournament" | "League" | "Event"
    subtitle?: string
    subtitleItem?: React.ReactNode
}
