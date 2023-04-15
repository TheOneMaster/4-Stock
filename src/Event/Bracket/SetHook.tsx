import { useQueries, useQuery } from "@tanstack/react-query";
import { localStorage, useFetchData } from "../../fetchAPI"
import { PhaseGroupDetails, SetQuery } from "./types";

function useSets(pGroupID: string) {

    const phaseGroupDetailsQuery = await useFetchData<PhaseGroupDetails, { pgID: string }>(phaseGroupInfo)({ pgID: pGroupID });
    const totalPages = phaseGroupDetailsQuery.data.phaseGroup.sets?.pageInfo?.totalPage;

    const setQueries = useQueries({
        queries: 
    })



}

async function fetchPhaseGroupDetails(PhaseGroupID: string) {

}


async function fetchSets(pGroupID: string, page: number) {

    const apiKey = localStorage.getString("general.apiKey") ?? "";
    const variables = { pgID: pGroupID, page: page }

    const res = await fetch("https://api.start.gg/gql/alpha", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json",
            "X-Exclude-Invalid": "true"
        },
        body: JSON.stringify({ body, variables })
    });

    const json: SetQuery = await res.json();

    json.data


    return
}

const phaseGroupInfo =
    `query PhaseGroupDetails($pgID: ID!) {
    phaseGroup(id: $pgID) {
        displayIdentifier
        bracketType
        startAt
        state
        sets(perPage: 30) {
            pageInfo {
                perPage
                page
                totalPages
                total
            }
        }
    }
}`


const body =
    `query getPhaseGroupSets($pgID: ID!, page: Int) {
    phaseGroup(id: $pgID) {
      sets(sortType: ROUND, perPage: 30) {
        nodes {
          round
          setGamesType
          winnerId
          slots {
            standing {
              placement
              stats {
                score {
                  value
                }
              }
              entrant {
                name
              }
            }
          }
        }
      }
    }
  }`

const useFetch = useFetchData<SetQuery, { pgID: string, page: number }>(phaseGroupInfo);
useFetch({ pgID: })
