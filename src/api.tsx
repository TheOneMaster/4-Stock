import { Platform, ToastAndroid } from "react-native";

import { API_TOKEN } from "@env";

import { APIQuery, APIVariables, APIFiltersTemplate, StorageVariables } from "./types";
import { addMonthsToDate, convertDateToUnixSeconds } from "./helper";


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


function createFilter(filters, spacing = 0): string {

    // console.log(filters);
    if (typeof filters !== 'object') {
        return '$' + filters + '\n'
    }


    const test = Object.keys(filters)
        .map(key => {
            // console.log(key);
            const value = filters[key];
            const initalSpacing = '  '.repeat(spacing);
            if (typeof value !== 'object') {
                return `${initalSpacing}${key}: ${createFilter(key)}`
            }

            return initalSpacing + key + ":{\n" + createFilter(value, spacing + 1) + "}";
        })
        .join("\n");

    // console.log(test);

    return test

}


export function tournamentListQuery(params: Partial<APIVariables>) {
    const variableString = createVariableString(params);

    const bodyVariables = ['page', 'perPage'];
    let bodyObj = bodyVariables.reduce((prev, cur) => {

        if (cur in params) {
            return { ...prev, [cur]: params[cur] }
        }

        return prev
    }, {});


    const bodyConstraints = createFilter(bodyObj, 1);
    // console.log(bodyConstraints);

    const filters = Object.keys(params)
        .filter(param => !(bodyVariables.includes(param)))
        .reduce((prev, cur) => ({ ...prev, [cur]: params[cur] }), {});
    // console.log(filters);



    const filterString = createFilter(filters, 2);
    // console.log(filters);

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


    const variables = getFlatObject(params);

    return JSON.stringify({ query, variables });
}





export async function queryAPI(query_body: string, timeout = 10000) {
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

function flattenVariables(params: Partial<APIVariables>): Object[] {
    let test = [];
    for (const param in params) {
        const value = params[param];
        if (typeof value === 'object' && !(value instanceof Date)) {
            test.push(...flattenVariables(value));
            continue;
        }
        const t = {[param]: value}
        test.push(t)
    }
    return test
}

function getFlatObject(obj: Object): Object {
    const flatArray = flattenVariables(obj);
    return Object.assign({}, ...flatArray);
} 

function createVariableString(params) {
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
