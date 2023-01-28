import { useTheme } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, RefreshControl, StatusBar, StyleSheet, Text, View } from "react-native";

import { localTournamentQuery, queryAPI, tournamentListQuery } from "../api";

import { APIVariables, BasicTournamentDetails, TournamentListAPIQuery } from "../types";
import { FilterView } from "./FilterComponent";
import { SearchButton } from "./SearchButton";
import TopBar from "./TopBar";
import { TournamentCard } from "./TournamentCard";


const TournamentListView = ({navigation}) => {

  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      paddingHorizontal: 10,
    },

    tournamentCard: {
      marginBottom: 15,
    },

    updatingIcon: {
      position: "absolute",
      bottom: 20,
      left: 0,
      right: 0,
      alignContent: "center",
      justifyContent: "center",
    }
  });

  const [data, setData] = useState([] as BasicTournamentDetails[]);
  
  // UI State elements
  const [refreshing, setRefreshing] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [finished, setFinished] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  // Filters
  const [nextPage, setNextPage] = useState(2);
  const [coords, setCoords] = useState("40.730610, -73.935242");

  const [filterParams, setFilterParams] = useState({
    perPage: 20,
    page: 1,
    location: {
      distanceFrom: "40.730610, -73.935242",
      distance: "50mi"
    }
  } as Partial<APIVariables>);

  const getLocalTournaments = async() => {   
    try {
      const body = localTournamentQuery("40.730610, -73.935242", "50mi");
      const query_data = await queryAPI(body) as TournamentListAPIQuery;
      setData(query_data.tournaments.nodes);
    } catch(err) {
      console.log('empty data set');
    }
  }

  const updateTournamentList = async () => {

    if (finished) {
      return;
    }

    setUpdating(true);
    console.log(nextPage);
    
    const body = localTournamentQuery(coords, "50mi", undefined, nextPage);
    const query_data = await queryAPI(body) as TournamentListAPIQuery;
    const current_data = query_data.tournaments.nodes;

    if (current_data.length > 0) {
      setData(prevData => [...prevData, ...current_data]);
    } else {
      console.log('No more tourneys');
      setFinished(true);
    }
    
    setUpdating(false);
    setNextPage(page => page + 1);
  }


  const onRefresh = async() => {
    setRefreshing(true);
    setNextPage(2);
    await getLocalTournaments();     
    setRefreshing(false);
  };

  
  useEffect(() => {
      getLocalTournaments();
  }, []);

  useEffect(() => {
    console.log('test_poop');
    console.log(filterParams);
  }, [filterParams])




  const tournamentItem = (props, index) => (
    <View style={ index !== 0 ? styles.tournamentCard : {...styles.tournamentCard, paddingTop: 15} }>
      <TournamentCard {...props} navigation={navigation}></TournamentCard>
    </View>
  );

  const test = async (filters) => {
    console.log('poop');

    console.log()

    // try {
    //   const body = tournamentListQuery(filters);
    //   const json_data = await queryAPI(body) as TournamentListAPIQuery;
    //   setData(json_data.tournaments.nodes);
    // } catch(err) {
    //   console.log('pee');
    // }
  }


  return (
      <View style={{flex: 1}}>
        <StatusBar></StatusBar>
        <TopBar></TopBar>
          <FlatList
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}></RefreshControl>} style={styles.container}
            data={data}
            renderItem={(tournament) => tournamentItem(tournament.item, tournament.index)}
            keyExtractor={tournament => `tournament_${tournament.id.toString()}`}
            onEndReached={updateTournamentList}
            onEndReachedThreshold={0.1}
          ></FlatList>
        <SearchButton showFilter={setShowFilter}></SearchButton>


        { updating && 
          <View style={styles.updatingIcon}>
            <ActivityIndicator size='large' color='red'></ActivityIndicator>
          </View>
        }

        
        <FilterView updateFilters={setFilterParams} setShow={setShowFilter} show={showFilter}></FilterView>


      </View>
  )
}

export default TournamentListView;
