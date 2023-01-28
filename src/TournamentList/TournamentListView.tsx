import { useTheme } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, RefreshControl, StatusBar, StyleSheet, View } from "react-native";

import { queryAPI, tournamentListQuery } from "../api";
import { convertDateToUnixSeconds, convertStorageToAPI } from "../helper";

import { APIVariables, BasicTournamentDetails, StorageVariables, TournamentListAPIQuery } from "../types";
import { FilterView } from "./FilterComponent";
import { SearchButton } from "./SearchButton";
import TopBar from "./TopBar";
import { TournamentCard } from "./TournamentCard";


const TournamentListView = ({ navigation }) => {

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
  const [page, setPage] = useState(1);
  const [coords, setCoords] = useState("40.730610, -73.935242");

  const [filterParams, setFilterParams] = useState({
    perPage: 20,
    location: {
      distanceFrom: "40.730610, -73.935242",
      distance: "50mi"
    }
  } as Partial<StorageVariables>);

  const setTournamentData = async () => {

    const finalVariables: APIVariables = {};
    for (const variable in filterParams) {
      const value = filterParams[variable];

      // console.info(`${variable} - ${typeof(value)}`);

      if (value instanceof Date) {
        finalVariables[variable] = convertDateToUnixSeconds(value);
        continue;
      }
      finalVariables[variable] = value;
    }

    // console.log(finalVariables);

    try {
      const body = tournamentListQuery(finalVariables);
      const json_data = await queryAPI(body) as TournamentListAPIQuery;

      const currentData = json_data.tournaments.nodes

      setData(json_data.tournaments.nodes);
    } catch (err) {
      console.log(err)
    }
  }

  const updateTournamentList = async (pageNum: number) => {

    if (finished) {
      return;
    }

    setUpdating(true);

    const params = Object.assign({}, filterParams);
    params.page = pageNum;

    const variables = convertStorageToAPI(params);
    variables.page = page;

    const body = tournamentListQuery(variables);
    const query_data = await queryAPI(body) as TournamentListAPIQuery;
    const current_data = query_data.tournaments.nodes;

    if (current_data.length > 0) {
      setData(prevData => [...prevData, ...current_data]);
    } else {
      console.log('No more tourneys');
      setFinished(true);
    }

    setUpdating(false);
  }


  const onRefresh = async () => {
    setRefreshing(true);
    setPage(1);
    await setTournamentData();
    setRefreshing(false);
  };

  useEffect(() => {
    setRefreshing(true);

    setTournamentData().then(() => setRefreshing(false))

    // setRefreshing(false);
  }, [filterParams]);

  useEffect(() => {
    if (page !== 1) {
      updateTournamentList(page);
    }
  }, [page])



  const tournamentItem = (props, index) => (
    <View style={index !== 0 ? styles.tournamentCard : { ...styles.tournamentCard, paddingTop: 15 }}>
      <TournamentCard {...props} navigation={navigation}></TournamentCard>
    </View>
  );

  const test = async (filters) => {
    console.log('poop');


  }


  return (
    <View style={{ flex: 1 }}>
      <StatusBar></StatusBar>
      <TopBar></TopBar>
      <FlatList
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}></RefreshControl>} style={styles.container}
        data={data}
        renderItem={(tournament) => tournamentItem(tournament.item, tournament.index)}
        keyExtractor={tournament => `tournament_${tournament.id.toString()}`}
        onEndReached={() => setPage(page + 1)}
        onEndReachedThreshold={0.1}
      ></FlatList>
      <SearchButton showFilter={setShowFilter}></SearchButton>


      {updating &&
        <View style={styles.updatingIcon}>
          <ActivityIndicator size='large' color='red'></ActivityIndicator>
        </View>
      }


      <FilterView updateFilters={setFilterParams} setShow={setShowFilter} show={showFilter}></FilterView>


    </View>
  )
}

export default TournamentListView;
