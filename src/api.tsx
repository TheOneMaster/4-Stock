import { Platform, ToastAndroid } from "react-native";

import { API_TOKEN } from "@env";

import { APIQuery, APIVariables, APIFiltersTemplate, StorageVariables } from "./types";
import { addMonthsToDate, cleanObject, convertDateToUnixSeconds, convertStorageToAPI } from "./helper";

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

export function EventDetailsQuery(Id: number): string {
    const query = `
    query getEventData($id: ID) {
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
                player {
                    id
                    prefix
                    gamerTag
                    user {
                        images {
                            id
                            url
                            type
                        }
                    genderPronoun
                    }
                }
                placement
            }
          }
        }
    }`;

    const variables = {
        id: Id
    }

    return JSON.stringify({query, variables});
}

export function EventStandingsQuery(Id: number, page: number): string {
    const query = `
    query getEventStandings($id: ID, $page: Int) {
        event(id: $id) {
            standings(query: {
                page: $page
                perPage: 24
            }) {
                nodes {
                    id
                    placement
                    player {
                        id
                        prefix
                        gamerTag
                        user {
                            images {
                                id
                                url
                                type
                            }
                        genderPronoun
                        }
                    }
                }
            }
        }
    }`;

    const variables = {
        id: Id,
        page: page
    }

    return JSON.stringify({query, variables});
}



export function tournamentListQuery(storageParams: Partial<StorageVariables>): string {
    const params = convertStorageToAPI(storageParams);
    const paramsUsed = cleanObject(params);
    const variableString = createVariableString(paramsUsed);

    const bodyVariables = ['page', 'perPage'];
    let bodyObj = bodyVariables.reduce((prev, cur) => {
        if (cur in paramsUsed) {
            return { ...prev, [cur]: paramsUsed[cur] }
        }
        return prev
    }, {});

    const bodyConstraints = createGraphQLString(bodyObj, 1);
    const filters = Object.keys(paramsUsed)
        .filter(param => !(bodyVariables.includes(param)))
        .reduce((prev, cur) => ({ ...prev, [cur]: paramsUsed[cur] }), {});

    const filterString = createGraphQLString(filters, 2);

    const query = `
    query getTournaments${variableString} {
        tournaments(query: {
            ${bodyConstraints}
            filter: {
                ${filterString}
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
    }`


    const variables = getFlatObject(paramsUsed);

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

// Object manipulation functions

function flattenVariables<T extends Object>(params: T): Object[] {
    let returnVariables = [];
    for (const param in params) {
        const value = params[param];
        if (typeof value === 'object' && !(value instanceof Date)) {
            returnVariables.push(...flattenVariables(value));
            continue;
        }
        const t = {[param]: value}
        returnVariables.push(t)
    }
    return returnVariables
}

function getFlatObject(obj: Object): Object {
    const flatArray = flattenVariables(obj);
    return Object.assign({}, ...flatArray);
} 

function createVariableString(params): string {
    const flatVariables = getFlatObject(params);
    // console.log(flatVariables);

    let variablesChosenTemplate = {};
    for (const variable in flatVariables) {
        if (variable in APIFiltersTemplate) {
            variablesChosenTemplate[variable] = APIFiltersTemplate[variable];
        }
    };

    let variableStringList = [];
    for (const variable in variablesChosenTemplate) {
        variableStringList.push(`$${variable}: ${variablesChosenTemplate[variable]}`);
    };
    
    let variableString = variableStringList.join(", ");

    // console.log(variableString);

    if (variableString !== '') {
        variableString = "(" + variableString + ")"; 
    }

    return variableString
}

function createGraphQLString(filters: any, spacing = 0): string {
    if (typeof filters !== 'object') {
        return '$' + filters + '\n'
    }

    const test = Object.keys(filters)
        .map(key => {
            const value = filters[key];
            const initalSpacing = '  '.repeat(spacing);
            if (typeof value !== 'object') {
                return `${initalSpacing}${key}: ${createGraphQLString(key)}`
            }

            return initalSpacing + key + ":{\n" + createGraphQLString(value, spacing + 1) + "}";
        })
        .join("\n");

    return test

}
