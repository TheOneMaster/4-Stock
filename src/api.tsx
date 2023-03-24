import { Platform, ToastAndroid } from "react-native";

import { API_TOKEN } from "@env";

import { cleanObject, convertStorageToAPI } from "./helper";
import { APIFiltersTemplate, APIQuery, PhaseGroupSetInfo, PhaseGroupSets, StorageVariables } from "./types";

// API Query functions

export function tournamentDetailsQuery(Id: number): string {
  const query = `
    query getTournamentDetails($ID: ID!) {
        tournament(id: $ID) {
          id
          name
          city
          countryCode
          currency
          eventRegistrationClosesAt
          events {
            id
            type
            name
            phases {
                id
            }
            videogame {
              id
              displayName
              images {
                id
                type
                url
              }
            }
          }
          isRegistrationOpen
          mapsPlaceId
          numAttendees
          primaryContact
          primaryContactType
          startAt
          venueName
          venueAddress
          images {
            id
            type
            url
          }
        }
      }`

  const variables = {
    "ID": Id,
  }

  return JSON.stringify({ query, variables });
}

export function EventDetailsQuery(Id: number, singles = true): string {
  const query = `
    query getEventData($id: ID, $singles: Boolean!) {
        event(id: $id){
          id
          name
          isOnline
          state
          startAt
          phases {
            id
            name
            bracketType
            phaseGroups {
                nodes {
                    id
                    displayIdentifier
                    wave {
                        id
                    }
                }
            }
          }
          waves{
            id
            identifier
          }
          standings(query: {
            page: 1
            perPage: 24
          }){
            nodes {
                id
                  placement  
                  player @include(if: $singles) {
                    prefix
                    gamerTag
                    user {
                        id
                        images(type: "profile") {
                            url
                        }
                    genderPronoun
                    }
                }
                entrant @skip(if: $singles){
                  id
                  name
                  participants {
                    user {
                      images(type: "profile") {
                        url
                      }
                    }
                  }
                }
            }
          }
        }
    }`;

  const variables = {
    id: Id,
    singles: singles
  }

  return JSON.stringify({ query, variables });
}

export function EventStandingsQuery(Id: number, perPage: number, page: number, singles: boolean, filter?: string) {
  const filterString = filter ? `filter: {
        search: {
            searchString: $filter
        }
    }` : '';

  let variableString = filter ? '$id: ID, $perPage: Int, $page: Int, $singles: Boolean!, $filter: String' : '$id: ID, $perPage: Int, $page: Int, $singles: Boolean!';

  const query = `
  query getEventStandings(${variableString}) {
    event(id: $id) {
      standings(query: {page: $page, perPage: $perPage, ${filterString}}) {
        nodes {
          id
          placement
          player @include(if: $singles) {
            id
            prefix
            gamerTag
            user {
              id
              images(type: "profile") {
                url
              }
              genderPronoun
            }
          }
          entrant @skip(if: $singles) {
            id
            name
            participants {
              user {
                images(type: "profile") {
                  url
                }
              }
            }
          }
        }
      }
    }
  }
  `;

  const variables = {
    id: Id,
    perPage: perPage,
    page: page,
    singles: singles,
    filter: filter
  }

  return JSON.stringify({ query, variables });
}

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


export function userDetailsQuery(id: number) {
  const query = `
  query getUserInfo($id: ID, $perPage: Int) {
    user(id: $id) {
      id
      genderPronoun
      images {
        id
        type
        url
      }
      location {
        country
        state
      }
      player {
        gamerTag
        prefix
        user {
          id
          name
        }
      }
      events(query: {perPage: $perPage}) {
        nodes {
          name
          tournament {
            id
            name
            images(type: "profile") {
              url
            }
          }
          userEntrant(userId: $id) {
            standing {
              id
              placement
            }
          }
        }
      }
      tournaments(query: {perPage: $perPage}) {
        nodes {
          id
          name
          images(type: "profile") {
            url
          }
        }
      }
      leagues(query: {perPage: $perPage}) {
        nodes {
          id
          name
          images(type: "profile") {
            height
            url
          }
        }
      }
    }
  }
  
  `

  const variables = {
    id: id,
    perPage: 10
  }

  return JSON.stringify({ query, variables })
}



export function tournamentListQuery(storageParams: StorageVariables): string {
  const query = `
    query getTournaments($name: String, $page: Int, $perPage: Int, $beforeDate: Timestamp, $videogameIds: [ID]) {
        tournaments(query: {
            page: $page
            perPage: $perPage
            filter: {
                name: $name
                beforeDate: $beforeDate
                videogameIds: $videogameIds
                }
            }) {
                nodes {
                    id
                    name
                    city
                    startAt
                    numAttendees
                    images {
                        id
                        type
                        url
                        }
                        
                    }
                }
            }`;

  const cleanedParams = cleanObject(storageParams);
  const variables = convertStorageToAPI(cleanedParams);
  return JSON.stringify({ query, variables });
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
