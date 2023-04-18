import { StyleProp, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons"

import { EventDataQuery, Maybe } from "../../gql/gql";
import { NodeArray, PropertyDetails } from "../../helperTypes";
import { ComponentProps } from "react";

type Event = PropertyDetails<EventDataQuery, "event">;
type FilteredType<T> = Exclude<T, null>[]

export interface SetQuery {
    phaseGroup: {
        sets: Maybe<{
            nodes: (Maybe<{
                id: Maybe<string>
                round: Maybe<number>
                setGamesType: Maybe<number>
                slots: ({
                    standing: Maybe<{
                        placement: Maybe<number>
                        stats: Maybe<{
                            score: Maybe<{
                                value: Maybe<number>
                            }>
                        }>
                        entrant: Maybe<{
                            name: Maybe<string>
                            id: Maybe<string>
                        }>
                    }>
                } | null)[]
            }>)[]
            pageInfo: {
                page: number
            }
        }>
    }
}

export interface PhaseGroupDetails {
    phaseGroup: {
        id: string | null
        bracketType: string | null
        startAt: number | null
        state: number | null
        sets: {
            pageInfo: {
                page: number
                perPage: number
                totalPages: number
                total: number
            } | null
        } | null
    }
}

export interface TestFiltersProps {
    eventDetails: Pick<Event, "phases" | "waves">
    filters: SelectedOptions
    setFilters: React.Dispatch<React.SetStateAction<SelectedOptions>>
    style?: StyleProp<ViewStyle>
}

export type RawPhases = PropertyDetails<Event, "phases">;
export type Phase = RawPhases[0];
export type Phases = FilteredType<Phase>


export type RawPhaseGroups = NodeArray<Exclude<Phase, null>['phaseGroups']>
export type PhaseGroup = RawPhaseGroups[0];
export type PhaseGroups = FilteredType<PhaseGroup>

export type RawWaves = PropertyDetails<Event, "waves">;
export type Wave = RawWaves[0];
export type Waves = FilteredType<Wave>

export interface SelectedOptions {
    selectedPhase: string | null
    selectedWave: string | null
    selectedPGroup: string | null
}

export interface DropdownOptions {
    dropdownPGroup: Phases
    dropdownWaves: Waves
}

export interface testPhaseButtonProps {
    phase: Phase
    selectPhase: (phaseID: string) => void
    active: boolean
}

export type Set = Exclude<NodeArray<SetQuery['phaseGroup']['sets']>[0], null>;
export type SetSlot = Exclude<PropertyDetails<Set, "slots">[0], null>;

export interface SetResultProps {
    set: Set
    style?: StyleProp<ViewStyle>
}

export interface EntrantRowProps {
    name?: string | null
    score: number | null
    winner?: boolean
    style?: StyleProp<ViewStyle>
}

export interface PhaseGroupDetailsProps {
    details?: PhaseGroupDetails['phaseGroup']
    style?: StyleProp<ViewStyle>
}

export type IconNames = keyof typeof Ionicons.glyphMap;
export type Status = "success" | "loading" | "error"
