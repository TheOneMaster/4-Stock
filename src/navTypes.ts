import { DrawerNavigationProp, DrawerScreenProps } from "@react-navigation/drawer"
import { MaterialTopTabNavigationProp, MaterialTopTabScreenProps } from "@react-navigation/material-top-tabs"
import { CompositeNavigationProp, CompositeScreenProps, NavigatorScreenParams } from "@react-navigation/native"
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack"
import { EventDataQuery } from "./gql/gql"
import { PropertyDetails } from "./helperTypes"


type IDProp = { id: string }
type EventProp = IDProp & { type: number }
type Event = PropertyDetails<EventDataQuery, "event">

// Navigator types
export type HomeDrawerParamList = {
    "Featured Tournaments": undefined
    "Tournament Search": NavigatorScreenParams<RootStackParamList>
    Settings: undefined
    About: undefined
}

export type RootStackParamList = {
    Home: undefined,
    Tournament: IDProp,
    Event: EventProp,
    Profile: IDProp
}

export type EventTabParamList = {
    Bracket: Pick<Event, "id" | "waves" | "phases"> & IDProp,
    Results: IDProp & { singles: boolean }
}

// Screen typing
export type TournamentViewProps = NativeStackScreenProps<RootStackParamList, 'Tournament'>;
export type EventViewProps = NativeStackScreenProps<RootStackParamList, 'Event'>;
export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, "Home">;
export type UserProfileProps = NativeStackScreenProps<RootStackParamList, "Profile">;

export type TournamentListViewProps = CompositeScreenProps<
    DrawerScreenProps<HomeDrawerParamList, "Tournament Search">,
    HomeScreenProps
>;

export type SettingsViewProps = DrawerScreenProps<HomeDrawerParamList, "Settings">;

export type ResultsViewProps = MaterialTopTabScreenProps<EventTabParamList, "Results">;
export type BracketViewProps = MaterialTopTabScreenProps<EventTabParamList, "Bracket">;

export type FeaturedTournamentsScreenProps = CompositeScreenProps<
    DrawerScreenProps<HomeDrawerParamList, "Featured Tournaments">,
    NativeStackScreenProps<RootStackParamList, "Home">
>;

// Navigation Props

export type TournamentsTopBarNavigationProp = CompositeNavigationProp<
    NativeStackNavigationProp<RootStackParamList, "Home">,
    DrawerNavigationProp<HomeDrawerParamList, "Tournament Search">
>;

export type TournamentCardNavigationProp = CompositeNavigationProp<
    DrawerNavigationProp<HomeDrawerParamList, "Tournament Search">,
    NativeStackNavigationProp<RootStackParamList, "Home">
>;

export type EventCardNavigationProp = NativeStackNavigationProp<RootStackParamList, "Tournament">;

export type ResultsNavigationProp = CompositeNavigationProp<
    NativeStackNavigationProp<RootStackParamList, "Event">,
    MaterialTopTabNavigationProp<EventTabParamList, "Results">
>;

export type FeaturedTournamentCardNavigationProp = CompositeNavigationProp<
    DrawerNavigationProp<HomeDrawerParamList, "Featured Tournaments">,
    NativeStackNavigationProp<RootStackParamList, "Home">
>;
