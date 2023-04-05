import { EventResultsQuery } from "../../gql/gql";

type NodeType = {
    nodes: any[] | null
} | null


type NodeArray<T extends NodeType> = Exclude<Exclude<T, null>['nodes'], null>


type Standings = NodeArray<Exclude<EventResultsQuery['event'], null>['standings']>
type Standing = Exclude<Standings[0], null>

export type ResultCardProps = {
    playerData: Pick<Standing, "placement"|"player"|"entrant"> & {id: string}
}
