// import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View, StatusBar, Image, RefreshControl } from "react-native";
import { NativeModules } from "react-native";

import { API_TOKEN } from "@env"

import { TournamentCard } from "./TournamentCard";

import TopBar from "./TopBar";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "fff",
        // alignItems: "center",
        // justifyContent: "center",
        // margin: 10
        padding: 10
    },
    scrollView: {
      flex: 1,
      
    },
    searchButton: {
      backgroundColor: "red",
      padding: 10,
      borderRadius: 80/2,
      position: "absolute",
      bottom: 30,
      right: 30,
    },
    searchIcon: {
      width: 60,
      height: 60,
    }
});

function localTournamentQuery(coordinates: string, radius = "50mi", perPage = 10) {
    const current_time = new Date().getTime();
    const time_seconds = Math.floor(current_time / 1000);
    // console.log(time_seconds);
    const query = `
    query getLocalTournaments($coordinates: String!, $radius: String!, $perPage: Int) {
        tournaments(query: {
            perPage: $perPage
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


function App() {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const getLocalTournaments = async() => {

        const body = localTournamentQuery("40.730610, -73.935242", "50mi", 20);
        // console.log(body);

        const api_url = "https://api.start.gg/gql/alpha"

        const response = await fetch(api_url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_TOKEN}`
            },
            body: body
        });
        
        const data = await response.json()
        // console.log(data.data.tournaments.nodes.length)
        // console.log(data)
        setData(data.data.tournaments.nodes);
        setLoading(true);
    }

    const onRefresh = async() => {
      setRefreshing(true);

      await getLocalTournaments();

      setRefreshing(false);

    }

    useEffect(() => {
        getLocalTournaments();
    }, []);

    return (
    <View style={{flex: 1}}>
        <StatusBar></StatusBar>
        <TopBar></TopBar>
        <View style={styles.container}>
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}></RefreshControl>}>
            { data.map((props) => {
                return (
                  <View style={{marginBottom: 5}} key={props.id}>
                    <TournamentCard {...props}></TournamentCard>
                  </View>
                )
            })}
            </ScrollView>

            <View style={styles.searchButton}>
              <Image source={require("./assets/icons8-search.png")}></Image>
            </View>
        </View>
    </View>
    )
}

export default App;
