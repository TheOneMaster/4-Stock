type NodeArray<Type> = {
    nodes: Type[]
    pageInfo?: {
        perPage?: number
        total?: number
        page?: number
    }
}

interface Tournament {
    id?: number
    name?: string
    city?: string
    startAt?: number
    numAttendees?: number
    images?: APIImage[]
    countryCode?: string
    currency?: string
    eventRegistrationClosesAt?: number
    events?: Event[]
    isRegistrationOpen?: boolean
    mapsPlaceId?: string
    primaryContact?: string
    primaryContactType?: string
    venueName?: string | null
    venueAddress?: string | null
}

export type APIImageType = "profile" | "banner" | "primary" | "primary-quality";

export interface APIImage {
    id?: string,
    type?: APIImageType,
    url: string
}

export type BasicTournamentDetails = Required<Pick<Tournament, "id" | "name" | "city" | "startAt" | "numAttendees" | "images">>;
export type TournamentPageDetails = Required<Omit<Tournament, "events">> & { events: BasicEventDetails[] }
export type FullTournamentDetails = Required<Tournament>;

interface Event {
    id?: number
    name?: string
    type?: number
    videogame?: VideoGame
    isOnline?: boolean
    startAt?: number
    state?: string
    phases?: Phase[]
    waves?: Wave[]
    standings?: NodeArray<Entrant>
}

interface VideoGame {
    id?: number
    displayName?: string
    images?: APIImage[]
}


export type BasicEventDetails = Required<Pick<Event, "id" | "name" | "type" | "videogame">> & { phases: Required<Pick<Phase, "id">>[] };
export type EventPageDetails = Required<Omit<Event, "videogame" | "type">>;
export type FullEventDetails = Required<Event>;

interface APIHint {
    maxAge: number,
    path: string[],
    scope: string
}
interface APIReturn {
    actionRecords: [],
    data: any
    extensions: {
        cacheControl: {
            hints: APIHint[],
            version: number
        },
        queryComplexity: number
    }
}
interface APITournamentListData {
    tournaments: NodeArray<BasicTournamentDetails>
}

interface APITournamentDetails {
    tournament: TournamentPageDetails
}

interface APIEventDetails {
    event: EventPageDetails
}

interface APIPhaseGroupSets {
    phaseGroup: Pick<PhaseGroup, "sets" | "startAt" | "state">
}

interface APIUserDetails {
    user: UserProfileData
}

interface APIResultsDetails {
    event: Pick<Event, "standings">
}


export type APIQuery = Readonly<APIReturn>;
export type TournamentListData = Readonly<APITournamentListData>;
export type TournamentDetails = Readonly<APITournamentDetails>;
export type EventDetails = Readonly<APIEventDetails>;
export type PhaseGroupSets = Readonly<APIPhaseGroupSets>;
export type UserDetails = Readonly<APIUserDetails>;
export type ResultsDetails = Readonly<APIResultsDetails>


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

export interface Participant {
    id?: number
    user?: User
}

export interface Entrant {
    id?: number
    name?: string
    participants?: Participant[]
    placement?: number
}

export interface Wave {
    id?: number
    identifier?: string
    startAt?: number
}

export interface Phase {
    id?: number
    name?: string,
    bracketType?: string
    phaseGroups?: NodeArray<PhaseGroup>
}

export interface PhaseGroup {
    id?: number
    wave?: Wave
    displayIdentifier?: string
    sets?: NodeArray<GameSet>
    startAt?: number
    state?: number
}

export interface GameSet {
    id?: number,
    displayScore?: string,
    identifier?: string,
    round?: number,
    slots?: SetSlot[]
}

export interface SetSlot {
    standing: Pick<Standing, "placement" | "stats"> & {
        entrant: Pick<Entrant, "id" | "name">
    } | null
}



export interface PhaseGroupSetInfo {
    id: number
    phaseID: number
    sets: GameSet[]
    startAt: number
    state: number
}

export interface Player {
    id?: number
    gamerTag?: string
    prefix?: string
    user?: User
}

interface User {
    id?: number
    name?: string
    genderPronoun?: string
    images?: APIImage[]
    player?: Player
    location?: {
        country: string
        state?: string
    }
    events?: NodeArray<UserEvent>
    tournaments?: NodeArray<Tournament>
    leagues?: NodeArray<League>
}

export type UserProfileData = Omit<User, "player" | "tournaments"> & {
    player: Pick<Player, "gamerTag" | "prefix"> & {
        user: Pick<User, "id" | "name">
    }
    tournaments: NodeArray<Pick<Tournament, "id" | "images" | "name">>
}


export interface UserEvent {
    name: string
    tournament: Pick<Tournament, "id" | "name" | "images">
    userEntrant: {
        standing: Pick<Standing, "id" | "placement">
    }
}

export interface League {
    id?: number
    name?: string
    images?: APIImage[]
}

export interface Standing {
    id?: number
    placement?: number | null
    player?: Player
    entrant?: Entrant
    stats?: {
        score: {
            value: number | null
        }
    }
}
