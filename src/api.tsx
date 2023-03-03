import { Platform, ToastAndroid } from "react-native";

import { API_TOKEN } from "@env";

import { cleanObject, convertStorageToAPI } from "./helper";
import { APIQuery, StorageVariables } from "./types";

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
          waves{
            id
            identifier
            startAt
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
          standings(query: {
            page: $page
            perPage: $perPage
            ${filterString}
                    }) {
                nodes {
                  id
                  placement
                  player @include(if: $singles) {
                        id
                        prefix
                        gamerTag
                        user {
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
    }`;

  const variables = {
    id: Id,
    perPage: perPage,
    page: page,
    singles: singles,
    filter: filter
  }

  return JSON.stringify({ query, variables });
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

export async function queryAPI(query_body: string) {
  try {
    const api_url = "https://api.start.gg/gql/alpha";
    const response = await fetch(api_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_TOKEN}`
      },
      body: query_body
    });

    const json_data: APIQuery = await response.json();
    const data = json_data.data;
    if (data === undefined) {
      throw new TypeError("API request failed. Please try again later.")
    }

    return data;
  } catch (err) {
    console.error("data not got");
    if (Platform.OS === 'android') {
      ToastAndroid.show(err.message, ToastAndroid.SHORT);
    }

    throw err;
  }
}
