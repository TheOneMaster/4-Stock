import { Platform, ToastAndroid } from "react-native";

import { API_TOKEN } from "@env"

import { APIQuery } from "./types";

export function localTournamentQuery(coordinates: string, radius = "50mi", perPage = 10): string {
    const current_time = new Date().getTime();
    const time_seconds = Math.floor(current_time / 1000);
    // console.log(time_seconds);
    const query = `
    query getLocalTournaments($coordinates: String!, $radius: String!, $perPage: Int) {
        tournaments(query: {
            perPage: $perPage
            sortBy: "startAt asc"
            filter: {
                location: {
                    distanceFrom: $coordinates,
                    distance: $radius
                }
                videogameIds: [1]
                afterDate: ${time_seconds}
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
    };

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

        if (Platform.OS === 'android') {
            ToastAndroid.show(err.message, ToastAndroid.SHORT);
        }

        throw err;
    }
}
