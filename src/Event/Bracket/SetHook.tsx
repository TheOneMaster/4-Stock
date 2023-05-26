import { useQueries, useQuery } from "@tanstack/react-query";
import { localStorage, useFetchData } from "../../fetchAPI";
import { PhaseGroupDetails, SetQuery } from "./types";

export function useSets(pGroupID: string | null) {

  const { data: PhaseGroupDetails, isInitialLoading: loadingPGroupData } = useQuery({
    queryKey: ['pGroupInfo', pGroupID],
    queryFn: () => useFetchData<PhaseGroupDetails, { pgID: string }>(phaseGroupInfo)({ pgID: pGroupID! }),
    enabled: !!pGroupID
  });

  const totalPages = PhaseGroupDetails?.phaseGroup.sets?.pageInfo?.totalPages;
  const pageArray = Array.from(Array(totalPages), (x, i) => i + 1);

  const pGroupInfo = PhaseGroupDetails?.phaseGroup;

  const setQueries = useQueries({
    queries: pageArray.map(page => {
      return {
        queryKey: ['sets', pGroupID, page],
        queryFn: () => fetchSets(pGroupID, page),
        enabled: !!pGroupID && !!page,
        retry: false
      }
    })
  });

  const queriesStatus = setQueries.map(query => query.status);

  console.log(loadingPGroupData, queriesStatus);

  return { setPages: setQueries, pGroupInfo, loadingPGroupData, queriesStatus }
}


async function fetchSets(pGroupID: string | null, page: number) {

  if (pGroupID === null) throw new Error("No PhaseGroup ID provided");

  const apiKey = localStorage.getString("general.apiKey") ?? "";
  const variables = { pgID: pGroupID, page: page };

  const res = await fetch("https://api.start.gg/gql/alpha", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "X-Exclude-Invalid": "true"
    },
    body: JSON.stringify({ query: phaseGroupSets, variables })
  });

  const json = await res.json();

  if (json.success === false) {
    const message = json.message;
    throw new Error(message);
  }

  return json.data as SetQuery
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
                totalPages
                total
            }
        }
    }
}`


const phaseGroupSets =
  `query getPhaseGroupSets($pgID: ID!, $page: Int) {
    phaseGroup(id: $pgID) {
      sets(perPage: 30, page: $page) {
        pageInfo {
          page
        }
        nodes {
          id
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
  }
  `
