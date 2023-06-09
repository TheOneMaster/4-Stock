import { SavedTournamentsQuery } from "../../gql/gql";
import { NodeArray, PropertyDetails } from "../../helperTypes";


export type TournamentData = Exclude<NodeArray<PropertyDetails<SavedTournamentsQuery, "tournaments">>[number], null>;
