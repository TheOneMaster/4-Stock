import { useIsFocused, useTheme } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, FlatList, RefreshControl, Settings, StyleSheet, ToastAndroid, View } from "react-native";

import { queryAPI, tournamentListQuery } from "../api";
import { addMonthsToDate } from "../helper";

// import { SettingsContext } from "../Contexts/SettingsContext";
// import { TournamentListViewProps } from "../navTypes";
import { BasicTournamentDetails, StorageVariables, TournamentListAPIQuery } from "../types";
import { FilterView } from "./FilterComponent";
import { SearchButton } from "./SearchButton";
import { TournamentCard } from "./TournamentCard";

import { useMMKVListener, useMMKVBoolean, useMMKVObject, useMMKV } from "react-native-mmkv";
import { AppSettings, DropdownOption } from "../Settings/types";


const TournamentListView = ({ navigation }: TournamentListViewProps) => {

  const { colors } = useTheme();
  const storage = useMMKV();

  const [data, setData] = useState([] as BasicTournamentDetails[]);
  const updatedSettings = useRef<boolean>(false);

  useMMKVListener(() => {
    // TODO: Make sure it only updates after the MMKV store has loaded.
    updatedSettings.current = true;
  })


  // UI State elements
  const focused = useIsFocused();
  const [refreshing, setRefreshing] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [finished, setFinished] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  // Filters
  const [page, setPage] = useState(1);
  const [filterParams, setFilterParams] = useState<StorageVariables>({
    beforeDate: addMonthsToDate(new Date(), 1),
    videogameIds: getMainGame()
  });

  function getMainGame() {
    const settings: AppSettings = JSON.parse(storage.getString("settings"));
    return settings["general.mainGame"] ? [settings["general.mainGame"].value] : undefined;
  }

  function updateFilters(filter: StorageVariables) {
    const newFilters = Object.assign({}, filterParams, filter);
    setFilterParams(newFilters)
  }

  async function getTournamentData() {
    setRefreshing(true);

    try {
      const body = tournamentListQuery(filterParams);
      const json_data = await queryAPI(body) as TournamentListAPIQuery;
      const currentData = json_data.tournaments.nodes;
      setData(currentData);
    } catch (err) {
      console.log(err);
    }

    setRefreshing(false);
  }

  async function updateTournamentList() {

    if (finished) {
      return;
    }

    setUpdating(true);

    const params = Object.assign({}, filterParams);
    params.page = page;

    const body = tournamentListQuery(params);
    console.log(body);
    const query_data = await queryAPI(body) as TournamentListAPIQuery;
    const current_data = query_data.tournaments.nodes;

    if (current_data.length > 0) {
      setData(prevData => [...prevData, ...current_data]);
    } else {
      console.log('No more tourneys');
      setFinished(true);
    }

    setUpdating(false);
  };

  async function onRefresh() {
    setPage(1);
    setFinished(false);

    await getTournamentData();
  }

  useEffect(() => {

    if (!focused || !updatedSettings.current) {
      return
    }

    const settingsString = storage.getString("settings");
    const settings: AppSettings = JSON.parse(settingsString);

    console.log(settings);
    updatedSettings.current = false;

    if (settings["general.debug"]) {
      const newFilters: StorageVariables = {
        name: "Genesis",
        videogameIds: [1]
      }
      setFilterParams(newFilters);
      return
    }

    const newFilters: StorageVariables = {
      beforeDate: addMonthsToDate(new Date(), 1),
      videogameIds: settings["general.mainGame"] ? [settings["general.mainGame"].value] : undefined
    }

    setFilterParams(newFilters);


  }, [focused])

  useEffect(() => {
    setRefreshing(true);
    setFinished(false);

    getTournamentData().then(() => setRefreshing(false))

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


      <FilterView updateFilters={updateFilters} setShow={setShowFilter} show={showFilter}></FilterView>


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
