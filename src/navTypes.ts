import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack"
import { EventDetails, ImageType } from "./types"
import { CompositeNavigationProp, NavigatorScreenParams } from "@react-navigation/native"
import { DrawerNavigationProp } from "@react-navigation/drawer"


export type HomeDrawerParamList = {
    Tournaments: NavigatorScreenParams<RootStackParamList>,
    Settings: undefined,
    About: undefined
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
    Event: {
        event: EventDetails
    }
}

export type TournamentViewProps = NativeStackScreenProps<RootStackParamList, 'Tournament'>;
export type EventViewProps = NativeStackScreenProps<RootStackParamList, 'Event'>;

export type TournamentsTopBarNavigationProp = CompositeNavigationProp<
    NativeStackNavigationProp<RootStackParamList, "Home">,
    DrawerNavigationProp<HomeDrawerParamList, "Tournaments">
>;
