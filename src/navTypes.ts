import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack"
import { Entrant, EventDetails, FullEventDetails, ImageType } from "./types"
import { CompositeNavigationProp, CompositeScreenProps, NavigatorScreenParams } from "@react-navigation/native"
import { DrawerNavigationProp, DrawerScreenProps } from "@react-navigation/drawer"
import { MaterialTopTabBarProps, MaterialTopTabNavigationProp, MaterialTopTabScreenProps } from "@react-navigation/material-top-tabs"

// Navigator types
export type HomeDrawerParamList = {
    Tournaments: NavigatorScreenParams<RootStackParamList>,
    Settings: undefined
}

export type RootStackParamList = {
    Home: undefined,
    Tournament: {
        tournamentDetails: {
            id: number,
            name: string,
            city: string,
            date: number,
            images: ImageType[]
        }
    },
    Event: EventDetails
}

export type EventTabParamList = {
    Results: {
        standings: Entrant[],
        id: number,
        singles: boolean
    },
    Bracket: FullEventDetails
}

// Screen typing
export type TournamentViewProps = NativeStackScreenProps<RootStackParamList, 'Tournament'>;
export type EventViewProps = NativeStackScreenProps<RootStackParamList, 'Event'>;
export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, "Home">;

export type TournamentsTopBarNavigationProp = CompositeNavigationProp<
    NativeStackNavigationProp<RootStackParamList, "Home">,
    DrawerNavigationProp<HomeDrawerParamList, "Tournaments">
    >

export type TournamentListViewProps = CompositeScreenProps<
    HomeScreenProps,
    DrawerScreenProps<HomeDrawerParamList, "Tournaments">
    >;
export type SettingsViewProps = DrawerScreenProps<HomeDrawerParamList, "Settings">;

export type ResultsViewProps = MaterialTopTabScreenProps<EventTabParamList, "Results">;
export type BracketViewProps = MaterialTopTabScreenProps<EventTabParamList, "Bracket">;
