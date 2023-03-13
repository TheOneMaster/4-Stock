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

export interface FullTournamentDetails extends BasicTournamentDetails {
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
    phases: Pick<Phase, "id">[]
}

interface APIHint {
    maxAge: number,
    path: string[],
    scope: string
}
export interface APIQuery {
    actionRecords: [],
    data: TournamentAPIQuery | TournamentListAPIQuery | EventAPIQuery | SetAPIQuery,
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

export interface SetAPIQuery extends APIQuery {
    phaseGroup: Pick<PhaseGroup, "sets" | "startAt" | "state">
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
    id: number,
    name?: string,
    participants?: Participant[],
    placement?: number
}

export interface Wave {
    id: number,
    identifier?: string,
    startAt?: number
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
    phases: Phase[]
}

export interface Phase {
    id: number,
    name?: string,
    bracketType?: string
    phaseGroups?: {
        nodes: PhaseGroup[]
    }
}

export interface PhaseGroup {
    id: number,
    wave?: Wave
    displayIdentifier?: string,
    sets?: GameSetPage
    startAt?: number
    state?: number
}

export interface GameSetPage {
    nodes: GameSet[]
    pageInfo?: {
        total: number
        perPage: number
        page?: number
    }
}

export interface GameSet {
    id: number,
    displayScore?: string,
    identifier?: string,
    round?: number,
    slots?: SetSlot[]
}

interface SetSlot {
    standing: Standing
}

interface Standing {
    entrant: Pick<Entrant, "id" | "name">
    placement: number
    stats: {
        score: {
            value: number
        }
    }
}

export interface PhaseGroupSetInfo {
    sets: GameSet[]
    startAt: number
    state: number
}
