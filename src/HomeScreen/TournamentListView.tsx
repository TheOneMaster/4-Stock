import { useTheme } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, RefreshControl, StatusBar, StyleSheet, ToastAndroid, View } from "react-native";

import { queryAPI, tournamentListQuery } from "../api";
import { addMonthsToDate } from "../helper";

import { BasicTournamentDetails, StorageVariables, TournamentListData } from "../types";
import { FilterView } from "./FilterComponent";
import { SearchButton } from "./SearchButton";
import TopBar from "./TopBar";
import { TournamentCard } from "./TournamentCard";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeDrawerParamList, RootStackParamList, TournamentListViewProps } from "../navTypes";


const TournamentListView = ({ navigation }: TournamentListViewProps) => {

  const { colors } = useTheme();
  const [data, setData] = useState([] as BasicTournamentDetails[]);

  // UI State elements
  const [refreshing, setRefreshing] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [finished, setFinished] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  // Filters
  const [page, setPage] = useState(1);

  const [filterParams, setFilterParams] = useState({
    beforeDate: addMonthsToDate(new Date(), 1)
  } as Partial<StorageVariables>);

  const setTournamentData = async () => {
    setRefreshing(true);

    try {
      const body = tournamentListQuery(filterParams);
      const json_data = await queryAPI(body) as TournamentListData;
      const currentData = json_data.tournaments.nodes
      setData(currentData);
    } catch (err) {
      console.log(err)
    }

    setRefreshing(false);
  };

  const updateTournamentList = async () => {

    if (finished) {
      return;
    }

    setUpdating(true);

    const params = Object.assign({}, filterParams);
    params.page = page;

    const body = tournamentListQuery(params);
    const query_data = await queryAPI(body) as TournamentListData;
    const current_data = query_data.tournaments.nodes;

    if (current_data.length > 0) {
      setData(prevData => [...prevData, ...current_data]);
    } else {
      console.log('No more tourneys');
      setFinished(true);
    }

    setUpdating(false);
  };

  const onRefresh = async () => {
    setPage(1);
    setFinished(false);

    await setTournamentData();
  };

  useEffect(() => {
    setRefreshing(true);
    setFinished(false);

    setTournamentData().then(() => setRefreshing(false))

    // setRefreshing(false);
  }, [filterParams]);

  useEffect(() => {
    if (page !== 1) {
      updateTournamentList();
    }
  }, [page]);

  useEffect(() => {

    if (finished) {
      ToastAndroid.show("No more tournaments", ToastAndroid.SHORT);
    }


  }, [finished])



  const tournamentItem = (props: BasicTournamentDetails, index: number) => (
    <View style={index !== 0 ? styles.tournamentCard : { ...styles.tournamentCard, paddingTop: 15 }}>
      <TournamentCard id={props.id} name={props.name} city={props.city} startAt={props.startAt} images={props.images} navigation={navigation}></TournamentCard>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}></RefreshControl>} style={[styles.container, { backgroundColor: colors.background }]}
        data={data}
        renderItem={(tournament) => tournamentItem(tournament.item, tournament.index)}
        keyExtractor={tournament => `tournament_${tournament.id.toString()}`}
        onEndReached={() => setPage(page + 1)}
        onEndReachedThreshold={0.1}
      ></FlatList>
      <SearchButton showFilter={setShowFilter}></SearchButton>


      {updating &&
        <View style={styles.updatingIcon}>
          <ActivityIndicator size='large' color={colors.primary}></ActivityIndicator>
        </View>
      }


      <FilterView updateFilters={setFilterParams} setShow={setShowFilter} show={showFilter}></FilterView>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
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
})

export default TournamentListView;
