import { useTheme } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { View, ScrollView, StatusBar, RefreshControl } from "react-native";

import { localTournamentQuery, queryAPI } from "../api";

import { SearchButton } from "./SearchButton";
import TopBar from "./TopBar";
import { TournamentCard } from "./TournamentCard";
import { TournamentListAPIQuery } from "../types";


const TournamentListView = ({navigation}) => {

  const { colors } = useTheme();
  // console.log(useTheme());

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
            paddingHorizontal: 10,
        },
        tournamentCard: {
          marginBottom: 10,
          // paddingBottom: 10
        }
    });

    const [data, setData] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const getLocalTournaments = async() => {   
      try {
        const body = localTournamentQuery("40.730610, -73.935242", "50mi", 20);
        const data = await queryAPI(body) as TournamentListAPIQuery;
        setData(data.tournaments.nodes);
      } catch(err) {

      }
        
    }

    const onRefresh = async() => {
        setRefreshing(true);
        await getLocalTournaments();     
        setRefreshing(false);
  
      }
  
    useEffect(() => {
        getLocalTournaments();
        console.log('test')
    }, []);

    return (
        <View style={{flex: 1}}>
          <StatusBar></StatusBar>
          <TopBar></TopBar>
          
          <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}></RefreshControl>} style={styles.container}>

          { data.map((props, i) => {
              return (
                <View style={ i !== 0 ? styles.tournamentCard : {...styles.tournamentCard, paddingTop: 10} } key={props.id}>
                  <TournamentCard {...props} navigation={navigation}></TournamentCard>
                </View>
              )
          })}
          </ScrollView>
          <SearchButton></SearchButton>
          
        </View>
    )

}

export default TournamentListView;
