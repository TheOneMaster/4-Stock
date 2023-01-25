interface Image {
    id: string,
    type: string,
    url: string
}

export interface BasicTournamentDetails {
    id: number,
    name: string,
    city: string,
    startAt: number,
    numAttendees?: number,
    images: Image[]
}

export interface FullTournamentDetails extends BasicTournamentDetails{
    countryCode: string,
    currency: string,
    eventRegistrationClosesAt: number,
    events: [
        {
            id: number,
            videogame: {
                id: number
            }
        }
    ],
    isRegistrationOpen: boolean,
    mapsPlaceId: string,
    primaryContact: string,
    primaryContactType: string,
    venueName: string,
    venueAddress: string,
}

export interface EventDetails {
    id: number,
    name: string,
    videogame: {
        id: number,
        displayName: string
    }
}

interface APIHint {
    maxAge: number,
    path: string[],
    scope: string
}
export interface APIQuery {
    actionRecords: [],
    data: TournamentAPIQuery|TournamentListAPIQuery,
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
