import { Platform, ToastAndroid } from "react-native";

import { API_TOKEN } from "@env"

import { APIQuery, APIVariables } from "./types";

export function localTournamentQuery(coordinates: string, radius = "50mi", perPage = 20, page = 1): string {
    const current_time = new Date('2022-11-16').getTime();
    const time_seconds = Math.floor(current_time / 1000);
    // console.log(time_seconds);
    const query = `
    query getLocalTournaments($coordinates: String!, $radius: String!, $perPage: Int = 20, $after: Timestamp, $page: Int) {
        tournaments(query: {
            perPage: $perPage
            page: $page
            sortBy: "startAt desc"
            filter: {
                location: {
                    distanceFrom: $coordinates,
                    distance: $radius
                }
                videogameIds: [1]
                afterDate: $after
            }
        }) {
            nodes {
                id
                name
                city
                startAt
                numAttendees
                images(type: "") {
                    id
                    type
                    url
                }
            }
        }
    }`;

    const variables = {
        coordinates: coordinates,
        radius: radius,
        perPage: perPage,
        after: time_seconds,
        page: page
    };

    // console.log(time_seconds);
    return JSON.stringify({query, variables});
}

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
          images(type:"") {
            id
            type
            url
          }
        }
      }`

      const variables = {
        "ID": Id,
      }

      return JSON.stringify({query, variables});
}


function createFilter(filters, spacing=0): string {

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

            return initalSpacing + key + ":{\n" + createFilter(value, spacing+1) + "}";
        })
        .join("\n");

    // console.log(test);

    return test
    
}


export function tournamentListQuery(params: Partial<APIVariables>) {

    // console.log(params);
    const templateVariables = {
        distanceFrom: 'String',
        distance: 'String',
        perPage: 'Int',
        page: 'Int',
        after: 'Timestamp',
        name: 'String'
    }

    const variablesUsed = Object.keys(params).filter(param => param in templateVariables);
    
    // console.log(variablesUsed);
    
    const variableList = variablesUsed
        .map(variable => `$${variable}: ${templateVariables[variable]}`);
        // .map(variable => `$${variable}"`);

    
    const variableString = variableList.join(", ");

    const bodyVariables = ['page', 'perPage'];
    let bodyObj = bodyVariables.reduce((prev, cur) => {

        if (cur in params) {
            return {...prev, [cur]: params[cur]}
        }

        return prev
    }, {});

    // console.log(bodyObj);
    
    
    const bodyConstraints = createFilter(bodyObj, 1);
    // console.log(bodyConstraints);

    const filters = Object.keys(params)
        .filter(param => !(bodyVariables.includes(param)))
        .reduce((prev, cur) => ({...prev, [cur]: params[cur]}), {});
    // console.log(filters);



    const filterString = createFilter(filters, 2);
    // console.log(filters);

    const query = `
    query getTournaments(${variableString}) {
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
                images(type: "profile") {
                    id
                    type
                    url
                }

            }
        }
    }`

    // console.log(query);


    const variables = params

    return JSON.stringify({query, variables});
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
        console.log(json_data)
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
