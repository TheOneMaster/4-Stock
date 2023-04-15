import { Maybe } from "../../gql/gql"


export interface SetQuery {
    data: {
        phaseGroup: {
            sets: Maybe<{
                nodes: Maybe<{
                    round: Maybe<number>
                    setGamesType: Maybe<number>
                    slots: Maybe<{
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
                    }>
                }>
            }>
        }
    }
    extensions: {
        queryComplexity: number
    }
    success?: boolean
}

export interface PhaseGroupDetails {
    data: {
        phaseGroup: {
            id: string|null
            bracketType: string|null
            startAt: number|null
            state: number|null
            sets: {
                pageInfo: {
                    page: number
                    perPage: number
                    totalPage: number
                    total: number
                } | null
            } | null
        }
    }
}
