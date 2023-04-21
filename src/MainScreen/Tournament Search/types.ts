import { Ionicons } from "@expo/vector-icons";
import { StyleProp, ViewStyle } from "react-native";
import { TournamentListDataQuery } from "../../gql/gql";
import { TournamentCardNavigationProp } from "../../navTypes";

export interface EmptyTournamentListProps {
    status: "success" | "loading" | "error"
}

type TournamentConnection = Exclude<TournamentListDataQuery['tournaments'], null>;
type Tournaments = Exclude<TournamentConnection['nodes'], null>;
type TournamentDetails = Exclude<Tournaments[0], null>;

type RequiredNotNull<T> = {
    [P in keyof T]: NonNullable<T[P]>
}

type Ensure<T, K extends keyof T> = T & RequiredNotNull<Pick<T, K>>


export type TournamentCardProps = Ensure<TournamentDetails, "id"> & {
    navigation: TournamentCardNavigationProp
    style?: StyleProp<ViewStyle>
};

export interface SubtitleProps {
    text: string | null
    iconName: keyof typeof Ionicons.glyphMap
}

export interface FilterButtonProps {
    onPress: () => void
    style?: StyleProp<ViewStyle>
}

export interface FilterButtonRefProps {
    toggleFilter: (active: boolean) => void
}
