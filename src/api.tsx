import { Platform, ToastAndroid } from "react-native";

import { API_TOKEN } from "@env";

import { APIQuery, PhaseGroupSetInfo, PhaseGroupSets } from "./types";

// API Query functions


export function PhaseSetsQuery(Id: number, perPage = 20, page = 1) {
  const query = `
    query getSets($id: ID, $pageNum: Int, $perPage: Int) {
        phaseGroup(id: $id) {
          startAt
          state
          sets(
            page: $pageNum
            perPage: $perPage
            ) {
            pageInfo {
              perPage
              total
            }
            nodes {
              id
              round
              identifier
              slots {
                standing {
                  entrant {
                    id
                    name
                  }
                  placement
                  stats {
                    score {
                      value
                      
                    }
                  }
                }
              }
            }
          }
        }
      }
      `

  const variables = {
    id: Id,
    perPage: perPage,
    pageNum: page
  }

  return JSON.stringify({ query, variables });
}

export async function getPGroupSetInfo(id: number, controller: AbortController): Promise<Pick<PhaseGroupSetInfo, "sets" | "startAt" | "state">> {
  const pGroupInfo: Pick<PhaseGroupSetInfo, "sets" | "startAt" | "state"> = {
    sets: [],
    startAt: null,
    state: null
  }

  let page = 1;
  let perPage = 20;
  let moreSets = true;

  while (moreSets) {
    const body = PhaseSetsQuery(id, perPage, page);
    try {
      const data = await queryAPI(body, controller) as PhaseGroupSets;
      page += 1

      pGroupInfo.sets.push.apply(pGroupInfo.sets, data.phaseGroup.sets.nodes);
      moreSets = !(data.phaseGroup.sets.pageInfo.total === pGroupInfo.sets.length)

      if (!moreSets) {
        pGroupInfo.startAt = data.phaseGroup.startAt;
        pGroupInfo.state = data.phaseGroup.state;
      }

    } catch (error) {
      if (error.name === "AbortError") {
        throw error
        // break
      }
    }
  }

  return pGroupInfo
}

export async function queryAPI(query_body: string, controller?: AbortController) {
  try {

    const api_url = "https://api.start.gg/gql/alpha";
    const response = await fetch(api_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_TOKEN}`
      },
      body: query_body,
      signal: controller ? controller.signal : undefined
    });

    const json_data: APIQuery = await response.json();
    const data = json_data.data;
    if (data === undefined) {
      throw new TypeError("API request failed. Please try again later.")
    }

    return data;
  } catch (err) {
    console.error("data not got");

    if (err.name === 'AbortError') {
      console.error("Aborted fetch");
      throw err
    }

    if (Platform.OS === 'android') {
      ToastAndroid.show(err.message, ToastAndroid.SHORT);
    }

    throw err;
  }
}
