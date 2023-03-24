import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack"
import { Entrant, FullEventDetails, EventPageDetails, APIImage, FullTournamentDetails } from "./types"
import { CompositeNavigationProp, CompositeScreenProps, NavigatorScreenParams } from "@react-navigation/native"
import { DrawerNavigationProp, DrawerScreenProps } from "@react-navigation/drawer"
import { MaterialTopTabBarProps, MaterialTopTabNavigationProp, MaterialTopTabScreenProps } from "@react-navigation/material-top-tabs"

// Navigator types
export type HomeDrawerParamList = {
    "Featured Tournaments": undefined
    "Tournament Search": NavigatorScreenParams<RootStackParamList>
    Settings: undefined
    About: undefined
}

export type RootStackParamList = {
    Home: undefined,
    Tournament: {
        id: string
    },
    Event: Pick<FullEventDetails, "id" | "phases" | "type">
    Profile: {
        id: number
    }
}

export type EventTabParamList = {
    Results: {
        standings: Entrant[],
        id: number,
        singles: boolean
    },
    Bracket: EventPageDetails
}

// Screen typing
export type TournamentViewProps = NativeStackScreenProps<RootStackParamList, 'Tournament'>;
export type EventViewProps = NativeStackScreenProps<RootStackParamList, 'Event'>;
export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, "Home">;
export type UserProfileProps = NativeStackScreenProps<RootStackParamList, "Profile">;

export type TournamentsTopBarNavigationProp = CompositeNavigationProp<
    NativeStackNavigationProp<RootStackParamList, "Home">,
    DrawerNavigationProp<HomeDrawerParamList, "Tournament Search">
>

export type TournamentListViewProps = CompositeScreenProps<
    DrawerScreenProps<HomeDrawerParamList, "Tournament Search">,
    HomeScreenProps
>;
export type TournamentCardNavigationProp = CompositeNavigationProp<
    DrawerNavigationProp<HomeDrawerParamList, "Tournament Search">,
    NativeStackNavigationProp<RootStackParamList, "Home">
>;


export type EventCardNavigationProp = NativeStackNavigationProp<RootStackParamList, "Tournament">;

export type SettingsViewProps = DrawerScreenProps<HomeDrawerParamList, "Settings">;

export type ResultsViewProps = MaterialTopTabScreenProps<EventTabParamList, "Results">;
export type BracketViewProps = MaterialTopTabScreenProps<EventTabParamList, "Bracket">;

export type ResultsNavigationProp = CompositeNavigationProp<
    NativeStackNavigationProp<RootStackParamList, "Event">,
    MaterialTopTabNavigationProp<EventTabParamList, "Results">
>


export type FeaturedTournamentsScreenProps = CompositeScreenProps<
    DrawerScreenProps<HomeDrawerParamList,  "Featured Tournaments">,
    NativeStackScreenProps<RootStackParamList, "Home">
>;

export type FeaturedTournamentCardNavigationProp = CompositeNavigationProp<
    DrawerNavigationProp<HomeDrawerParamList, "Featured Tournaments">,
    NativeStackNavigationProp<RootStackParamList, "Home">
>;
