export interface ImageType {
    id?: string,
    type?: string,
    url: string
}

export interface BasicTournamentDetails {
    id: number,
    name: string,
    city: string,
    startAt: number,
    numAttendees?: number,
    images: ImageType[]
}

export interface FullTournamentDetails extends BasicTournamentDetails{
    countryCode: string,
    currency: string,
    eventRegistrationClosesAt: number,
    events: EventDetails[],
    isRegistrationOpen: boolean,
    mapsPlaceId: string,
    primaryContact: string,
    primaryContactType: string,
    venueName?: string,
    venueAddress: string,
}

export interface EventDetails {
    id: number,
    name: string,
    type: number,
    videogame: {
        id: number,
        displayName: string
        images: ImageType[]
    },
    phases: {
        id: number
    }[]
}

interface APIHint {
    maxAge: number,
    path: string[],
    scope: string
}
export interface APIQuery {
    actionRecords: [],
    data: TournamentAPIQuery|TournamentListAPIQuery|EventAPIQuery,
    extensions: {
        cacheControl: {
            hints: APIHint[],
            version: number
        },
        queryComplexity: number
    }
}

export interface TournamentListAPIQuery extends APIQuery {
    tournaments: {
        nodes: BasicTournamentDetails[]
    }
}

export interface TournamentAPIQuery extends APIQuery {
    tournament: FullTournamentDetails
}

export interface EventAPIQuery extends APIQuery {
    event: FullEventDetails
}

export interface TournamentQueryVariables {
    name?: string,
    city?: string,
    perPage?: number,
    afterDate?: number,
    coordinates?: string,
    radius?: string
}

interface LocationFilter {
    distanceFrom: string,
    distance?: string
}
export interface APIVariables {
    name?: string,
    perPage?: number,
    page?: number,
    afterDate?: number,
    beforeDate?: number,
    location?: LocationFilter,
}
export interface StorageVariables {
    name?: string,
    perPage?: number,
    page?: number,
    afterDate?: Date,
    beforeDate?: Date,
    location?: LocationFilter
}

export const APIFiltersTemplate = {
    name: "String",
    perPage: "Int",
    page: "Int",
    afterDate: "Timestamp",
    beforeDate: "Timestamp",
    distanceFrom: "String",
    distance: "String"
} as const;

interface Participant {

}

export interface Entrant {
    id?: number,
    name: string,
    participants: Participant[],
    placement: number
}

interface Wave {
    id: number,
    identifier: string,
    startAt: number
}

export interface FullEventDetails {
    id: number,
    isOnline: boolean,
    name: string,
    standings: {
        nodes: Entrant[]
    },
    startAt: number,
    state: string,
    waves: Wave[],
    phases: {
        id: number,
        name: string,
        bracketType: string
    }[]
}

export interface Phase {
    id?: number,
    name: string,
    bracketType: string
    phaseGroups: {
        nodes: PhaseGroup[]
    }
}

export interface PhaseGroup {
    id?: number,
    displayIdentifier: string,
    sets?: {
        nodes: Set[]
    }
}

export interface Set {
    id?: number,
    displayScore: string,
    identifier: string,
    round: number,
    slots: SetSlot[]
}

interface SetSlot {
    id?: number,
    entrant: Partial<Entrant>
}
