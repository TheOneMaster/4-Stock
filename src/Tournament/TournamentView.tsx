import { useEffect, useState } from "react";
import { ActivityIndicator, Button, RefreshControl, ScrollView, StyleSheet, View } from "react-native";

import { queryAPI, tournamentDetailsQuery } from "../api";
import { FullTournamentDetails, TournamentAPIQuery } from "../types";

import { useTheme } from "@react-navigation/native";
import { TournamentViewProps } from "../navTypes";
import ContactButton from "../Shared/ContactButton";
import { MainText } from "../Shared/ThemedText";
import DetailSection from "./DetailSection";
import EventCard from "./EventCard";
import { TopBar } from "./TopBar";

const RegisterButton = (props) => {

    if (props == undefined) {
        return null
    }

    const open = props.open;
    if (!open) {
        return null;
    }

    const style = StyleSheet.create({
        container: {
            position: "absolute",
            bottom: 20,
            right: 30,
            // backgroundColor: "blue"
        }
    });

    const register = () => {
        console.log("Register")
    }

    return (
        <View style={style.container}>
            <Button title="Register" onPress={register}></Button>
        </View>

    )


}

const TournamentView = ({ navigation, route }: TournamentViewProps) => {

    // 
    // 
    // TODO: Rewrite this component using FlatList or SectionList instead of using map inside a ScrollView
    // 
    // 

    const [data, setData] = useState({} as FullTournamentDetails);
    const [loading, setLoading] = useState(false);
    const [dataReady, setdataReady] = useState(false);
    const [failed, setFailedAPI] = useState(false);
    const [refreshing, setRefreshing] = useState(false)

    const tournament = route.params.tournamentDetails;

    const { colors } = useTheme();


    const getTournamentData = async () => {
        try {
            setLoading(true);
            const tournamentQuery = tournamentDetailsQuery(tournament.id);
            const api_data = await queryAPI(tournamentQuery) as TournamentAPIQuery;
            const tournament_data = api_data.tournament;
            setData(tournament_data);
            setdataReady(true);
        } catch (err) {
            setFailedAPI(true);
        }

        setLoading(false);
    }

    useEffect(() => {
        getTournamentData();
    }, [])

    const refresh = () => {
        setRefreshing(true);
        getTournamentData();
        setRefreshing(false);
    }

    return (
        <View style={{ flex: 1 }}>

            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh}></RefreshControl>}>
                <TopBar {...tournament}></TopBar>

                {loading && <ActivityIndicator animating={loading} color={colors.primary} size={20} style={styles.activityIndicator}></ActivityIndicator>}

                <View style={styles.section}>
                    <MainText style={styles.sectionTitle}>Details</MainText>
                    <DetailSection {...data}></DetailSection>
                </View>

                <View style={styles.section}>
                    <MainText style={styles.sectionTitle}>Events</MainText>
                    {dataReady && data.events.map(event => (
                        <View style={styles.eventCard} key={event.id}>
                            <EventCard event={event}></EventCard>
                        </View>
                    ))}
                </View>

                <View style={styles.section}>
                    <MainText style={styles.sectionTitle}>Contact</MainText>
                    {dataReady && <ContactButton type={data.primaryContactType} url={data.primaryContact}></ContactButton>}
                </View>

            </ScrollView>

            {dataReady && <RegisterButton open={data.isRegistrationOpen}></RegisterButton>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
    },
    activityIndicator: {
        position: "relative",
        left: 'auto',
        right: 'auto',
        alignSelf: 'center',
        justifyContent: 'center'
    },
    section: {
        marginHorizontal: 20,
        marginBottom: 10,
    },
    sectionTitle: {
        fontWeight: 'bold',
        fontSize: 20,
        marginVertical: 5,
    },
    eventCard: {
        marginBottom: 5
    }
})

export default TournamentView;
