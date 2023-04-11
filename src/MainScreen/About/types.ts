import { Ionicons } from "@expo/vector-icons";

export interface LinkProps {
    icon: keyof typeof Ionicons.glyphMap
    linkUrl: string
}

export interface InfoRowProps {
    title: string
    value: string
}
