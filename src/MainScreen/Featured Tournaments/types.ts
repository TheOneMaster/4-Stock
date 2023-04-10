import { FeaturedTournamentsQuery } from "../../gql/gql";

type FeaturedTournaments = Exclude<FeaturedTournamentsQuery, null>;
type NodeArray<Type extends {nodes: any[]|null}|null> = Exclude<Exclude<Type, null>['nodes'], null>;

type Tournaments = NodeArray<FeaturedTournaments['tournaments']>
type Tournament = Exclude<Tournaments[0], null>

export type LargeTournamentCardProps = Omit<Tournament, "id"> & {
    id: string
}
